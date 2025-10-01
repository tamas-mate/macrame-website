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

const generateSQL = (table: string, data: Record<string, string>, fileName: string) => {
	const entries = Object.entries(flatten(data));
	const valueRows = [];

	for (const [key, value] of entries) {
		const row = `('${fileName}', '${key}', ${doubleQuoteWrapper(value)})`;
		valueRows.push(row);
	}

	return `INSERT INTO ${table} (locale, path, value_text) VALUES\n${valueRows.join(",\n")}\nON CONFLICT (locale, path) DO UPDATE\nSET
    value_text = EXCLUDED.value_text,
    updated_at = now();\n`;
};

try {
	for (const filePath of filePaths) {
		const fullPath = path.join(cwd, filePath);
		const filename = path.parse(fullPath).name;
		const fileResource = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
		const sql = generateSQL("public.i18n_translations", fileResource, filename);
		const outputPath = path.join(cwd, `i18n-${filename}.sql`);
		fs.writeFileSync(outputPath, sql);
	}
	console.log("SQL files generated successfully.");
} catch (error) {
	console.error("Error generating SQL files:", error);
}
