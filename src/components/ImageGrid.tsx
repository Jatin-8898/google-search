import React from "react";
import { Image } from "../models/Image";
import "./ImageGrid.css";

interface ImageGridProps {
	images: Image[] | Image; // single image or an array of images
	onImageClick: (image: Image) => void;
	lastImageElementRef?: (node: HTMLDivElement) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({
	images,
	onImageClick,
	lastImageElementRef,
}) => {
	if (Array.isArray(images)) {
		return (
			<div className="image-grid">
				{images.map((image, index) => {
					const isLastImage = index === images.length - 1;

					return (
						<div
							key={image.id}
							ref={
								isLastImage && lastImageElementRef
									? lastImageElementRef
									: undefined
							}
							className="image-item"
							onClick={() => onImageClick(image)}
						>
							<img src={image.download_url} alt={image.author} />
						</div>
					);
				})}
			</div>
		);
	} else {
		return (
			<div className="image-grid">
				<div
					key={images.id}
					className="image-item"
					onClick={() => onImageClick(images)}
				>
					<img src={images.download_url} alt={images.author} />
				</div>
			</div>
		);
	}
};

export default ImageGrid;
