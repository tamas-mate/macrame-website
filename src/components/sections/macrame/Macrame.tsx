import { useAnchor } from "@/context/anchor-context";

const Macrame = () => {
	const ref = useAnchor("macrame");

	return (
		<section ref={ref} id="macrame">
			<div className="mx-auto px-20 md:px-40">
				<h1 className="py-4 text-2xl">
					Macramé <small>handmade by Máté Ilona</small>
				</h1>
				<p className="text-pretty">
					Macramé is a centuries-old textile art that transforms simple cords into intricate designs through the
					skillful practice of knotting. Unlike weaving or knitting, macramé doesn't rely on tools—only the artist's
					hands, creativity, and patience. With roots tracing back to ancient cultures in Arabia, China, and South
					America, macramé has seen a resurgence in recent years, blending old-world tradition with modern design
					sensibilities.
				</p>
				<br />
				<p className="text-pretty">
					Each macramé piece is more than decoration—it's a deliberate composition of patterns, textures, and
					techniques. From minimalist wall hangings and detailed plant holders to vibrant jewelry and accessories, the
					art form offers endless possibilities. Artists carefully select cord types, thickness, and colors, often
					incorporating beads, stones, or other natural elements to enhance the final piece.
				</p>
				<br />
				<p className="text-pretty">
					What makes macramé so special is its versatility and personal touch. No two pieces are exactly alike, and
					every knot holds a part of the maker's intention and craftsmanship. It is both meditative and
					expressive—requiring patience, focus, and a keen eye for balance and symmetry. Whether used in home decor,
					fashion, or functional art, macramé invites us to appreciate the beauty of handmade design in a fast-paced
					digital world.
				</p>
			</div>
		</section>
	);
};

export default Macrame;
