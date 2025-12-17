import supabase from "@/lib/supabase";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import type { StringMap } from "@/types";

export const useTranslationsQuery = () => {
	const { i18n } = useTranslation();
	const currentLanguage = i18n.language;

	return useQuery({
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

			i18n.addResourceBundle(currentLanguage, "backend", map);

			return map;
		},
		staleTime: 5 * 60 * 1000,
		placeholderData: keepPreviousData,
	});
};
