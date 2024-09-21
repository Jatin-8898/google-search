import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import ImageGrid from "./components/ImageGrid";
import ImagePopover from "./components/ImagePopover";
import { Image } from "./models/Image";
import useDebounce from "./hooks/useDebounce";
import "./App.css";

const App: React.FC = () => {
	const [images, setImages] = useState<Image[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selectedImage, setSelectedImage] = useState<Image | null>(null);
	const [page, setPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);

	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const observer = useRef<IntersectionObserver | null>(null); // Ref to observe the last image element

	const fetchImages = async (pageNum: number, search = "") => {
		try {
			setLoading(true);
			let url = `https://picsum.photos/v2/list?page=${pageNum}&limit=20`;

			// random ID between 10 and 30 for the search
			const randomId = Math.floor(Math.random() * (30 - 10 + 1)) + 10;

			// Update the URL if a search term is present
			if (search) {
				url = `https://picsum.photos/id/${randomId}/info`;
			}

			const response = await axios.get(url);

			if (Array.isArray(response.data)) {
				// If it's an array, append the new images to the existing list
				setImages((prevImages) => [...prevImages, ...response.data]);
			} else {
				// If it's a single image (object)
				setImages((prevImages) => [...prevImages, response.data]);
			}

			// If response is empty stop further API calls
			if (
				response.data.length === 0 ||
				(response.data && !Array.isArray(response.data))
			) {
				setHasMore(false);
			}

			setLoading(false);
		} catch (error) {
			console.error("Error fetching images:", error);
			setLoading(false);
		}
	};

	useEffect(() => {
		setImages([]); // Clear images on new search
		setPage(1); // Reset page count
		setHasMore(true);
		fetchImages(1, debouncedSearchTerm);
	}, [debouncedSearchTerm]);

	useEffect(() => {
		if (page > 1) {
			fetchImages(page, debouncedSearchTerm);
		}
	}, [debouncedSearchTerm, page]);

	const lastImageElementRef = useCallback(
		(node: HTMLDivElement) => {
			if (loading) return;

			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPage((prevPage) => prevPage + 1); // Load next page
				}
			});

			if (node) observer.current.observe(node);
		},
		[loading, hasMore]
	);

	const handleImageClick = (image: Image) => {
		setSelectedImage(image);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const closePopover = () => {
		setSelectedImage(null);
	};

	return (
		<div className="App">
			<div className="search-bar">
				<input
					type="text"
					placeholder="Search Google or type a URL"
					value={searchTerm}
					onChange={handleSearchChange}
				/>
			</div>
			<div className="main-content">
				{loading ? (
					<div className="loading">Loading...</div>
				) : (
					<ImageGrid
						images={images}
						onImageClick={handleImageClick}
						lastImageElementRef={lastImageElementRef}
					/>
				)}
				<ImagePopover image={selectedImage} onClose={closePopover} />
			</div>
		</div>
	);
};

export default App;
