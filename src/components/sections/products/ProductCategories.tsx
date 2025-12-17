import { useTranslation } from "react-i18next";

import type { ProductCategoriesType } from "@/types";
import { imageMap } from "@/utils/utils";
import ProductCategoryItem from "./ProductCategoryItem";

const getCategoryImages = (categories: string[]) => categories.map((catImg) => imageMap[catImg]);

const ProductCategories = ({ categories }: ProductCategoriesType) => {
	const { t } = useTranslation("backend");
	const categoryImages = getCategoryImages(categories);

	return (
		<div className="msm:w-3/4 grid grid-cols-1 justify-items-center gap-4 self-center sm:w-auto sm:grid-cols-2 lg:grid-cols-3 2xl:max-w-7xl">
			{categoryImages.map((categoryImage, index) => (
				<ProductCategoryItem
					key={categories[index]}
					image={categoryImage}
					category={categories[index]}
					cta={t("home.collection_overview.category_list." + categories[index] + ".cta")}
				/>
			))}
		</div>
	);
};
export default ProductCategories;
