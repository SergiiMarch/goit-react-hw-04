import React, { useEffect } from "react";
import Modal from "react-modal";
import css from "./ImageModal.module.css";

const ImageModal = ({ isOpen, onRequestClose, largeImageUrl }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onRequestClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onRequestClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <img src={largeImageUrl} alt="Large view" />
    </Modal>
  );
};

export default ImageModal;
