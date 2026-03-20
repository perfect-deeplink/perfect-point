'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faClock,
  faRupeeSign,
  faUserGraduate,
  faFileExcel,
  faPaintBrush,
  faChartLine,
  faCode,
  faGraduationCap,
  faCogs,
  faCalendarAlt,
  faPhone,
  faFileAlt,
  faIdCard,
  faImage,
  faMapMarkerAlt,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import CourseFinder from '@/components/CourseFinder';

const heroStats = [
  { value: '15+', label: 'Years Experience' },
  { value: '5000+', label: 'Students Trained' },
  { value: '50+', label: 'Courses Available' },
  { value: '100%', label: 'Practical Training' },
];

const admissionSteps = [
  { step: 1, title: 'Free Counseling', desc: 'Visit center or call for free career guidance' },
  { step: 2, title: 'Course Selection', desc: 'Choose course based on your goals' },
  { step: 3, title: 'Documentation', desc: 'Submit required documents and fees' },
  { step: 4, title: 'Start Learning', desc: 'Join batch and begin training' },
];

const requiredDocs = [
  { icon: faImage, text: '2 Passport Size Photos' },
  { icon: faFileAlt, text: '10th/12th Marksheet Copy' },
  { icon: faIdCard, text: 'Aadhar Card Copy' },
  { icon: faMapMarkerAlt, text: 'Address Proof' },
];

const categoryIcons: Record<string, any> = {
  Office: faFileExcel,
  Design: faPaintBrush,
  Financial: faChartLine,
  Web: faCode,
  Educational: faGraduationCap,
  Custom: faCogs,
};

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  price: string;
  features: string[];
  icon: string | null;
  badge: string;
  level: string;
  featured: boolean;
  sortOrder: number;
  active: boolean;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/courses')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.data) {
          setCourses(data.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const categories = Array.from(new Set(courses.map((c) => c.category))).filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#2c3e50] via-[#34495e] to-[#2c3e50] text-white py-20 sm:py-28">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Computer Courses in Kurawli, Mainpuri
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Learn from basics to advanced levels with practical training and job support
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {heroStats.map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#3498db]">{s.value}</h3>
                <p className="text-sm text-gray-300 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Finder */}
      <CourseFinder />

      {/* Course Categories */}
      <main className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {loading ? (
            <div className="text-center py-20 text-gray-400">
              <FontAwesomeIcon icon={faSpinner} spin className="mr-3" />
              Loading courses...
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              No courses found. Please check back later.
            </div>
          ) : (
            categories.map((catStr) => {
              const categoryCourses = courses.filter(c => c.category === catStr);
              const featured = categoryCourses.find(c => c.featured) || categoryCourses[0];
              const others = categoryCourses.filter(c => c.id !== featured.id);

              return (
                <section key={catStr} id={catStr.toLowerCase().replace(/\\s+/g, '-')}>
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-[#3498db] mb-4">
                      <FontAwesomeIcon icon={categoryIcons[catStr.split(' ')[0]] || faCogs} className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#2c3e50]">{catStr}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Featured Card */}
                    {featured && (
                      <div className="relative bg-white rounded-2xl shadow-lg border-2 border-[#3498db]/20 p-6 sm:p-8 flex flex-col">
                        {featured.badge && (
                          <span className="absolute -top-3 left-6 bg-[#3498db] z-10 text-white text-xs font-semibold px-4 py-1 rounded-full">
                            {featured.badge}
                          </span>
                        )}
                        {featured.icon && featured.icon.startsWith('data:image') && (
                          <div className="w-full h-48 mb-4 rounded-xl overflow-hidden -mt-2">
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                             <img src={featured.icon} alt={featured.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <h3 className={`text-xl font-bold text-[#2c3e50] ${featured.icon?.startsWith('data:image') ? 'mt-2' : 'mt-2'} mb-4`}>{featured.title}</h3>
                        <ul className="space-y-2 mb-5">
                          {featured.features.slice(0, 4).map((f, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <FontAwesomeIcon icon={faCheck} className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
                          <span className="inline-flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                            <FontAwesomeIcon icon={faClock} className="w-3 h-3" /> {featured.duration}
                          </span>
                          <span className="inline-flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                            <FontAwesomeIcon icon={faRupeeSign} className="w-3 h-3" /> {featured.price}
                          </span>
                          <span className="inline-flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                            <FontAwesomeIcon icon={faUserGraduate} className="w-3 h-3" /> {featured.level}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-6">{featured.description}</p>
                        <div className="mt-auto flex gap-3">
                          <Link
                            href="/contact"
                            className="flex-1 text-center bg-[#3498db] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#2980b9] transition-colors duration-300"
                          >
                            Enroll Now
                          </Link>
                          <Link
                            href="/contact"
                            className="flex-1 text-center border border-[#3498db] text-[#3498db] text-sm font-medium py-2.5 rounded-lg hover:bg-[#3498db] hover:text-white transition-colors duration-300"
                          >
                            Inquire
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Simple Cards */}
                    {others.map((course) => (
                      <div
                        key={course.id}
                        className="bg-white rounded-2xl shadow-md p-6 flex flex-col hover:shadow-lg transition-shadow duration-300 relative overflow-hidden"
                      >
                        {course.badge && (
                          <span className={`inline-block bg-blue-100 text-[#3498db] text-xs font-semibold px-3 py-1 rounded-full ${course.icon?.startsWith('data:image') ? 'absolute top-4 left-4 z-10' : 'mb-3 self-start'}`}>
                            {course.badge}
                          </span>
                        )}
                        {course.icon && course.icon.startsWith('data:image') && (
                          <div className="-mx-6 -mt-6 mb-4 h-40 bg-gray-100">
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                             <img src={course.icon} alt={course.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <h3 className="text-lg font-semibold text-[#2c3e50] mb-4">{course.title}</h3>
                        <ul className="space-y-2 mb-5">
                          {course.features.slice(0, 3).map((f, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <FontAwesomeIcon icon={faCheck} className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-5">
                          <span className="bg-gray-100 rounded-full px-3 py-1">{course.duration}</span>
                          <span className="bg-gray-100 rounded-full px-3 py-1">{course.price}</span>
                        </div>
                        <Link
                          href="/contact"
                          className="mt-auto text-center border border-gray-300 text-[#2c3e50] text-sm font-medium py-2.5 rounded-lg hover:border-[#3498db] hover:text-[#3498db] transition-colors duration-300"
                        >
                          Inquire
                        </Link>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })
          )}

          {/* Admission Process */}
          <section id="admission">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2c3e50] text-center mb-3">
              <FontAwesomeIcon icon={faUserGraduate} className="w-6 h-6 mr-2 text-[#3498db]" />
              Admission Process
            </h2>
            <p className="text-center text-gray-600 mb-12">Simple steps to start your learning journey</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {admissionSteps.map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#3498db] to-[#2980b9] text-white text-2xl font-bold flex items-center justify-center shadow-lg">
                    {s.step}
                  </div>
                  <h3 className="text-lg font-semibold text-[#2c3e50] mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-[#2c3e50] mb-4">Required Documents:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {requiredDocs.map((doc) => (
                  <li key={doc.text} className="flex items-center gap-3 text-sm text-gray-700">
                    <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-green-500 shrink-0" />
                    {doc.text}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#3498db] to-[#2980b9] py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Still Confused About Which Course to Choose?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Get free personalized career counseling from our experts
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#3498db] font-semibold px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4" />
              Book Free Counseling
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
