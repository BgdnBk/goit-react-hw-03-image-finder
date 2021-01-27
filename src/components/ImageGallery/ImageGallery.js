import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ arrImg, onSubmit }) {
  console.log('images Gallery', arrImg);
  return (
    <ul className="ImageGallery">
      {arrImg.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          onClick={onSubmit}
        />
      ))}
    </ul>
  );
}
