import { useRef } from "react";

import type { CategoryItemType } from "@/types";

const CategoryItem = ({ src, alt, onLoaded }: CategoryItemType) => {
	const imgRef = useRef<HTMLImageElement>(null);

	const handleClick = () => {
		if (!document.fullscreenElement) {
			imgRef.current?.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	};

	return (
		<div className="group aspect-square" onClick={handleClick}>
			<img
				ref={imgRef}
				src={src}
				alt={alt}
				className="h-full w-full group-hover:scale-105 group-hover:cursor-pointer"
				onLoad={onLoaded}
				onError={onLoaded}
			/>
		</div>
	);
};

export default CategoryItem;
