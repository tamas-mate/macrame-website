export type CategoryType = "earrings" | "necklaces" | "bracelets" | "rings" | "decorations" | "sets";

type Image = {
	id: string;
	original: string;
	originalAlt: string;
};

const RawImages: Record<CategoryType, Record<string, string>> = {
	earrings: import.meta.glob("../assets/images/earrings/*.{jpg,jpeg,png,JPG}", { eager: true, import: "default" }),
	necklaces: import.meta.glob("../assets/images/necklaces/*.{jpg,jpeg,png,JPG}", { eager: true, import: "default" }),
	bracelets: import.meta.glob("../assets/images/bracelets/*.{jpg,jpeg,png,JPG}", { eager: true, import: "default" }),
	rings: import.meta.glob("../assets/images/rings/*.{jpg,jpeg,png,JPG}", { eager: true, import: "default" }),
	decorations: import.meta.glob("../assets/images/decorations/*.{jpg,jpeg,png,JPG}", {
		eager: true,
		import: "default",
	}),
	sets: import.meta.glob("../assets/images/sets/*.{jpg,jpeg,png,JPG}", { eager: true, import: "default" }),
};

const rawImagesToArray = (obj: Record<string, string>, cat: CategoryType) =>
	Object.values(obj).map((img, ind) => ({
		id: `${cat}-${ind + 1}`,
		original: img,
		originalAlt: `${cat}-${ind + 1}`,
	}));

export const galleryImages: Record<CategoryType, Image[]> = {
	earrings: rawImagesToArray(RawImages.earrings, "earrings"),
	necklaces: rawImagesToArray(RawImages.necklaces, "necklaces"),
	bracelets: rawImagesToArray(RawImages.bracelets, "bracelets"),
	rings: rawImagesToArray(RawImages.rings, "rings"),
	decorations: rawImagesToArray(RawImages.decorations, "decorations"),
	sets: rawImagesToArray(RawImages.sets, "sets"),
};

const shuffle = <T>(a: T[]) => {
	const arr = a.slice();

	for (let i = arr.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}

	return arr;
};

export const featuredImages = (Object.keys(galleryImages) as CategoryType[]).flatMap((cat) =>
	shuffle(galleryImages[cat]).slice(0, 2),
);
