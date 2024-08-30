import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard"

const ImageGallery = ({ images }) => {
  if (!images || images.length === 0) {
    return <p>No images found.</p>;
  }

  return (
    <ul className={css.container>
      {images.map((image) => (
        <li key={image.id}>
          <div>
            <ImageCard
              src={image.urls.raw}
              alt={image.description}
              // width="320px"
            />
            
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
