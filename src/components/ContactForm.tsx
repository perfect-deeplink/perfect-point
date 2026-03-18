'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSpinner, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [charCount, setCharCount] = useState(500);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setNotification(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !name.trim()) {
      setNotification({ message: 'Please enter your name.', type: 'error' });
      setLoading(false);
      return;
    }
    if (!email || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNotification({ message: 'Please enter a valid email address.', type: 'error' });
      setLoading(false);
      return;
    }
    if (!message || !message.trim()) {
      setNotification({ message: 'Please enter a message.', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('https://formspree.io/f/xpqyyqez', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          fatherName: formData.get('fatherName'),
          phone: formData.get('phone'),
          address: formData.get('address'),
          education: formData.get('education'),
          preferredTime: formData.get('preferredTime'),
          preferredMode: formData.get('preferredMode'),
          message,
        }),
      });
      if (res.ok) {
        setNotification({ message: 'Thank you! Your inquiry has been submitted. We will contact you soon.', type: 'success' });
        form.reset();
        setCharCount(500);
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      setNotification({ message: 'Sorry, there was an error. Please try again or call us directly.', type: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => setNotification(null), 5000);
    }
  }

  return (
    <section className="bg-white p-6 md:p-8 rounded-xl shadow-md mb-12">
      <h2 className="text-2xl font-bold text-secondary mb-1">Send Us a Message</h2>
      <p className="text-gray-500 mb-6">Fill the form below and we&apos;ll get back to you within 24 hours</p>

      {notification && (
        <div className={`fixed top-5 right-5 z-[10000] px-5 py-4 rounded-xl text-white flex items-center gap-3 shadow-lg max-w-md animate-slideInRight ${notification.type === 'success' ? 'bg-success' : 'bg-danger'}`}>
          <FontAwesomeIcon icon={notification.type === 'success' ? faCheckCircle : faExclamationCircle} />
          <span>{notification.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block mb-1 text-secondary font-medium">Your Full Name *</label>
            <input type="text" id="name" name="name" required placeholder="Enter your full name" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label htmlFor="fatherName" className="block mb-1 text-secondary font-medium">Father&apos;s Name</label>
            <input type="text" id="fatherName" name="fatherName" placeholder="Enter father's name" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="phone" className="block mb-1 text-secondary font-medium">Phone / WhatsApp Number</label>
            <input type="tel" id="phone" name="phone" placeholder="10-digit mobile number" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-secondary font-medium">Email Address *</label>
            <input type="email" id="email" name="email" required placeholder="yourname@example.com" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block mb-1 text-secondary font-medium">Full Address (Optional)</label>
          <textarea id="address" name="address" rows={2} placeholder="Village/Town, Post, District, Pin Code" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
        </div>

        <div className="mb-4">
          <label htmlFor="education" className="block mb-1 text-secondary font-medium">Education Qualification</label>
          <select id="education" name="education" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary">
            <option value="">Select your qualification</option>
            <option value="10th">10th Pass</option>
            <option value="12th">12th Pass</option>
            <option value="graduate">Graduate</option>
            <option value="post-graduate">Post Graduate</option>
            <option value="diploma">Diploma</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="preferredTime" className="block mb-1 text-secondary font-medium">Preferred Time</label>
            <select id="preferredTime" name="preferredTime" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary">
              <option value="">Select time</option>
              <option value="morning">Morning (9 AM - 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
              <option value="evening">Evening (4 PM - 8 PM)</option>
            </select>
          </div>
          <div>
            <label htmlFor="preferredMode" className="block mb-1 text-secondary font-medium">Preferred Mode</label>
            <select id="preferredMode" name="preferredMode" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary">
              <option value="walk-in">Walk-in at Center</option>
              <option value="call">Phone Call</option>
              <option value="video">Video Call</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block mb-1 text-secondary font-medium">Your Message / Questions *</label>
          <textarea id="message" name="message" required rows={4} maxLength={500} placeholder="Tell us about your career goals..." className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary" onChange={(e) => setCharCount(500 - e.target.value.length)} />
          <div className={`text-right text-xs mt-1 ${charCount < 50 ? 'text-danger' : 'text-gray-400'}`}>{charCount} characters remaining</div>
        </div>

        <div className="flex items-start gap-2 mb-6">
          <input type="checkbox" id="terms" name="terms" required className="mt-1" />
          <label htmlFor="terms" className="text-sm text-gray-600">I agree to receive communication from OK ACADEMY *</label>
        </div>

        <button type="submit" disabled={loading} className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-accent to-purple text-white rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-lg transition disabled:opacity-50">
          <FontAwesomeIcon icon={loading ? faSpinner : faPaperPlane} spin={loading} />
          {loading ? 'Submitting...' : 'Submit Your Inquiry'}
        </button>

        <p className="mt-4 text-gray-400 text-sm">
          <FontAwesomeIcon icon={faCheckCircle} className="mr-1" /> We respect your privacy. Your information will not be shared.
        </p>
      </form>
    </section>
  );
}
