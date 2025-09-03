import { useMemo } from "react";

import type { ProductCategoriesType } from "@/types";
import { imageMap } from "@/utils/utils";
import ProductCategoryItem from "./ProductCategoryItem";

const getCategoryImages = (categories: string[]) => categories.map((catImg) => imageMap[catImg]);

const ProductCategories = ({ categories }: ProductCategoriesType) => {
	const categoryImages = useMemo(() => getCategoryImages(categories), [categories]);

	return (
		<div className="grid grid-cols-1 justify-items-center gap-4 self-center sm:grid-cols-2 lg:grid-cols-3 2xl:max-w-6xl">
			{categoryImages.map((categoryImage, index) => (
				<ProductCategoryItem key={index} image={categoryImage} category={categories[index]} />
			))}
		</div>
	);
};
export default ProductCategories;
