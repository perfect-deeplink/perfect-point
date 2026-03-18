'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [whatsapp, setWhatsapp] = useState('');
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdmin) return;
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) return;
    fetch('/api/settings')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data?.whatsapp) {
          setWhatsapp(d.data.whatsapp.replace(/[^0-9]/g, ''));
        }
      })
      .catch(() => {});
  }, [isAdmin]);

  if (isAdmin) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`w-[45px] h-[45px] rounded-full bg-gradient-to-r from-[#3498db] to-[#2c3e50] text-white shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 ${
          showBackToTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <FontAwesomeIcon icon={faChevronUp} className="w-4 h-4" />
      </button>
      {whatsapp && (
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-[60px] h-[60px] rounded-full bg-gradient-to-r from-[#25d366] to-[#128c7e] text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="w-7 h-7" />
        </a>
      )}
    </div>
  );
}
