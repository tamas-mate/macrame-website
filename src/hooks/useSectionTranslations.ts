import supabase from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useSectionTranslations = (currentSection: string, currentLanguage: string, ready: boolean) => {
	return useQuery({
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
};
