import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";
import { FallingLines } from "react-loader-spinner";

const ImageGallery = ({ images, loading }) => {
  if (loading) {
    return (
      <FallingLines
        color="#4fa94d"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    );
  }

  if (!images || images.length === 0) {
    return <p>No images found.</p>;
  }

  return (
    <ul className={css.container}>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard src={image.urls.small} alt={image.description} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
