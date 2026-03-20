'use client';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faUser, faVideo, faPlayCircle, faCommentAlt, faTrophy, faHandshake, faBuilding, faCity, faLaptopHouse, faIndustry, faEdit, faPaperPlane, faSpinner, faGraduationCap, faCalendar, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
// Use solid star outline style instead of regular icon

interface TestimonialData {
  id?: number;
  name: string;
  course: string;
  rating: number;
  feedback: string;
  category?: string;
  photo?: string;
}



function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <FontAwesomeIcon key={i} icon={i <= Math.floor(rating) ? faStar : i <= rating ? faStarHalfAlt : faStar} className={i <= rating ? 'text-warning' : 'text-gray-300'} />
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({ name: '', course: '', current: '', testimonial: '', rating: 0, permission: false });
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    fetch('/api/testimonials').then(r => r.json()).then(data => {
      if (data.success && data.data?.length > 0) setTestimonials(data.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? testimonials : testimonials.filter(t => t.category === filter);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (formData.rating === 0) { setSubmitMsg('Please select a rating'); return; }
    setSubmitting(true);
    try {
      const res = await fetch('/api/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: formData.name, course: formData.course, rating: formData.rating, feedback: formData.testimonial, current: formData.current, category: 'course' }) });
      const data = await res.json();
      if (data.success) {
        setSubmitMsg('Thank you for sharing your story! It will be reviewed and published soon.');
        setFormData({ name: '', course: '', current: '', testimonial: '', rating: 0, permission: false });
        setHoverRating(0);
      } else throw new Error();
    } catch { setSubmitMsg('Error submitting. Please try again.'); }
    setSubmitting(false);
    setTimeout(() => setSubmitMsg(''), 5000);
  }

  return (
    <>
      <section className="bg-gradient-to-br from-accent to-purple text-white py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Success Stories from OK ACADEMY</h1>
        <p className="text-lg opacity-90 mb-8">Hear from our students who transformed their careers</p>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-8">


        {/* Written Testimonials */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-secondary mb-4"><FontAwesomeIcon icon={faCommentAlt} className="text-primary mr-2" />Student Reviews</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {[{ key: 'all', label: 'All Reviews' }, { key: 'placement', label: 'Placement Stories' }, { key: 'course', label: 'Course Feedback' }, { key: 'faculty', label: 'Faculty Appreciation' }].map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)} className={`px-5 py-2 rounded-full text-sm transition ${filter === f.key ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{f.label}</button>
            ))}
          </div>
          {loading ? (
            <div className="text-center py-12 text-gray-400"><FontAwesomeIcon icon={faSpinner} spin className="mr-2" />Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((t, i) => (
                <div key={i} className="bg-white p-5 rounded-xl shadow-md border-l-4 border-primary">
                  <Stars rating={t.rating} />
                  <p className="text-gray-600 italic my-3 text-sm leading-relaxed">&ldquo;{t.feedback}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent to-purple rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faUser} className="text-white text-sm" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary text-sm">{t.name}</h4>
                      <p className="text-xs text-gray-400">{t.course} Student</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>



        {/* Add Testimonial Form */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-secondary mb-2"><FontAwesomeIcon icon={faEdit} className="text-primary mr-2" />Share Your Success Story</h2>
            <p className="text-gray-500">Are you an OK ACADEMY student? We&apos;d love to feature your story!</p>
          </div>
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-secondary">Your Name *</label>
                <input type="text" required value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-secondary">Course Completed *</label>
                <select required value={formData.course} onChange={e => setFormData(f => ({ ...f, course: e.target.value }))} className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm">
                  <option value="">Select Course</option>
                  <option value="MS Office">MS Office</option>
                  <option value="Tally with GST">Tally with GST</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="CCC">CCC</option>
                  <option value="O-Level">O-Level</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-secondary">Current Status *</label>
                <input type="text" required placeholder="Job/College/Business" value={formData.current} onChange={e => setFormData(f => ({ ...f, current: e.target.value }))} className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-secondary">Rating *</label>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map(v => (
                    <span key={v} onClick={() => setFormData(f => ({ ...f, rating: v }))} onMouseEnter={() => setHoverRating(v)} onMouseLeave={() => setHoverRating(0)} className={`text-2xl cursor-pointer transition ${v <= (hoverRating || formData.rating) ? 'text-warning' : 'text-gray-300'}`}>★</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-secondary">Your Success Story *</label>
              <textarea required rows={4} placeholder="Share your journey..." value={formData.testimonial} onChange={e => setFormData(f => ({ ...f, testimonial: e.target.value }))} className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm" />
            </div>
            <div className="flex items-start gap-2 mb-4">
              <input type="checkbox" required checked={formData.permission} onChange={e => setFormData(f => ({ ...f, permission: e.target.checked }))} className="mt-1" />
              <label className="text-xs text-gray-600">I give permission to OK ACADEMY to use my testimonial *</label>
            </div>
            <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-purple text-white rounded-full font-semibold hover:-translate-y-0.5 transition disabled:opacity-50">
              <FontAwesomeIcon icon={submitting ? faSpinner : faPaperPlane} spin={submitting} />
              {submitting ? 'Submitting...' : 'Submit Your Story'}
            </button>
            {submitMsg && <p className="mt-3 text-sm text-success"><FontAwesomeIcon icon={faCheckCircle} className="mr-1" />{submitMsg}</p>}
          </form>
        </section>
      </main>
    </>
  );
}
