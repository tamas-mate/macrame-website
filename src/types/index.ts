import type { ReactNode, Ref } from "react";
import type { useTranslation } from "react-i18next";

type BaseUseTranslation = ReturnType<typeof useTranslation>;

export type UseDbTranslationsResult = Omit<BaseUseTranslation, "t"> & {
	t: BaseUseTranslation["t"];
};

export type StringMap = Record<string, string>;

export type TranslationsContextValue = {
	translationsMap: StringMap;
	translationsLoading: boolean;
	translationsError: Error | null;
};

export type ChildrenType = {
	children: ReactNode;
};

export type HeaderType = {
	isHome: boolean;
};

export type CategoryItemType = {
	src: string;
	alt: string;
	onLoaded: () => void;
};

export type ImageGalleryType = {
	featuredImages: {
		id: string;
		original: string;
		originalAlt: string;
	}[];
};

export type ContactForm = {
	name: string;
	email: string;
	subject: string;
	message: string;
	time: string;
};

export type LoginForm = {
	email: string;
	password: string;
};

export type TranslationFormProps = {
	inputs: {
		value_text: string;
		translation_key_id: number;
		translation_keys: {
			path: string;
		};
	}[];
	locale: string;
};

export type TranslationForm = {
	data: {
		value: string;
		translationKeyId: number;
	}[];
};

export type AnchorMap = Map<string, Ref<HTMLElement>>;

export type ProductCategoriesType = {
	categories: string[];
};

export type ProductCategoryItemType = {
	image: string;
	category: string;
	cta: string;
};
