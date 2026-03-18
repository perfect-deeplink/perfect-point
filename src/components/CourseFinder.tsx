'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faStore,
  faUserGraduate,
  faLandmark,
  faLaptopCode,
  faLightbulb,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

type Goal = 'job' | 'business' | 'college' | 'government' | 'freelance';

interface CourseRec {
  name: string;
  reason: string;
  link: string;
}

const courseRecommendations: Record<Goal, { title: string; courses: CourseRec[] }> = {
  job: {
    title: 'Best Courses for Getting a Job',
    courses: [
      { name: 'MS Office Complete', reason: 'Essential for all office jobs', link: '#office' },
      { name: 'Tally with GST', reason: 'High demand in accounting sector', link: '#financial' },
      { name: 'Web Development', reason: 'Growing IT sector opportunities', link: '#web' },
      { name: 'CCC Certification', reason: 'Required for government jobs', link: '#custom' },
    ],
  },
  business: {
    title: 'Best Courses for Business Owners',
    courses: [
      { name: 'Tally Prime with GST', reason: 'Manage your accounts & taxes', link: '#financial' },
      { name: 'MS Office', reason: 'Documentation & presentations', link: '#office' },
      { name: 'Graphic Design', reason: 'Create marketing materials', link: '#design' },
      { name: 'E-commerce Solutions', reason: 'Sell online', link: '#web' },
    ],
  },
  college: {
    title: 'Best Courses for College Students',
    courses: [
      { name: 'Web Development', reason: 'Build your portfolio', link: '#web' },
      { name: 'Graphic Design', reason: 'Creative freelancing', link: '#design' },
      { name: 'O-Level', reason: 'Government recognized diploma', link: '#education' },
      { name: 'Master AI & BI', reason: 'Future-proof skills', link: '#custom' },
    ],
  },
  government: {
    title: 'Best Courses for Government Jobs',
    courses: [
      { name: 'CCC Certification', reason: 'Mandatory for most govt jobs', link: '#custom' },
      { name: 'O-Level', reason: 'Higher level certification', link: '#education' },
      { name: 'MS Office', reason: 'Computer proficiency', link: '#office' },
      { name: 'Typing Course', reason: 'Required for clerical posts', link: '#custom' },
    ],
  },
  freelance: {
    title: 'Best Courses for Freelancing',
    courses: [
      { name: 'Web Development', reason: 'High earning potential online', link: '#web' },
      { name: 'Graphic Design', reason: 'Logo, banner, social media work', link: '#design' },
      { name: 'UI/UX Design', reason: 'App & web design projects', link: '#design' },
      { name: 'Video Editing', reason: 'YouTube & social media content', link: '#design' },
    ],
  },
};

const goalButtons: { key: Goal; label: string; icon: typeof faBriefcase }[] = [
  { key: 'job', label: 'I want a Job', icon: faBriefcase },
  { key: 'business', label: 'For My Business', icon: faStore },
  { key: 'college', label: 'College Students', icon: faUserGraduate },
  { key: 'government', label: 'Government Jobs', icon: faLandmark },
  { key: 'freelance', label: 'Freelancing', icon: faLaptopCode },
];

export default function CourseFinder() {
  const [activeGoal, setActiveGoal] = useState<Goal | null>(null);

  const recommendation = activeGoal ? courseRecommendations[activeGoal] : null;

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2c3e50] mb-3">
            <FontAwesomeIcon icon={faSearch} className="w-6 h-6 mr-2 text-[#3498db]" />
            Quick Course Finder
          </h2>
          <p className="text-gray-600">Find the perfect course based on your goals</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
          {goalButtons.map((btn) => (
            <button
              key={btn.key}
              onClick={() => setActiveGoal(btn.key)}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 shadow-sm hover:shadow-md ${
                activeGoal === btn.key
                  ? 'bg-[#3498db] text-white shadow-lg scale-105'
                  : 'bg-white text-[#2c3e50] hover:bg-[#3498db] hover:text-white'
              }`}
            >
              <FontAwesomeIcon icon={btn.icon} className="w-4 h-4" />
              {btn.label}
            </button>
          ))}
        </div>

        {recommendation && (
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 animate-fadeIn">
            <h3 className="text-xl sm:text-2xl font-bold text-[#2c3e50] mb-6 flex items-center gap-2">
              <FontAwesomeIcon icon={faLightbulb} className="w-5 h-5 text-yellow-500" />
              {recommendation.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendation.courses.map((course) => (
                <div
                  key={course.name}
                  className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-5 border border-blue-100 hover:shadow-md transition-shadow duration-300"
                >
                  <h4 className="font-semibold text-[#2c3e50] mb-2">{course.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{course.reason}</p>
                  <Link
                    href={course.link}
                    className="inline-block text-sm font-medium text-[#3498db] border border-[#3498db] rounded-full px-4 py-1.5 hover:bg-[#3498db] hover:text-white transition-colors duration-300"
                  >
                    View Course
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
