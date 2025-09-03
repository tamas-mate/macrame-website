import type { ReactNode, Ref } from "react";

export type ChildrenType = {
	children: ReactNode;
};

export type AnchorMap = Map<string, Ref<HTMLElement>>;

export type ProductsType = {
	categories: string[];
};

export type ProductCategoriesType = ProductsType;

export type ProductCategoryItemType = {
	image: string;
	category: string;
};
