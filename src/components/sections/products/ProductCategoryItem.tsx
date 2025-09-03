import { Link } from "react-router";

import type { ProductCategoryItemType } from "@/types";

const ProductCategoryItem = ({ image, category }: ProductCategoryItemType) => {
	return (
		<div className="group category-link relative">
			<img src={image} alt={category} className="h-full w-full group-hover:blur-sm" />
			<Link
				to={`/category/${category}`}
				className="absolute top-1/2 left-1/2 z-10 hidden w-full -translate-x-1/2 -translate-y-1/2 group-hover:flex group-hover:justify-center"
			>
				<p className="bg-primary-dark w-3/4 rounded-xl py-4 text-center text-2xl font-bold text-white capitalize hover:cursor-pointer">{`View ${category}`}</p>
			</Link>
		</div>
	);
};

export default ProductCategoryItem;
