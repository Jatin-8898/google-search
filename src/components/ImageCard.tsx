import React from "react";
import { Image } from "../models/Image";

interface ImageCardProps {
	image: Image;
	onClick: (image: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
	return (
		<div className="image-card" onClick={() => onClick(image)}>
			<img src={image.download_url} alt={image.author} />
			<p>{image.author}</p>
		</div>
	);
};

export default ImageCard;
