'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt, faClock, faHeadset, faCalendarCheck, faDirections, faExternalLinkAlt, faBus, faCar, faQuestionCircle, faEnvelope, faGlobe, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import ContactForm from '@/components/ContactForm';

interface SiteSettings {
  phone: string;
  email: string;
  address: string;
  timing: string;
}

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/footer')
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data) {
          setSettings({
            phone: data.data.phone || '+91 9876543210',
            email: data.data.email || 'info@okacademykurawli.com',
            address: data.data.address || 'Near Post Office, Kurawli, Mainpuri, UP - 205001',
            timing: data.data.timing || 'Mon - Sat: 9:00 AM - 8:00 PM',
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const phone = settings?.phone || '+91 9876543210';
  const email = settings?.email || 'info@okacademykurawli.com';
  const address = settings?.address || 'Near Post Office, Kurawli, Mainpuri, UP - 205001';
  const timing = settings?.timing || 'Mon - Sat: 9:00 AM - 8:00 PM';
  // Remove spaces for links
  const phoneLink = phone.replace(/\\s+/g, '');

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-accent to-purple text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch with OK ACADEMY</h1>
          <p className="text-lg opacity-90 mb-6">Have questions about computer courses? We&apos;re here to help!</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={`tel:${phoneLink}`} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-full font-semibold hover:-translate-y-0.5 transition shadow-lg">
              <FontAwesomeIcon icon={faPhone} /> Call Now: {phone}
            </a>
            <a href={`https://wa.me/${phoneLink.replace('+', '')}`} target="_blank" className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full font-semibold hover:-translate-y-0.5 transition shadow-lg" rel="noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-20 text-gray-400">
            <FontAwesomeIcon icon={faSpinner} spin className="mr-3" />
            Loading contact options...
          </div>
        ) : (
          <>
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-md text-center flex flex-col items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-4xl text-primary mb-4" />
                <h3 className="text-lg font-bold text-secondary mb-3">Visit Our Center</h3>
                <p className="text-gray-600 text-sm mb-1"><strong>OK ACADEMY</strong></p>
                <p className="text-gray-600 text-sm">{address}</p>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(address)}`} target="_blank" rel="noreferrer" className="inline-block mt-auto pt-3 px-4 py-2 bg-primary text-white rounded-full text-sm">
                  <FontAwesomeIcon icon={faDirections} className="mr-1" /> Get Directions
                </a>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center flex flex-col items-center">
                <FontAwesomeIcon icon={faClock} className="text-4xl text-primary mb-4" />
                <h3 className="text-lg font-bold text-secondary mb-3">Center Timings</h3>
                <p className="text-gray-600 text-sm whitespace-pre-wrap">{timing.replace(' | ', '\\n')}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center flex flex-col items-center">
                <FontAwesomeIcon icon={faHeadset} className="text-4xl text-primary mb-4" />
                <h3 className="text-lg font-bold text-secondary mb-3">Quick Contact</h3>
                <p className="text-gray-600 text-sm mb-1"><FontAwesomeIcon icon={faPhone} className="text-primary mr-2" />{phone}</p>
                <p className="text-gray-600 text-sm mb-1"><FontAwesomeIcon icon={faWhatsapp} className="text-primary mr-2" />{phone}</p>
                <p className="text-gray-600 text-sm mb-1"><FontAwesomeIcon icon={faEnvelope} className="text-primary mr-2" />{email}</p>
                <p className="text-gray-600 text-sm"><FontAwesomeIcon icon={faGlobe} className="text-primary mr-2" />okacademykurawli.com</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center flex flex-col items-center">
                <FontAwesomeIcon icon={faCalendarCheck} className="text-4xl text-primary mb-4" />
                <h3 className="text-lg font-bold text-secondary mb-3">Free Counseling</h3>
                <p className="text-gray-600 text-sm mb-3">Get free career counseling from our experts.</p>
                <Link href="#contactForm" className="inline-block mt-auto px-4 py-2 bg-gradient-to-r from-accent to-purple text-white rounded-full text-sm font-semibold">
                  Book Free Session
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <div id="contactForm">
              <ContactForm />
            </div>

            {/* Map */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-secondary mb-6"><FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary mr-2" /> Find Us on Map</h2>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
                  <div>
                    <h3 className="text-lg font-bold text-secondary mb-3">OK ACADEMY Location</h3>
                    <p className="text-gray-600 text-sm mb-2"><FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary mr-2" />{address}</p>
                    <p className="text-gray-600 text-sm mb-2"><FontAwesomeIcon icon={faDirections} className="text-primary mr-2" />Opposite State Bank of India, Near Bus Stand</p>
                    <p className="text-gray-600 text-sm mb-2"><FontAwesomeIcon icon={faBus} className="text-primary mr-2" />Easily accessible by bus from Mainpuri (15 km)</p>
                    <p className="text-gray-600 text-sm"><FontAwesomeIcon icon={faCar} className="text-primary mr-2" />Parking available for students</p>
                  </div>
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(address)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:-translate-y-0.5 transition">
                    <FontAwesomeIcon icon={faExternalLinkAlt} /> Open in Google Maps
                  </a>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary mb-6">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { q: 'What are the course fees?', a: 'Basic courses start from ₹3,000, while advanced courses like Web Development may cost ₹15,000-20,000. Contact us for detailed fee structure.' },
                  { q: 'Do you provide certificates?', a: 'Yes, we provide completion certificates for all courses. For CCC, O-Level, we facilitate certification through NIELIT.' },
                  { q: 'Is there placement assistance?', a: 'Yes, we provide 100% placement assistance with local businesses in Mainpuri and companies in Delhi/NCR.' },
                  { q: 'What is the batch timing?', a: 'We have Morning (9-12), Afternoon (2-5), and Evening (5-8) batches. Weekend batches also available.' },
                ].map((faq, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="font-bold text-secondary mb-2"><FontAwesomeIcon icon={faQuestionCircle} className="text-primary mr-2" />{faq.q}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}
