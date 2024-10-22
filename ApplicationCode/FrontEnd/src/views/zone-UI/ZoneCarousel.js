import React, { useState, useEffect } from 'react';
import { CCarousel, CCarouselItem, CImage } from '@coreui/react';
import axios from 'axios';
import { backendUrl, websocketUrl } from "../../config";

const ZoneCarousel = ({ zoneId, rotationInterval }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch images from the server for the given zoneId
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/images/${zoneId}`);
        console.log("Images response:", response.data); // Debugging
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    
    fetchImages();
  }, [zoneId]);

  // Rotate images every 'rotationInterval' minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, rotationInterval * 6 * 1000); // Convert minutes to milliseconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [images, rotationInterval]);

  if (images.length === 0) {
    return <div>No images available for this zone.</div>;
  }

  return (
    <div className="zone-carousel">
      <CCarousel activeIndex={currentIndex}>
        {images.map((img, idx) => (
          <CCarouselItem key={idx}>
            <CImage className="d-block w-100" src={img} alt={`slide ${idx + 1}`} />
          </CCarouselItem>
        ))}
      </CCarousel>
    </div>
  );
};

export default ZoneCarousel;
