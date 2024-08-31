import { useState } from "react";
import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearchSubmit = async (searchQuery) => {
    setLoading(true);
    setError(null);
    setQuery(searchQuery);
    setPage(1);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: { query: searchQuery, page: 1, per_page: 12 },
          headers: {
            Authorization:
              "Client-ID HDp_fF4qvyPovmB6g0OAXCTlXrAqyhYLXYEpz6WZpm4",
          },
        }
      );

      if (response.data.results.length === 0) {
        setError("No images found for the query.");
      } else {
        setImages(response.data.results);
      }
    } catch (error) {
      setError("Error fetching images");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: { query, page: page + 1, per_page: 12 },
          headers: {
            Authorization:
              "Client-ID HDp_fF4qvyPovmB6g0OAXCTlXrAqyhYLXYEpz6WZpm4",
          },
        }
      );

      setImages((prevImages) => [...prevImages, ...response.data.results]);
      setPage(page + 1);
    } catch (error) {
      setError("Error fetching images");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Toaster />

      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery
            images={images}
            loading={loading}
            onImageClick={openModal}
          />
          {images.length > 0 && !loading && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </>
      )}

      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onRequestClose={closeModal}
          largeImageUrl={selectedImage}
        />
      )}
    </>
  );
}

export default App;
