import supabase from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useRemoteTranslations = () => {
	const { i18n, ready } = useTranslation();
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["i18n_translations", i18n.language],
		queryFn: async () => {
			console.log("Fetching translations for locale:", i18n.language);
			const { data, error } = await supabase
				.from("i18n_translations")
				.select("path, value_text")
				.eq("locale", i18n.language);

			if (error) throw error;

			return data;
		},
		staleTime: 5 * 60 * 1000,
		enabled: ready,
	});

	if (isError) {
		console.error("Error fetching translations:", error);
	}

	if (data) {
		for (const row of data) {
			if ("path" in row && "value_text" in row)
				i18n.addResource(i18n.language, "translation", row.path, row.value_text as string);
		}
	}

	return {
		loading: isPending,
	};
};
