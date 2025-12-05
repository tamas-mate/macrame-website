import supabase from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useSectionTranslations = (currentSection: string) => {
	const { i18n, ready } = useTranslation();
	const currentLanguage = i18n.resolvedLanguage ?? i18n.language;

	const { isPending, isError, data, error } = useQuery({
		queryKey: ["section-translations", currentLanguage, currentSection],
		enabled: ready && !!currentSection,
		staleTime: 5 * 60 * 1000,
		queryFn: async () => {
			const { data, error } = await supabase
				.from("translations")
				.select(
					`
						value_text,
						translation_key_id,
						translation_keys!inner(path)
					`,
				)
				.eq("locale", currentLanguage)
				.ilike("translation_keys.path", `%${currentSection}%`);

			if (error) throw error;
			return data ?? [];
		},
	});

	if (isError) {
		console.error("Error fetching section translations:", error);
	}

	return { isPending, data, error };
};
