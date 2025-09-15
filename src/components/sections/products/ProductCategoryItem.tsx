import { Link } from "react-router";

import type { ProductCategoryItemType } from "@/types";

const ProductCategoryItem = ({ image, category }: ProductCategoryItemType) => {
	return (
		<div className="group category-link relative overflow-hidden rounded-lg">
			<img src={image} alt={category} className="h-full w-full group-hover:blur-sm" />
			<Link
				to={`/categories/${category}`}
				className="absolute top-1/2 left-1/2 z-10 flex w-full -translate-x-1/2 -translate-y-1/2 opacity-0 outline-none group-hover:justify-center group-hover:opacity-100"
			>
				<p className="bg-primary-dark w-3/4 rounded-xl py-4 text-center text-xl font-bold text-white capitalize hover:cursor-pointer sm:text-2xl">{`View ${category}`}</p>
			</Link>
		</div>
	);
};

export default ProductCategoryItem;
