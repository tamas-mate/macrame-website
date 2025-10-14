import supabase from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import type { ResourceRow } from "@/types";

export const useRemoteTranslations = () => {
	const { i18n, ready } = useTranslation();
	const currentLanguage = i18n.resolvedLanguage ?? i18n.language;

	const { isError, data, error } = useQuery<ResourceRow[]>({
		queryKey: ["i18n_translations", currentLanguage],
		enabled: ready,
		staleTime: 5 * 60 * 1000,
		queryFn: async () => {
			const { data, error } = await supabase
				.from("i18n_translations")
				.select("path, value_text")
				.eq("locale", currentLanguage);
			if (error) throw error;
			return data ?? [];
		},
	});

	if (isError) {
		console.error("Error fetching translations:", error);
	}

	useEffect(() => {
		if (!data?.length) return;

		for (const { path, value_text } of data) {
			if (!path || value_text == null) continue;
			i18n.addResource(currentLanguage, "translation", path, value_text);
		}
	}, [data, currentLanguage, i18n]);
};
