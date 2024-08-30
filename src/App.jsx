import { useState } from "react";
import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import ImageGallery from "./components/ImageGallery/ImageGallery";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSearchSubmit = async (query) => {
    setLoading(true);
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

      setImages(response.data.results);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Toaster />
      <ImageGallery images={images} loading={loading} />
    </>
  );
}

export default App;
