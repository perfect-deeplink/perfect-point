'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUserShield } from '@fortawesome/free-solid-svg-icons';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/courses', label: 'Courses' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) return null;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight">
            <span className="text-xl sm:text-2xl font-bold text-[#2c3e50] font-[family-name:var(--font-poppins)]">
              OK ACADEMY
            </span>
            <span className="text-[10px] sm:text-xs text-[#3498db] tracking-wider">
              Computer Training Center
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-[#3498db] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-[#3498db] after:transition-all after:duration-300 ${
                    isActive
                      ? 'text-[#3498db] after:w-full'
                      : 'text-[#2c3e50] after:w-0 hover:after:w-full'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/admin"
              className="ml-2 px-3 py-2 text-sm text-[#2c3e50]/40 hover:text-[#2c3e50]/70 transition-colors duration-200"
              title="Admin"
            >
              <FontAwesomeIcon icon={faUserShield} className="w-4 h-4" />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#2c3e50] hover:text-[#3498db] transition-colors"
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon
              icon={mobileMenuOpen ? faTimes : faBars}
              className="w-5 h-5"
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <nav className="bg-white border-t border-gray-100 px-4 py-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'text-[#3498db] bg-blue-50'
                    : 'text-[#2c3e50] hover:text-[#3498db] hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 text-sm text-[#2c3e50]/40 hover:text-[#2c3e50]/70 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faUserShield} className="w-4 h-4 mr-2" />
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
