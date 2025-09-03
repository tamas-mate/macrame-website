import clsx, { type ClassValue } from "clsx";
import { twMerge } from "./../../node_modules/tailwind-merge/src/lib/tw-merge";

import categoryBracelet from "../assets/images/category-bracelets.jpg";
import categoryDecorations from "../assets/images/category-decorations.jpg";
import categoryEarringst from "../assets/images/category-earrings.jpg";
import categoryNecklaces from "../assets/images/category-necklaces.jpg";
import categoryRings from "../assets/images/category-rings.jpg";
import categorySets from "../assets/images/category-sets.jpg";

export const imageMap: Record<string, string> = {
	bracelets: categoryBracelet,
	decorations: categoryDecorations,
	earrings: categoryEarringst,
	necklaces: categoryNecklaces,
	rings: categoryRings,
	sets: categorySets,
};

export const cl = (...classes: ClassValue[]) => {
	return twMerge(clsx(...classes));
};

export const getFormattedDate = () => {
	const now = new Date();
	return now
		.toLocaleString("en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		})
		.replace(",", "");
};
