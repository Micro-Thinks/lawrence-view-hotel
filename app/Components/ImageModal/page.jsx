"use client";
import React, { useState, useRef } from "react";
import { GalleryCard } from "../../Helpers/Data"; // Ensure path is correct
import Image from "next/image";
import { Icon } from "@iconify/react";

const ImageModal = ({ isOpen, onClose, initialIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const totalImages = GalleryCard.length;

  const carouselRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleNext = () => {
    if (currentIndex < totalImages - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSelectImage = (index) => {
    setCurrentIndex(index);
  };

  // Smooth scroll function
  const smoothScroll = (scrollPosition) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth", // Smooth scrolling
      });
    }
  };

  // Mouse events for dragging to scroll
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const x = e.clientX;
    const walk = (x - startX.current) * 2; // Adjust scroll speed
    smoothScroll(scrollLeft.current - walk); // Smooth scrolling
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Touch events for dragging to scroll
  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const x = e.touches[0].clientX;
    const walk = (x - startX.current) * 2; // Adjust scroll speed
    smoothScroll(scrollLeft.current - walk); // Smooth scrolling
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300 ease-in-out">
      <div className="relative max-w-3xl w-full flex flex-col items-center p-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl p-2 rounded-full transition-colors duration-300 z-50"
          aria-label="Close Modal"
        >
          <Icon icon="ic:twotone-close" className="text-white h-8 w-8" />
        </button>

        {/* Main Image Section with Navigation Arrows */}
        <div className="flex justify-center items-center z-40 mb-4 w-full">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous Image"
            className={`text-white ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""} flex items-center justify-center h-10 w-10 md:h-12 md:w-12`}
          >
            <Icon icon="tabler:arrow-left" className="text-[#c4a053] h-8 w-8 md:h-10 md:w-10" />
          </button>
          <Image
            src={GalleryCard[currentIndex].Imgsrc}
            alt={GalleryCard[currentIndex].name}
            width={500} // Adjusted width for mobile
            height={400} // Adjusted height for mobile
            className="rounded-lg object-cover transition-opacity duration-300 ease-in-out mx-4"
          />
          <button
            onClick={handleNext}
            disabled={currentIndex >= totalImages - 1}
            aria-label="Next Image"
            className={`text-white ${currentIndex >= totalImages - 1 ? "opacity-50 cursor-not-allowed" : ""} flex items-center justify-center h-10 w-10 md:h-12 md:w-12`}
          >
            <Icon icon="tabler:arrow-right" className="text-[#c4a053] h-8 w-8 md:h-10 md:w-10" />
          </button>
        </div>

        {/* Thumbnail Section Below the Main Image (Carousel for mobile) */}
        <div
          ref={carouselRef}
          className="flex space-x-2 mt-2 overflow-x-auto scrollbar-hide cursor-pointer snap-x snap-mandatory scroll-smooth"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {GalleryCard.map((image, index) => (
            <div
              key={index}
              className={`flex-shrink-0 ${index === currentIndex ? "border-2 border-[#c4a053]" : ""}`}
              onClick={() => handleSelectImage(index)}
            >
              <Image
                src={image.Imgsrc}
                alt={image.name}
                width={100} // Thumbnail width
                height={100} // Thumbnail height
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
