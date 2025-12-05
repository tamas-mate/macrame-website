import fs from "fs";
import path from "path";

const cwd = process.cwd();
const filePaths = ["src/locales/src/i18n/en.json", "src/locales/src/i18n/hu.json", "src/locales/src/i18n/ro.json"];

const flatten = (obj: Record<string, string>, prefix = "") => {
	const output = {} as Record<string, string>;

	for (const key of Object.keys(obj)) {
		const value = obj[key];
		const newPrefix = prefix ? `${prefix}.${key}` : key;

		if (value === null || value === undefined) continue;

		if (Array.isArray(value)) continue;

		if (typeof value === "object") Object.assign(output, flatten(value, newPrefix));
		else output[newPrefix] = value;
	}

	return output;
};

const doubleQuoteWrapper = (text: string) => {
	const candidates = ["$q$", "$$", "$i18n$", "$val$", "$txt$"];

	for (const tag of candidates) {
		if (!text.includes(tag)) return `${tag}${text}${tag}`;
	}

	const uniqueTag = `$q${Math.random().toString(36).slice(2)}$`;
	return `${uniqueTag}${text}${uniqueTag}`;
};

const generatePathsSql = (table: string, data: Record<string, string>) => {
	const paths = Object.keys(flatten(data));
	const pathRows: string[] = [];

	paths.forEach((path) => {
		const row = `('${path}')`;
		pathRows.push(row);
	});

	return `INSERT INTO ${table} (path) VALUES\n${pathRows.join(",\n")};`;
};

const generateResourceSQL = (table: string, data: Record<string, string>, fileName: string) => {
	const values = Object.values(flatten(data));
	const valueRows: string[] = [];

	values.forEach((value, index) => {
		const row = `('${++index}', '${fileName}', ${doubleQuoteWrapper(value)})`;
		valueRows.push(row);
	});

	return `INSERT INTO ${table} (translation_key_id, locale, value_text) VALUES\n${valueRows.join(",\n")}\nON CONFLICT (translation_key_id, locale) DO UPDATE\nSET
	value_text = EXCLUDED.value_text,
	updated_at = now();\n`;
};

try {
	for (const filePath of filePaths) {
		const fullPath = path.join(cwd, filePath);
		const filename = path.parse(fullPath).name;
		const fileResource = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
		if (filename === "en") {
			const pathSql = generatePathsSql("public.translation_keys", fileResource);
			const outputPath = path.join(cwd, `translation-paths.sql`);
			fs.writeFileSync(outputPath, pathSql);
		}
		const sql = generateResourceSQL("public.translations", fileResource, filename);
		const outputPath = path.join(cwd, `i18n-${filename}.sql`);
		fs.writeFileSync(outputPath, sql);
	}
	console.log("SQL files generated successfully.");
} catch (error) {
	console.error("Error generating SQL files:", error);
}
