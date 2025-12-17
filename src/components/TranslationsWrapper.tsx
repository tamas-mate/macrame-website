import type { ReactNode } from "react";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useTranslationsQuery } from "@/hooks/useTranslationsQuery";

export const TranslationsWrapper = ({ children }: { children: ReactNode }) => {
	const { isLoading, isError, data, error } = useTranslationsQuery();

	if (isError) {
		console.error("Error fetching translations:", error.message);
	}

	if (isLoading) {
		return <LoadingSpinner isFullscreen />;
	}

	if (!data) {
		return null;
	}

	return <>{children}</>;
};
