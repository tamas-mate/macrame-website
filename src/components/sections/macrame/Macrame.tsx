import ImageGallery, { type ReactImageGalleryItem } from "react-image-gallery";

import { featuredImages } from "@/data/gallery";
import { cl } from "@/utils/utils";
import { useCallback, useState } from "react";

const Macrame = () => {
	const [isFullscreen, setIsFullscreen] = useState(false);

	const renderItem = useCallback(
		(item: ReactImageGalleryItem) => {
			const h = isFullscreen ? "h-screen" : "2xl:h-70";
			return (
				<div className={`${h}`}>
					<img
						src={item.original}
						alt={item.originalAlt}
						className={cl("h-full w-full", isFullscreen && "object-contain")}
						loading="lazy"
					/>
				</div>
			);
		},
		[isFullscreen],
	);

	return (
		<section id="macrame" className="flex flex-col gap-y-7.5">
			<h2 className="text-2xl">
				Macramé <small>handmade by Máté Ilona</small>
			</h2>
			<div className="flex flex-col justify-between gap-y-7.5 lg:flex-row lg:gap-x-7.5 lg:gap-y-0">
				<ImageGallery
					items={featuredImages}
					renderItem={renderItem}
					infinite
					additionalClass="w-full msm:w-3/4 self-center lg:self-auto sm:w-2/3 lg:flex-1 lg:order-2"
					onScreenChange={setIsFullscreen}
				/>
				<div className="flex flex-col gap-y-7.5 lg:order-1 lg:w-7/12 2xl:w-7/10">
					<p className="text-pretty">
						Macramé is a centuries-old textile art that transforms simple cords into intricate designs through the
						skillful practice of knotting. Unlike weaving or knitting, macramé doesn't rely on tools—only the artist's
						hands, creativity, and patience. With roots tracing back to ancient cultures in Arabia, China, and South
						America, macramé has seen a resurgence in recent years, blending old-world tradition with modern design
						sensibilities.
					</p>
					<p className="text-pretty">
						Each macramé piece is more than decoration—it's a deliberate composition of patterns, textures, and
						techniques. From minimalist wall hangings and detailed plant holders to vibrant jewelry and accessories, the
						art form offers endless possibilities. Artists carefully select cord types, thickness, and colors, often
						incorporating beads, stones, or other natural elements to enhance the final piece.
					</p>
					<p className="text-pretty">
						What makes macramé so special is its versatility and personal touch. No two pieces are exactly alike, and
						every knot holds a part of the maker's intention and craftsmanship. It is both meditative and
						expressive—requiring patience, focus, and a keen eye for balance and symmetry. Whether used in home decor,
						fashion, or functional art, macramé invites us to appreciate the beauty of handmade design in a fast-paced
						digital world.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Macrame;
