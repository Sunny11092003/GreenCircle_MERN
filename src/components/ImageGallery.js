// src/components/ImageGallery.js
import React, { useState } from "react";

const ImageGallery = ({ images }) => {
  const [lightbox, setLightbox] = useState({ isOpen: false, index: 0 });

  const openLightbox = (index) => setLightbox({ isOpen: true, index });
  const closeLightbox = () => setLightbox({ isOpen: false, index: 0 });
  const prevImage = () =>
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + images.length) % images.length,
    }));
  const nextImage = () =>
    setLightbox((prev) => ({ ...prev, index: (prev.index + 1) % images.length }));

  if (!images || images.length === 0) return null;

  return (
    <div className="relative">
      {/* Fixed-size Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="rounded-xl overflow-hidden relative cursor-pointer"
            onClick={() => openLightbox(idx)}
            style={{ height: "250px" }} // Fixed height
          >
            <img
              src={img.url}
              alt={`Tree ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox.isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-5 right-5 text-white text-3xl font-bold"
            onClick={closeLightbox}
          >
            &times;
          </button>
          <button
            className="absolute left-5 text-white text-3xl font-bold"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            &#10094;
          </button>
          <img
            src={images[lightbox.index].url}
            alt={`Tree ${lightbox.index + 1}`}
            className="max-h-full max-w-full rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-5 text-white text-3xl font-bold"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
