import supabase from "@/lib/supabase";
import type { StringMap, UseDbTranslationsResult } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const useDbTranslations = (): UseDbTranslationsResult => {
	const base = useTranslation();
	const { i18n, t: baseT } = base;
	const currentLanguage = i18n.resolvedLanguage ?? i18n.language;

	const {
		data: overrides,
		isError,
		error,
	} = useQuery({
		queryKey: ["translations", currentLanguage],
		queryFn: async () => {
			const { data, error } = await supabase
				.from("translations")
				.select("value_text, translation_keys:translation_key_id (path)")
				.eq("locale", currentLanguage);

			if (error) throw error;

			const map: StringMap = {};

			for (const row of data ?? []) {
				const path = row.translation_keys?.path;
				if (!path || row.value_text == null) continue;
				map[path] = row.value_text;
			}

			return map;
		},
	});

	if (isError) {
		console.error("Error fetching translations:", error);
	}

	const t = useMemo(() => {
		const overrideMap = overrides ?? {};

		// We build a function that takes exactly the same parameters as baseT:
		// Otherwise, just delegate everything to the original t()
		const wrapped = ((...args: Parameters<typeof baseT>) => {
			const [key] = args;

			if (typeof key === "string" && overrideMap[key] != null) {
				return overrideMap[key] as ReturnType<typeof baseT>;
			}

			return baseT(...args);
		}) as typeof baseT;

		return wrapped;
	}, [overrides, baseT]);

	return {
		...base,
		t,
	};
};
