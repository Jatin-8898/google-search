export interface Image {
	id: string;
	author: string;
	width: number;
	height: number;
	url: string;
	download_url: string;
}

export interface ImageListProps {
	images: Image[];
}

export interface PaginationProps {
	pageCount: number;
	onPageChange: (selectedItem: { selected: number }) => void;
}

export interface ImagePopoverProps {
	image: Image | null;
	onClose: () => void;
}
