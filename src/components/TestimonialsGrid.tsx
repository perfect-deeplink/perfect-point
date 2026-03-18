'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faStarHalfAlt,
  faUser,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
// Using solid star with color variant for empty stars

interface Testimonial {
  id: number;
  name: string;
  course: string;
  rating: number;
  feedback: string;
  category: string;
  photo?: string;
}



const filters = [
  { value: 'all', label: 'All Reviews' },
  { value: 'placement', label: 'Placement Stories' },
  { value: 'course', label: 'Course Feedback' },
  { value: 'faculty', label: 'Faculty Appreciation' },
];

function StarRating({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} className="w-4 h-4 text-yellow-400" />
      );
    } else if (i < rating) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStarHalfAlt} className="w-4 h-4 text-yellow-400" />
      );
    } else {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} className="w-4 h-4 text-gray-300" />
      );
    }
  }
  return <div className="flex gap-0.5">{stars}</div>;
}

export default function TestimonialsGrid() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch('/api/testimonials');
        if (res.ok) {
          const data = await res.json();
          const fetched = Array.isArray(data) ? data : data.data || [];
          setTestimonials(fetched);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  const filtered =
    activeFilter === 'all'
      ? testimonials
      : testimonials.filter((t) => t.category === activeFilter);

  return (
    <section>
      <h2 className="text-2xl sm:text-3xl font-bold text-secondary text-center mb-6">
        <FontAwesomeIcon icon={faStar} className="w-6 h-6 text-yellow-400 mr-2" />
        Student Reviews
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === f.value
                ? 'bg-gradient-to-r from-accent to-purple text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-400">
          <FontAwesomeIcon icon={faSpinner} className="w-8 h-8 animate-spin" />
          <span className="ml-3 text-lg">Loading testimonials...</span>
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <StarRating rating={t.rating} />
              <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-5 italic">
                &ldquo;{t.feedback}&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent to-purple flex items-center justify-center text-white shrink-0">
                  {t.photo ? (
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-secondary">{t.name}</h4>
                  <p className="text-xs text-gray-400">{t.course} Student</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-12 text-center text-gray-400">
          <p className="text-lg">No testimonials found for this category.</p>
        </div>
      )}
    </section>
  );
}
