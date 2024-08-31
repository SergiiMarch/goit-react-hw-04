import { useState } from "react";
import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSearchSubmit = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: { query: query },
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
  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Toaster />

      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <ImageGallery images={images} loading={loading} />
      )}
    </>
  );
}

export default App;
