import React from "react";
import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";
import { FallingLines } from "react-loader-spinner";

const ImageGallery = ({ images, loading, onImageClick }) => {
  if (loading) {
    return (
      <div className={css.loaderWrapper}>
        <FallingLines
          color="#4fa94d"
          width="200"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }

  if (!images || images.length === 0) {
    return <p>No images found.</p>;
  }

  return (
    <ul className={css.container}>
      {images.map((image) => (
        <li key={image.id} onClick={() => onImageClick(image.urls.regular)}>
          <div>
            <ImageCard src={image.urls.small} alt={image.description} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
