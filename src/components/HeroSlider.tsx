'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faChevronLeft,
  faChevronRight,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

export interface SlideData {
  gradient: string;
  title: string;
  tagline: string;
  intro: string;
  image?: string;
}

const defaultSlides: SlideData[] = [
  {
    gradient: 'from-[#667eea] to-[#764ba2]',
    title: 'Welcome to OK ACADEMY',
    tagline: 'Learn Computer Skills from Basics to Advanced',
    intro: 'Quality computer training for students, professionals, and businesses.',
  },
];

export default function HeroSlider({ heroSlides }: { heroSlides?: SlideData[] }) {
  const slides = heroSlides && heroSlides.length > 0 ? heroSlides : defaultSlides;
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused, slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) { next(); } else { prev(); }
    }
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '600px', height: '85vh' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${slide.gradient} transition-opacity duration-700 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
          style={slide.image ? {
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          } : undefined}
        >
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight transition-all duration-700 ${
                index === current
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
            >
              {slide.title}
            </h2>
            <p
              className={`text-lg sm:text-xl md:text-2xl mb-4 font-light transition-all duration-700 delay-100 ${
                index === current
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
            >
              {slide.tagline}
            </p>
            <p
              className={`text-sm sm:text-base md:text-lg mb-8 max-w-2xl mx-auto opacity-90 transition-all duration-700 delay-200 ${
                index === current
                  ? 'translate-y-0 opacity-90'
                  : 'translate-y-8 opacity-0'
              }`}
            >
              {slide.intro}
            </p>
            <div
              className={`flex flex-wrap justify-center gap-3 sm:gap-4 transition-all duration-700 delay-300 ${
                index === current
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition bg-white text-secondary hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faUserPlus} className="w-4 h-4" />
                Enroll Now
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition border-2 border-white text-white hover:bg-white/20"
              >
                <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                Call Now
              </Link>
            </div>
          </div>
        </div>
      ))}

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition flex items-center justify-center"
            aria-label="Previous"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition flex items-center justify-center"
            aria-label="Next"
          >
            <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
