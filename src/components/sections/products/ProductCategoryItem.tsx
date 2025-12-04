import { Link } from "react-router";

import type { ProductCategoryItemType } from "@/types";

const ProductCategoryItem = ({ image, category, cta }: ProductCategoryItemType) => {
	return (
		<div className="group relative aspect-square overflow-hidden rounded-lg transition-all duration-150 hover:scale-95 has-focus:scale-95 has-focus:outline-none">
			<Link
				tabIndex={0}
				to={`/categories/${category}`}
				className="peer absolute top-1/2 left-1/2 z-10 flex w-full -translate-x-1/2 -translate-y-1/2 justify-center opacity-0 outline-none group-hover:opacity-100 focus:opacity-100"
			>
				<p className="bg-primary-dark w-3/4 rounded-xl py-4 text-center text-base font-bold text-white hover:cursor-pointer xl:text-xl">
					{cta}
				</p>
			</Link>
			<img src={image} alt={category} className="h-full w-full group-hover:blur-sm peer-focus:blur-sm" />
		</div>
	);
};

export default ProductCategoryItem;
