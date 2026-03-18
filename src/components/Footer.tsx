'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faYoutube,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faClock,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface FooterData {
  description: string;
  quickLinks: { href: string; label: string }[];
  popularCourses: string[];
  socialLinks: { href: string; platform: string }[];
  address: string;
  phone: string;
  email: string;
  timing: string;
  copyrightText: string;
}

const defaultQuickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/courses', label: 'Courses' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const platformIcons: Record<string, IconDefinition> = {
  facebook: faFacebookF,
  instagram: faInstagram,
  youtube: faYoutube,
  whatsapp: faWhatsapp,
};

export default function Footer() {
  const [footer, setFooter] = useState<FooterData | null>(null);

  useEffect(() => {
    fetch('/api/footer')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.data) {
          setFooter(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const description = footer?.description || 'Empowering students with cutting-edge computer education and professional skills for a brighter future.';
  const quickLinks = footer?.quickLinks && footer.quickLinks.length > 0 ? footer.quickLinks : defaultQuickLinks;
  const popularCourses = footer?.popularCourses && footer.popularCourses.length > 0 ? footer.popularCourses : [];
  const socialLinks = footer?.socialLinks && footer.socialLinks.length > 0 ? footer.socialLinks : [];
  const address = footer?.address || '';
  const phone = footer?.phone || '';
  const email = footer?.email || '';
  const timing = footer?.timing || 'Mon - Sat: 8:00 AM - 8:00 PM';
  const copyrightText = footer?.copyrightText || '© 2024 OK ACADEMY. All rights reserved. | Made with ❤ by MAYALOK VENTURES';

  return (
    <footer className="bg-[#2c3e50] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Academy Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">OK ACADEMY</h3>
            <p className="text-sm leading-relaxed mb-6">
              {description}
            </p>
            {socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#3498db] transition-colors duration-300"
                  >
                    <FontAwesomeIcon icon={platformIcons[social.platform] || faChevronRight} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#3498db] hover:pl-1 transition-all duration-200 inline-flex items-center gap-2"
                  >
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="w-2.5 h-2.5 text-[#3498db]"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Courses */}
          {popularCourses.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Popular Courses
              </h3>
              <ul className="space-y-2">
                {popularCourses.map((course) => (
                  <li key={course}>
                    <Link
                      href="/courses"
                      className="text-sm hover:text-[#3498db] hover:pl-1 transition-all duration-200 inline-flex items-center gap-2"
                    >
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="w-2.5 h-2.5 text-[#3498db]"
                      />
                      {course}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Info
            </h3>
            <ul className="space-y-4">
              {address && (
                <li className="flex items-start gap-3 text-sm">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="w-4 h-4 text-[#3498db] mt-0.5 shrink-0"
                  />
                  <span>{address}</span>
                </li>
              )}
              {phone && (
                <li>
                  <a
                    href={`tel:${phone}`}
                    className="flex items-start gap-3 text-sm hover:text-[#3498db] transition-colors duration-200"
                  >
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="w-4 h-4 text-[#3498db] mt-0.5 shrink-0"
                    />
                    <span>{phone}</span>
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-start gap-3 text-sm hover:text-[#3498db] transition-colors duration-200"
                  >
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="w-4 h-4 text-[#3498db] mt-0.5 shrink-0"
                    />
                    <span>{email}</span>
                  </a>
                </li>
              )}
              <li className="flex items-start gap-3 text-sm">
                <FontAwesomeIcon
                  icon={faClock}
                  className="w-4 h-4 text-[#3498db] mt-0.5 shrink-0"
                />
                <span>{timing}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-400" dangerouslySetInnerHTML={{ __html: copyrightText }} />
        </div>
      </div>
    </footer>
  );
}
