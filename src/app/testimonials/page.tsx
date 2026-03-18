'use client';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faUser, faVideo, faPlayCircle, faCommentAlt, faTrophy, faHandshake, faBuilding, faCity, faLaptopHouse, faIndustry, faEdit, faPaperPlane, faSpinner, faGraduationCap, faCalendar, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
// Use solid star outline style instead of regular icon

interface TestimonialData {
  _id?: string;
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
      {/* Hero */}
      <section className="bg-gradient-to-br from-accent to-purple text-white py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Success Stories from OK ACADEMY</h1>
        <p className="text-lg opacity-90 mb-8">Hear from our students who transformed their careers</p>
        <div className="flex flex-wrap justify-center gap-8">
          {[{ val: '4.8/5', label: 'Student Rating' }, { val: '5000+', label: 'Students Trained' }, { val: '85%', label: 'Placement Rate' }, { val: '15+', label: 'Years Trusted' }].map((s, i) => (
            <div key={i} className="text-center">
              <h3 className="text-3xl font-bold">{s.val}</h3>
              <p className="opacity-90 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Video Testimonials */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-secondary mb-2"><FontAwesomeIcon icon={faVideo} className="text-primary mr-2" />Video Testimonials</h2>
          <p className="text-gray-500 mb-6">Watch our students share their experiences</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{ name: "Rahul's Web Development Journey", desc: 'From Kurawli to Delhi IT Company' }, { name: "Priya's Graphic Design Success", desc: 'Now working as freelance designer' }, { name: "Amit's Tally Career Growth", desc: 'Placed in Mainpuri CA firm' }].map((v, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-44 bg-secondary flex items-center justify-center relative cursor-pointer group">
                  <FontAwesomeIcon icon={faPlayCircle} className="text-5xl text-white group-hover:scale-125 transition" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-secondary text-sm">{v.name}</h3>
                  <p className="text-xs text-gray-400">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

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

        {/* Success Stories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-secondary mb-6"><FontAwesomeIcon icon={faTrophy} className="text-primary mr-2" />Featured Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-2 grid grid-cols-1 md:grid-cols-2">
              <div className="h-48 md:h-auto bg-gray-100 flex items-center justify-center"><FontAwesomeIcon icon={faGraduationCap} className="text-6xl text-gray-300" /></div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-secondary mb-2">From Farm to IT Park: Ravi&apos;s Journey</h3>
                <div className="flex gap-4 text-xs text-gray-400 mb-3">
                  <span><FontAwesomeIcon icon={faGraduationCap} className="mr-1" />Web Development</span>
                  <span><FontAwesomeIcon icon={faCalendar} className="mr-1" />2023 Batch</span>
                </div>
                <p className="text-gray-600 text-sm italic mb-4">&ldquo;Coming from a farming family in Kurawli, I never thought I could work in IT. OK ACADEMY gave me the skills and confidence.&rdquo;</p>
                <div className="text-sm space-y-1">
                  <p><strong>Before:</strong> Helping in family farm</p>
                  <p><strong>After:</strong> Web Developer at Tech Solutions, Noida</p>
                  <p><strong>Salary:</strong> ₹45,000 per month</p>
                </div>
              </div>
            </div>
            {[
              { title: "Housewife to Accountant: Suman's Transformation", text: 'OK ACADEMY\'s flexible batches allowed me to learn Tally while managing home.', tags: ['Tally Course', 'Career Comeback'] },
              { title: "College Student to Freelancer: Vikas's Story", text: 'Started freelancing in 3rd year, now earning ₹25,000 monthly.', tags: ['Web Development', 'Freelancing'] },
              { title: "Government Job Success: Neha's Achievement", text: 'CCC course helped me clear the computer test for UP Police.', tags: ['CCC Course', 'Government Job'] },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-40 bg-gray-100 flex items-center justify-center"><FontAwesomeIcon icon={faGraduationCap} className="text-4xl text-gray-300" /></div>
                <div className="p-5">
                  <h3 className="font-bold text-secondary mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">&ldquo;{s.text}&rdquo;</p>
                  <div className="flex flex-wrap gap-2">{s.tags.map(t => <span key={t} className="px-3 py-1 bg-blue-50 text-primary rounded-full text-xs">{t}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Placement Partners */}
        <section className="bg-gray-50 p-8 rounded-xl mb-12">
          <h2 className="text-2xl font-bold text-secondary mb-2 text-center"><FontAwesomeIcon icon={faHandshake} className="text-primary mr-2" />Where Our Students Work</h2>
          <p className="text-center text-gray-500 mb-6">Our students are placed in companies across Mainpuri and beyond</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: faBuilding, title: 'Local Businesses', desc: 'CA Firms, Printing Press, Schools' },
              { icon: faCity, title: 'District Level', desc: 'Government Offices, Banks' },
              { icon: faLaptopHouse, title: 'Remote Work', desc: 'Freelancing, Remote IT Jobs' },
              { icon: faIndustry, title: 'Metro Cities', desc: 'Delhi NCR, Bangalore, Pune' },
            ].map((p, i) => (
              <div key={i} className="bg-white p-5 rounded-xl text-center">
                <FontAwesomeIcon icon={p.icon} className="text-3xl text-primary mb-3" />
                <h3 className="font-bold text-secondary text-sm mb-1">{p.title}</h3>
                <p className="text-xs text-gray-400">{p.desc}</p>
              </div>
            ))}
          </div>
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
