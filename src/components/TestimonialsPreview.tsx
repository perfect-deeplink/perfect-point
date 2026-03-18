'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faQuoteLeft,
  faStar,
  faStarHalfAlt,
  faUser,
  faComments,
} from '@fortawesome/free-solid-svg-icons';

interface Testimonial {
  _id: string;
  name: string;
  course: string;
  rating: number;
  feedback: string;
  photo?: string;
}

function StarRating({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className="w-4 h-4 text-warning"
        />
      );
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStarHalfAlt}
          className="w-4 h-4 text-warning"
        />
      );
    } else {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className="w-4 h-4 text-gray-300"
        />
      );
    }
  }
  return <div className="flex gap-1">{stars}</div>;
}

export default function TestimonialsPreview() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          setTestimonials(data.data.slice(0, 3));
        }
      })
      .catch(() => {});
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-secondary text-center mb-2">
          <FontAwesomeIcon
            icon={faQuoteLeft}
            className="w-7 h-7 text-accent mr-2"
          />
          What Our Students Say
        </h2>
        <p className="text-center text-gray-500 mb-10">
          Real feedback from our successful students
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-1 transition"
            >
              <StarRating rating={t.rating} />
              <p className="text-gray-600 mt-4 mb-6 text-sm leading-relaxed italic">
                &ldquo;{t.feedback}&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t pt-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="w-4 h-4 text-accent"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary text-sm">
                    {t.name}
                  </h4>
                  <p className="text-xs text-gray-500">{t.course}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition border-2 border-secondary text-secondary hover:bg-secondary hover:text-white"
          >
            <FontAwesomeIcon icon={faComments} className="w-4 h-4" />
            View All Testimonials
          </Link>
        </div>
      </div>
    </section>
  );
}
