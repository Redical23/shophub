"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Updated testimonials with full images
const testimonials = [
  {
    url: "/placeholder.svg?height=600&width=400",
    name: "John Doe",
    position: "Software Engineer",
    quote:
      "Technology is best when it brings people together. Innovation distinguishes between a leader and a follower.",
  },
  {
    url: "/placeholder.svg?height=600&width=400",
    name: "Jane Smith",
    position: "Lawyer",
    quote:
      "Justice is truth in action. The law is not a light for you or any man to see by; the law is not an instrument of any kind.",
  },
  {
    url: "/placeholder.svg?height=600&width=400",
    name: "Robert Brown",
    position: "Student",
    quote:
      "Education is the most powerful weapon which you can use to change the world. The beautiful thing about learning is that no one can take it away from you.",
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }, [])

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index)
  }, [])

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(!isAutoPlaying)
  }, [isAutoPlaying])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide()
      } else if (e.key === "ArrowRight") {
        nextSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  useEffect(() => {
    let interval
    if (isAutoPlaying && !isPaused) {
      interval = setInterval(nextSlide, 5000)
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying, isPaused, nextSlide])

  return (
    <div
      className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-xl shadow-2xl"
      style={{ backgroundColor: "#00103a" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-[600px] sm:h-[500px] md:h-[400px]">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex flex-col md:flex-row transition-opacity duration-700 ease-in-out
              ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            aria-hidden={index !== currentIndex}
          >
            {/* Left side - Full image */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
              <img
                src={testimonial.url || "/placeholder.svg"}
                alt={testimonial.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
            </div>

            {/* Right side - Content */}
            <div
              className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center p-6 sm:p-8 md:p-12"
              style={{ backgroundColor: "#00103a" }}
            >
              <div className="mb-6">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-blue-400 opacity-80">
                  <path
                    d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              <blockquote className="text-lg sm:text-xl md:text-2xl font-light text-white mb-6 sm:mb-8 leading-relaxed italic">
                {testimonial.quote}
              </blockquote>

              <div className="mt-auto">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-300">{testimonial.name}</h3>
                <p className="text-sm uppercase tracking-wider text-blue-400 font-medium mt-1">
                  {testimonial.position}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-1.5 sm:p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-1.5 sm:p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Next testimonial"
        >
          <ChevronRight size={18} />
        </button>

        {/* Indicator dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-blue-500 w-6" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}



