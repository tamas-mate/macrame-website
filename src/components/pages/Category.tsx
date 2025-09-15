import { useParams } from "react-router";

import { galleryImages, type CategoryType } from "@/data/gallery";
import { useEffect, useRef, useState } from "react";
import CategoryItem from "../sections/category/CategoryItem";

const titles = {
	earrings: "Delicate Macramé Earrings - Light as a Feather, Bold in Style",
	necklaces: "Statement Macramé Necklaces - Crafted to Be Worn Close to the Heart",
	bracelets: "Macramé Bracelets - Everyday Elegance, Handmade with Care",
	rings: "Macramé Rings - Tiny Details, Big Charm",
	decorations: "Macramé Decorations - Artful Knots for Inspired Spaces",
	sets: "Macramé Sets - Perfectly Paired, Thoughtfully Handmade",
};

const Category = () => {
	const [loadedCount, setLoadedCount] = useState(0);
	const sectionRef = useRef<HTMLElement>(null);
	const { category } = useParams();
	const total = galleryImages[category as CategoryType].length;

	useEffect(() => {
		if (loadedCount > 0 && loadedCount === total) {
			sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	}, [loadedCount, total]);

	if (!category) return null;

	return (
		<section ref={sectionRef} id="category" className="flex flex-col gap-y-7.5">
			<h2 className="text-2xl">{titles[category as CategoryType]}</h2>
			<div className="grid w-3/4 grid-cols-1 justify-items-center gap-4 self-center sm:w-auto sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
				{galleryImages[category as CategoryType].map((img) => (
					<CategoryItem
						key={img.id}
						src={img.original}
						alt={img.originalAlt}
						onLoaded={() => setLoadedCount((c) => c + 1)}
					/>
				))}
			</div>
		</section>
	);
};

export default Category;
