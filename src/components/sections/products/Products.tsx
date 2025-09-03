import type { ProductsType } from "@/types";

import { useAnchor } from "@/context/anchor-context";
import ProductCategories from "./ProductCategories";

const Products = ({ categories }: ProductsType) => {
	const ref = useAnchor("products");

	return (
		<section ref={ref} id="products" className="pb-6">
			<div className="mx-auto flex flex-col gap-y-10 px-20 md:px-40">
				<h1 className="py-4 text-2xl">Handmade with Heart — Explore the Collection</h1>
				<p className="text-pretty">
					Every piece in this collection is lovingly handcrafted by Máté Ilona, blending traditional macramé techniques
					with her own creative flair. Her attention to detail and passion for design shine through in every knot, bead,
					and color choice. The collection is thoughtfully divided into six categories, each reflecting a different
					expression of her craft:
				</p>
				<ul className="flex list-disc flex-col gap-y-2 pl-10 text-pretty">
					<li className="text-pretty">
						Earrings - Light, elegant designs that combine threadwork with delicate beads and stones.
					</li>
					<li className="text-pretty">
						Necklaces - Statement pieces and subtle designs alike, all showcasing the timeless beauty of handwoven art.
					</li>
					<li className="text-pretty">
						Bracelets - Intricate wristwear ranging from minimalist cords to bold, layered patterns.
					</li>
					<li className="text-pretty">Rings - Tiny yet intricate rings that are soft to wear and striking to see.</li>
					<li className="text-pretty">
						Decorations - Artistic wall hangings and ornamental pieces that bring warmth and texture to any space.
					</li>
					<li className="text-pretty">
						Sets - Coordinated jewelry sets, including necklaces, earrings, and bracelets, perfect for special occasions
						or meaningful gifts.
					</li>
				</ul>
				<p className="text-pretty">
					Each item tells a story—not just of artistic vision, but of a woman who finally followed her dream. Whether
					you're looking for a unique accessory or a heartfelt gift, this collection offers something truly special.
				</p>
				<ProductCategories categories={categories} />
			</div>
		</section>
	);
};

export default Products;
