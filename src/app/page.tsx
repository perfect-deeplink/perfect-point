'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLaptopCode,
  faCertificate,
  faBriefcase,
  faRupeeSign,
  faClock,
  faDesktop,
  faBookOpen,
  faArrowRight,
  faNewspaper,
  faUserPlus,
  faPhone,
  faBlog,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import HeroSlider from '@/components/HeroSlider';
import type { SlideData } from '@/components/HeroSlider';
import TopStudents from '@/components/TopStudents';
import TestimonialsPreview from '@/components/TestimonialsPreview';

const iconMap: Record<string, IconDefinition> = {
  faLaptopCode,
  faCertificate,
  faBriefcase,
  faRupeeSign,
  faClock,
  faDesktop,
};

interface HomepageData {
  heroSlides: SlideData[];
  featuresHeading: string;
  featuresSubheading: string;
  features: { title: string; description: string; icon: string }[];
  ctaHeading: string;
  ctaDescription: string;
  ctaPhone: string;
  sectionsEnabled: {
    hero: boolean;
    topStudents: boolean;
    features: boolean;
    courses: boolean;
    testimonials: boolean;
    blog: boolean;
    cta: boolean;
  };
}

interface CourseData {
  _id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
}

interface BlogData {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
}

const defaultSections = { hero: true, topStudents: true, features: true, courses: true, testimonials: true, blog: true, cta: true };

export default function Home() {
  const [homepage, setHomepage] = useState<HomepageData | null>(null);
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogData[]>([]);

  useEffect(() => {
    fetch('/api/homepage').then(r => r.json()).then(d => { if (d.success && d.data) setHomepage(d.data); }).catch(() => {});
    fetch('/api/courses').then(r => r.json()).then(d => { if (d.success && d.data) setCourses(d.data.slice(0, 6)); }).catch(() => {});
    fetch('/api/blog').then(r => r.json()).then(d => { if (d.success && d.data) setBlogPosts(d.data.slice(0, 3)); }).catch(() => {});
  }, []);

  const sections = homepage?.sectionsEnabled || defaultSections;
  const featuresHeading = homepage?.featuresHeading || 'Why Choose OK ACADEMY?';
  const featuresSubheading = homepage?.featuresSubheading || 'What makes us the best choice for your computer education';
  const features = homepage?.features && homepage.features.length > 0 ? homepage.features : [];
  const ctaHeading = homepage?.ctaHeading || 'Ready to Start Your Career in IT?';
  const ctaDescription = homepage?.ctaDescription || 'Join OK ACADEMY today and transform your future with quality computer education';
  const ctaPhone = homepage?.ctaPhone || '+919876543210';

  return (
    <>
      {sections.hero && <HeroSlider heroSlides={homepage?.heroSlides} />}
      {sections.topStudents && <TopStudents />}

      {sections.features && features.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary text-center mb-2">
              {featuresHeading}
            </h2>
            <p className="text-center text-gray-500 mb-10">
              {featuresSubheading}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-1 transition text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <FontAwesomeIcon
                      icon={iconMap[feature.icon] || faLaptopCode}
                      className="w-7 h-7 text-accent"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.courses && courses.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary text-center mb-2">
              <FontAwesomeIcon
                icon={faBookOpen}
                className="w-7 h-7 text-accent mr-2"
              />
              Popular Courses
            </h2>
            <p className="text-center text-gray-500 mb-10">
              Start your journey with our most enrolled programs
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-1 transition border border-gray-100"
                >
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <FontAwesomeIcon
                      icon={faLaptopCode}
                      className="w-6 h-6 text-accent"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary mb-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{course.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon
                        icon={faClock}
                        className="w-3.5 h-3.5 text-gray-400"
                      />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-accent">
                      {course.price}
                    </span>
                  </div>
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-purple transition"
                  >
                    Learn More
                    <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition bg-accent text-white hover:bg-purple"
              >
                View All Courses
              </Link>
            </div>
          </div>
        </section>
      )}

      {sections.testimonials && <TestimonialsPreview />}

      {sections.blog && blogPosts.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary text-center mb-2">
              <FontAwesomeIcon
                icon={faBlog}
                className="w-7 h-7 text-accent mr-2"
              />
              Latest from Our Blog
            </h2>
            <p className="text-center text-gray-500 mb-10">
              Tips, insights, and career guidance for students
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-1 transition border border-gray-100"
                >
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <FontAwesomeIcon
                      icon={faNewspaper}
                      className="w-6 h-6 text-accent"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    {post.excerpt || post.content?.substring(0, 150)}
                  </p>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-purple transition"
                  >
                    Read More
                    <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition bg-accent text-white hover:bg-purple"
              >
                <FontAwesomeIcon icon={faNewspaper} className="w-4 h-4" />
                Visit Our Blog
              </Link>
            </div>
          </div>
        </section>
      )}

      {sections.cta && (
        <section className="py-16 px-4 bg-gradient-to-br from-accent to-purple">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {ctaHeading}
            </h2>
            <p className="text-lg mb-8 opacity-90">
              {ctaDescription}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition bg-white text-secondary hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faUserPlus} className="w-4 h-4" />
                Enroll Now
              </Link>
              <a
                href={`tel:${ctaPhone}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition border-2 border-white text-white hover:bg-white/20"
              >
                <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                Call: {ctaPhone}
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
