import { createContext, useContext } from "react";

import type { TranslationsContextValue } from "@/types";

export const TranslationsContext = createContext<TranslationsContextValue | null>(null);

export const useTranslationsContext = () => {
	const ctx = useContext(TranslationsContext);

	if (!ctx) {
		throw new Error("useTranslationsContext must be used within AppTranslationsProvider");
	}

	return ctx;
};
