import type { InterpolationOptions } from "i18next";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useTranslationsContext } from "@/context/translations/translations-context";
import type { UseDbTranslationsResult } from "@/types";

export const useDbTranslations = (): UseDbTranslationsResult => {
	const base = useTranslation();
	const { i18n, t: baseT } = base;
	const { translationsMap } = useTranslationsContext();

	const t = useMemo(() => {
		const interpolationOptions: InterpolationOptions = i18n.options?.interpolation ?? {};

		const wrapped = ((...args: Parameters<typeof baseT>) => {
			const [key, secondArg] = args;

			// Only override simple string keys that exist in DB overrides
			if (typeof key === "string" && translationsMap[key] != null) {
				const raw = translationsMap[key] as string;
				const maybeOptions =
					secondArg && typeof secondArg === "object" && !Array.isArray(secondArg)
						? (secondArg as Record<string, unknown>)
						: undefined;

				if (maybeOptions) {
					const interpolated = i18n.services.interpolator.interpolate(
						raw,
						maybeOptions,
						i18n.language,
						interpolationOptions,
					);

					return interpolated as ReturnType<typeof baseT>;
				}

				return raw as ReturnType<typeof baseT>;
			}

			return baseT(...args);
		}) as typeof baseT;

		return wrapped;
	}, [translationsMap, baseT, i18n]);

	return {
		...base,
		t,
	};
};
