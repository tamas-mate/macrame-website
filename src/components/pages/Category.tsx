import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { galleryImages, type CategoryType } from "@/data/gallery";
import { useDbTranslations } from "@/hooks/useDbTranslations";
import CategoryItem from "../sections/category/CategoryItem";

const Category = () => {
	const [loadedCount, setLoadedCount] = useState(0);
	const sectionRef = useRef<HTMLElement>(null);
	const { t } = useDbTranslations();
	const { category } = useParams();
	const [totalImages] = useState(galleryImages[category as CategoryType]?.length || 0);
	const navigate = useNavigate();

	useEffect(() => {
		if (!category || (category && !(category in galleryImages))) {
			navigate("/");
		}
	}, [category, navigate]);

	useEffect(() => {
		if (loadedCount > 0 && loadedCount === totalImages) {
			sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	}, [loadedCount, totalImages]);

	if (category && !(category in galleryImages)) return null;

	return (
		<section ref={sectionRef} id="category" className="flex flex-col gap-y-7.5">
			<h1 className="text-2xl">{t("category.titles." + category)}</h1>
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
