import React from 'react';

export default function ImageGalleryItem({
  webformatURL,
  tags,
  largeImageURL,
  onClick,
}) {
  return (
    <li className="ImageGalleryItem">
      <img
        onClick={() => onClick(largeImageURL)}
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
      />
    </li>
  );
}
