'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Option 1: If your image is located in the public folder, reference it directly:
const s1 = "/s1.png";
const s2 = "/s2.png"
// Option 2: If you prefer to import the image, ensure the file path is correct and matches the folder name & case.
// import s1 from "../IMAGES/s1.png";

const images = [
  {
    url: s1,
    alt: "Modern workspace with laptop"
  },
  {
    url: s2,
    alt: "Team collaboration"
  },
  // {
  //   url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&h=900&q=80",
  //   alt: "Office workspace"
  // },
  // {
  //   url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&h=900&q=80",
  //   alt: "Technology and workspace"
  // }
];

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const getPrevIndex = () => {
    return currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  };

  const getNextIndex = () => {
    return currentIndex === images.length - 1 ? 0 : currentIndex + 1;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto h-[500px] overflow-hidden group">
      {/* Previous Image */}
      <div className="absolute top-0 left-0 w-[85%] h-full -translate-x-[30%] scale-90 opacity-50">
        <div className="w-full h-full overflow-hidden rounded-xl">
          <img
            src={images[getPrevIndex()].url}
            alt={images[getPrevIndex()].alt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Next Image */}
      <div className="absolute top-0 right-0 w-[85%] h-full translate-x-[30%] scale-90 opacity-50">
        <div className="w-full h-full overflow-hidden rounded-xl">
          <img
            src={images[getNextIndex()].url}
            alt={images[getNextIndex()].alt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Current Image */}
      <div 
        className="absolute top-0 left-1/2 w-[85%] h-full -translate-x-1/2 z-10 transition-transform duration-500 ease-out"
      >
        <div className="w-full h-full overflow-hidden rounded-xl shadow-2xl">
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === index 
                ? 'bg-white w-6' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Auto-play Toggle */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
      >
        {isAutoPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <ImageSlider />
    </div>
  );
}
