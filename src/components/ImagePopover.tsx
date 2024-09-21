import React from "react";
import { ImagePopoverProps } from "../models/Image";

const ImagePopover: React.FC<ImagePopoverProps> = ({ image, onClose }) => {
	if (!image) return null;

	return (
		<div className="popover">
			<button onClick={onClose} className="close-button">
				X
			</button>
			<img src={image.download_url} alt={image.author} />
			<div className="popover-details">
				<p>
					<strong>Author:</strong> {image.author}
				</p>
				<p>
					<strong>Resolution:</strong> {image.width}x{image.height}
				</p>
				<a
					href={image.download_url}
					target="_blank"
					rel="noopener noreferrer"
				>
					Download
				</a>
			</div>
		</div>
	);
};

export default ImagePopover;
