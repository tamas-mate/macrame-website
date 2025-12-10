import supabase from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useDbTranslations } from "./useDbTranslations";

export const useSectionTranslations = (currentSection: string) => {
	console.log("currentSection", currentSection);
	const { i18n, ready } = useDbTranslations();
	const currentLanguage = i18n.resolvedLanguage ?? i18n.language;

	const { isLoading, isError, data, error } = useQuery({
		queryKey: ["section-translations", currentLanguage, currentSection],
		enabled: ready && !!currentSection,
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

	return { isLoading, data, error };
};
