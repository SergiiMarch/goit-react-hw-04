import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";
import { ClipLoader } from "react-loader-spinner";

const ImageGallery = ({ images, loading }) => {
  if (!images || images.length === 0) {
    return <p>No images found.</p>;
  }

  return (
    <>
      <ul className={css.container}>
        {images.map((image) => (
          <li key={image.id}>
            <div>
              <ImageCard src={image.urls.small} alt={image.description} />
            </div>
          </li>
        ))}
      </ul>
      {loading && (
        <ClipLoader
          color="#306cce"
          loading={loading}
          size={80}
          aria-label="loading-clip"
        />
      )}
    </>
  );
};

export default ImageGallery;
