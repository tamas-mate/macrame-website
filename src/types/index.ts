import type { ReactNode, Ref } from "react";

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

export type FormData = {
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

export type AnchorMap = Map<string, Ref<HTMLElement>>;

export type ProductCategoriesType = {
	categories: string[];
};

export type ProductCategoryItemType = {
	image: string;
	category: string;
	cta: string;
};

export type ResourceRow = {
	path: string;
	value_text: string | null;
};
