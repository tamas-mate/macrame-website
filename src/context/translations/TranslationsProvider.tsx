import type { ReactNode } from "react";

import { useTranslationsQuery } from "@/hooks/useTranslationsQuery";
import { TranslationsContext } from "./translations-context";

export const TranslationsProvider = ({ children }: { children: ReactNode }) => {
	const { isLoading, isError, data, error } = useTranslationsQuery();

	if (isError) {
		console.error("Error fetching translations:", error.message);
	}

	return (
		<TranslationsContext
			value={{
				translationsMap: data ?? {},
				translationsLoading: isLoading,
				translationsError: error,
			}}
		>
			{children}
		</TranslationsContext>
	);
};
