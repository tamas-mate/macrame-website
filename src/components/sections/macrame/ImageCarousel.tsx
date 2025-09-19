import { useState } from "react";
import ImageGallery, { type ReactImageGalleryItem } from "react-image-gallery";

import type { ImageGalleryType } from "@/types";
import { cl } from "@/utils/utils";

const renderItem = (item: ReactImageGalleryItem, isFullscreen: boolean) => {
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
};

const ImageCarousel = ({ featuredImages }: ImageGalleryType) => {
	const [isFullscreen, setIsFullscreen] = useState(false);

	const handleScreenChange = () => {
		setIsFullscreen(!isFullscreen);
	};

	return (
		<ImageGallery
			items={featuredImages}
			renderItem={(item) => renderItem(item, isFullscreen)}
			infinite
			additionalClass="w-full msm:w-3/4 self-center lg:self-auto sm:w-2/3 lg:flex-1 lg:order-2"
			onScreenChange={handleScreenChange}
		/>
	);
};

export default ImageCarousel;
