import { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt, faClock, faHeadset, faCalendarCheck, faDirections, faExternalLinkAlt, faBus, faCar, faQuestionCircle, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us - OK ACADEMY Kurawli Computer Training Center',
  description: 'Contact OK ACADEMY in Kurawli, Mainpuri for computer courses. Call, WhatsApp, email, or visit our center for free counseling.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-accent to-purple text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch with OK ACADEMY</h1>
          <p className="text-lg opacity-90 mb-6">Have questions about computer courses? We&apos;re here to help!</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+919876543210" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-full font-semibold hover:-translate-y-0.5 transition shadow-lg">
              <FontAwesomeIcon icon={faPhone} /> Call Now: +91 9876543210
            </a>
            <a href="https://wa.me/919876543210" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full font-semibold hover:-translate-y-0.5 transition shadow-lg">
              <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-4xl text-primary mb-4" />
            <h3 className="text-lg font-bold text-secondary mb-3">Visit Our Center</h3>
            <p className="text-gray-600 text-sm mb-1"><strong>OK ACADEMY</strong></p>
            <p className="text-gray-600 text-sm">Near Post Office, Kurawli<br />Mainpuri, UP - 205001</p>
            <a href="https://maps.google.com/?q=Kurawli,Mainpuri,Uttar+Pradesh" target="_blank" className="inline-block mt-3 px-4 py-2 bg-primary text-white rounded-full text-sm">
              <FontAwesomeIcon icon={faDirections} className="mr-1" /> Get Directions
            </a>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <FontAwesomeIcon icon={faClock} className="text-4xl text-primary mb-4" />
            <h3 className="text-lg font-bold text-secondary mb-3">Center Timings</h3>
            <p className="text-gray-600 text-sm"><strong>Mon - Sat:</strong><br />9:00 AM - 8:00 PM</p>
            <p className="text-gray-600 text-sm mt-2"><strong>Sunday:</strong><br />10:00 AM - 4:00 PM</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <FontAwesomeIcon icon={faHeadset} className="text-4xl text-primary mb-4" />
            <h3 className="text-lg font-bold text-secondary mb-3">Quick Contact</h3>
            <p className="text-gray-600 text-sm mb-1"><FontAwesomeIcon icon={faPhone} className="text-primary mr-2" />+91 9876543210</p>
            <p className="text-gray-600 text-sm mb-1"><FontAwesomeIcon icon={faWhatsapp} className="text-primary mr-2" />+91 9876543210</p>
            <p className="text-gray-600 text-sm mb-1"><FontAwesomeIcon icon={faEnvelope} className="text-primary mr-2" />info@okacademykurawli.com</p>
            <p className="text-gray-600 text-sm"><FontAwesomeIcon icon={faGlobe} className="text-primary mr-2" />okacademykurawli.com</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <FontAwesomeIcon icon={faCalendarCheck} className="text-4xl text-primary mb-4" />
            <h3 className="text-lg font-bold text-secondary mb-3">Free Counseling</h3>
            <p className="text-gray-600 text-sm mb-3">Get free career counseling from our experts.</p>
            <Link href="/contact#contactForm" className="inline-block px-4 py-2 bg-gradient-to-r from-accent to-purple text-white rounded-full text-sm font-semibold">
              Book Free Session
            </Link>
          </div>
        </div>

        {/* Contact Form */}
        <ContactForm />

        {/* Map */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-secondary mb-6"><FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary mr-2" /> Find Us on Map</h2>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
              <div>
                <h3 className="text-lg font-bold text-secondary mb-3">OK ACADEMY Location</h3>
                <p className="text-gray-600 text-sm mb-2"><FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary mr-2" />Near Post Office, Kurawli, Mainpuri, UP - 205001</p>
                <p className="text-gray-600 text-sm mb-2"><FontAwesomeIcon icon={faDirections} className="text-primary mr-2" />Opposite State Bank of India, Near Bus Stand</p>
                <p className="text-gray-600 text-sm mb-2"><FontAwesomeIcon icon={faBus} className="text-primary mr-2" />Easily accessible by bus from Mainpuri (15 km)</p>
                <p className="text-gray-600 text-sm"><FontAwesomeIcon icon={faCar} className="text-primary mr-2" />Parking available for students</p>
              </div>
              <a href="https://maps.google.com/?q=Kurawli,Mainpuri,Uttar+Pradesh" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:-translate-y-0.5 transition">
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
      </main>
    </>
  );
}
