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
	title: string;
	message: string;
	time: string;
};

export type AnchorMap = Map<string, Ref<HTMLElement>>;

export type ProductsType = {
	categories: string[];
};

export type ProductCategoriesType = ProductsType;

export type ProductCategoryItemType = {
	image: string;
	category: string;
	cta: string;
};
