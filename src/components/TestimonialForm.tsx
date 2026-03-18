'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faInfoCircle,
  faSpinner,
  faCheckCircle,
  faTimesCircle,
  faStar,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
// Using solid star with gray color for empty stars instead of regular icon

const courseOptions = [
  { value: 'ms-office', label: 'MS Office' },
  { value: 'tally', label: 'Tally with GST' },
  { value: 'web', label: 'Web Development' },
  { value: 'design', label: 'Graphic Design' },
  { value: 'ccc', label: 'CCC' },
  { value: 'olevel', label: 'O-Level' },
  { value: 'other', label: 'Other' },
];

export default function TestimonialForm() {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [testimonial, setTestimonial] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [permission, setPermission] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setNotification({ type: 'error', message: 'Please select a rating.' });
      return;
    }

    setSubmitting(true);
    setNotification(null);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('course', course);
      formData.append('current', currentStatus);
      formData.append('rating', String(rating));
      formData.append('testimonial', testimonial);
      formData.append('permission', String(permission));
      if (photo) formData.append('photo', photo);

      const res = await fetch('/api/testimonials', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setNotification({
          type: 'success',
          message:
            'Thank you! Your story has been submitted. It will be reviewed and featured on our website.',
        });
        setName('');
        setCourse('');
        setCurrentStatus('');
        setRating(0);
        setTestimonial('');
        setPhoto(null);
        setPermission(false);
      } else {
        throw new Error();
      }
    } catch {
      setNotification({
        type: 'error',
        message: 'Something went wrong. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-10">
      <div className="max-w-3xl mx-auto">
        <h2 className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-bold text-secondary mb-2">
          <FontAwesomeIcon icon={faEdit} className="w-6 h-6 text-accent" />
          Share Your Success Story
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Are you an OK ACADEMY student? We&apos;d love to feature your success story!
        </p>

        {notification && (
          <div
            className={`flex items-center gap-3 p-4 rounded-lg mb-6 ${
              notification.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            <FontAwesomeIcon
              icon={notification.type === 'success' ? faCheckCircle : faTimesCircle}
              className="w-5 h-5 shrink-0"
            />
            <p className="text-sm">{notification.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 sm:p-8 space-y-6">
          {/* Name & Course */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="tname" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                id="tname"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="tcourse" className="block text-sm font-medium text-gray-700 mb-1">
                Course Completed *
              </label>
              <select
                id="tcourse"
                required
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition"
              >
                <option value="">Select Course</option>
                {courseOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Current Status & Rating */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="tcurrent" className="block text-sm font-medium text-gray-700 mb-1">
                Current Status *
              </label>
              <input
                type="text"
                id="tcurrent"
                required
                placeholder="Job/College/Business"
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating *</label>
              <div
                className="flex items-center gap-1 py-2"
                onMouseLeave={() => setHoverRating(0)}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHoverRating(value)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <FontAwesomeIcon
                      icon={faStar}
                      className={`w-7 h-7 transition-colors ${
                        value <= displayRating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div>
            <label htmlFor="ttestimonial" className="block text-sm font-medium text-gray-700 mb-1">
              Your Success Story *
            </label>
            <textarea
              id="ttestimonial"
              required
              rows={4}
              placeholder="Share your journey: Where you were before the course, how OK ACADEMY helped, and where you are now..."
              value={testimonial}
              onChange={(e) => setTestimonial(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition resize-none"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label htmlFor="tphoto" className="block text-sm font-medium text-gray-700 mb-1">
              Your Photo (Optional)
            </label>
            <input
              type="file"
              id="tphoto"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-accent/10 file:text-accent hover:file:bg-accent/20 transition"
            />
          </div>

          {/* Permission */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="tpermission"
              required
              checked={permission}
              onChange={(e) => setPermission(e.target.checked)}
              className="mt-1 w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
            />
            <label htmlFor="tpermission" className="text-sm text-gray-600">
              I give permission to OK ACADEMY to use my testimonial on website and marketing
              materials *
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-accent to-purple text-white font-semibold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon
              icon={submitting ? faSpinner : faPaperPlane}
              className={`w-4 h-4 ${submitting ? 'animate-spin' : ''}`}
            />
            {submitting ? 'Submitting...' : 'Submit Your Story'}
          </button>

          <p className="flex items-center gap-2 text-xs text-gray-400">
            <FontAwesomeIcon icon={faInfoCircle} className="w-3.5 h-3.5" />
            Selected stories will be featured on our website with your permission.
          </p>
        </form>
      </div>
    </section>
  );
}
