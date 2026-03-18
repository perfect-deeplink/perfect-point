import { Metadata } from 'next';
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
} from '@fortawesome/free-solid-svg-icons';
import CourseFinder from '@/components/CourseFinder';

export const metadata: Metadata = {
  title: 'Computer Courses - OK ACADEMY Kurawli Training Center',
  description:
    'Complete computer courses in Kurawli, Mainpuri: MS Office, Tally, Web Development, Graphic Design, O-Level, CCC, BCA, MCA, and more. Affordable fees.',
  keywords:
    'computer course Kurawli, Mainpuri computer classes, MS Office training, Tally course, web development course, computer coaching near me',
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const heroStats = [
  { value: '15+', label: 'Years Experience' },
  { value: '5000+', label: 'Students Trained' },
  { value: '50+', label: 'Courses Available' },
  { value: '100%', label: 'Practical Training' },
];

interface FeaturedCourse {
  badge: string;
  title: string;
  features: string[];
  duration: string;
  price: string;
  level: string;
  description: string;
}

interface SimpleCourse {
  title: string;
  features: string[];
  duration: string;
  price: string;
}

interface CourseCategory {
  id: string;
  icon: typeof faFileExcel;
  heading: string;
  tagline: string;
  featured: FeaturedCourse;
  courses: SimpleCourse[];
}

const categories: CourseCategory[] = [
  {
    id: 'office',
    icon: faFileExcel,
    heading: 'Office Solutions',
    tagline: 'Master office automation tools for professional work',
    featured: {
      badge: 'Most Popular',
      title: 'MS Office Complete Package',
      features: ['Word, Excel, PowerPoint', 'Advanced Excel Formulas', 'Mail Merge & Automation', 'Data Analysis & Charts'],
      duration: '3 Months',
      price: '₹4,500',
      level: 'Beginner',
      description: 'Complete MS Office training for office jobs, data entry, and administrative work.',
    },
    courses: [
      {
        title: 'Libre Office Professional',
        features: ['Writer, Calc, Impress', 'Open Source Alternative', 'File Compatibility'],
        duration: '2 Months',
        price: '₹3,000',
      },
      {
        title: 'Data Management System',
        features: ['Database Concepts', 'MS Access Training', 'Data Entry Operations'],
        duration: '2.5 Months',
        price: '₹3,500',
      },
    ],
  },
  {
    id: 'design',
    icon: faPaintBrush,
    heading: 'Design Services',
    tagline: 'Creative design courses for digital and print media',
    featured: {
      badge: 'High Demand',
      title: 'Graphic Design Master',
      features: ['Photoshop & Krita', 'Corel Draw & Illustrator', 'Logo & Banner Design', 'Print Media Design'],
      duration: '4 Months',
      price: '₹12,000',
      level: 'Intermediate',
      description: 'Complete graphic design training for advertising agencies, printing presses, and freelance work.',
    },
    courses: [
      {
        title: 'UI/UX Design Basics',
        features: ['Figma & Adobe XD', 'Mobile App Design', 'Wireframing'],
        duration: '3 Months',
        price: '₹8,000',
      },
    ],
  },
  {
    id: 'financial',
    icon: faChartLine,
    heading: 'Financial Services',
    tagline: 'Accounting and taxation courses for commerce students',
    featured: {
      badge: 'Job Guarantee',
      title: 'Tally Prime with GST',
      features: ['Tally Prime Complete', 'GST Filing & Returns', 'Income Tax E-filing', 'Payroll & Inventory'],
      duration: '3 Months',
      price: '₹6,500',
      level: 'Beginner',
      description: 'Complete accounting software training with 100% placement assistance for CA firms and businesses.',
    },
    courses: [
      {
        title: 'Tax Consultancy',
        features: ['Income Tax Laws', 'Tax Planning', 'E-filing Procedures'],
        duration: '2 Months',
        price: '₹4,000',
      },
    ],
  },
  {
    id: 'web',
    icon: faCode,
    heading: 'Web Development',
    tagline: 'Full stack web development for IT careers',
    featured: {
      badge: 'Premium Course',
      title: 'Full Stack Web Development',
      features: ['HTML5, CSS3, JavaScript', 'PHP & MySQL', 'React.js Basics', 'WordPress Development'],
      duration: '6 Months',
      price: '₹18,000',
      level: 'Advanced',
      description: 'Complete web development course with live projects and portfolio building.',
    },
    courses: [
      {
        title: 'Frontend Development',
        features: ['HTML, CSS, JavaScript', 'Bootstrap & Tailwind', 'Responsive Design'],
        duration: '3 Months',
        price: '₹10,000',
      },
      {
        title: 'E-commerce Solutions',
        features: ['WooCommerce', 'Shopify Basics', 'Payment Gateway'],
        duration: '3 Months',
        price: '₹8,000',
      },
    ],
  },
  {
    id: 'education',
    icon: faGraduationCap,
    heading: 'Educational Services',
    tagline: 'Degree and certification courses for academic growth',
    featured: {
      badge: 'Govt. Recognized',
      title: 'O-Level (NIELIT)',
      features: ['IT Tools & Basics', 'Internet & Web Design', 'Programming & Problem Solving', 'Govt. Exam Preparation'],
      duration: '6 Months',
      price: '₹15,000',
      level: 'Intermediate',
      description: 'NIELIT O-Level course for government jobs and higher education in computer science.',
    },
    courses: [
      {
        title: 'BCA/MCA Coaching',
        features: ['Semester-wise Coaching', 'Practical Lab Sessions', 'Project Guidance'],
        duration: 'Yearly',
        price: 'Contact for Fees',
      },
      {
        title: 'B.Tech/M.Tech Support',
        features: ['Engineering Subjects', 'Lab Practicals', 'Mini Projects'],
        duration: 'Semester-wise',
        price: 'Contact for Fees',
      },
    ],
  },
  {
    id: 'custom',
    icon: faCogs,
    heading: 'Custom Solutions',
    tagline: 'Specialized courses for specific career needs',
    featured: {
      badge: 'Short Term',
      title: 'CCC (Course on Computer Concepts)',
      features: ['Computer Fundamentals', 'Internet Basics', 'MS Office Basics', 'Govt. Exam Pattern'],
      duration: '2 Months',
      price: '₹2,500',
      level: 'Beginner',
      description: 'Essential for government jobs in UP. Includes exam registration guidance.',
    },
    courses: [
      {
        title: 'DCA (Diploma in Computer Application)',
        features: ['Computer Basics to Advanced', 'Typing & Documentation'],
        duration: '6 Months',
        price: '₹8,000',
      },
      {
        title: 'D.E.A. (Diploma in Electronics & Accounts)',
        features: ['Basic Electronics', 'Accounting Fundamentals'],
        duration: '6 Months',
        price: 'Contact for Fees',
      },
      {
        title: 'ADCA (Advanced Diploma)',
        features: ['DCA + Tally + Internet', 'Complete Package'],
        duration: '6 Months',
        price: '₹12,000',
      },
      {
        title: 'DOAP (Diploma in Office Automation)',
        features: ['Office Automation Tools', 'Documentation Skills'],
        duration: '3 Months',
        price: 'Contact for Fees',
      },
      {
        title: 'DIOM (Diploma in Office Management)',
        features: ['Office Management', 'Administrative Skills'],
        duration: '6 Months',
        price: 'Contact for Fees',
      },
      {
        title: 'DCIA (Diploma in Computer & IT Application)',
        features: ['IT Applications', 'Computer Fundamentals'],
        duration: '6 Months',
        price: 'Contact for Fees',
      },
      {
        title: 'PGDCA',
        features: ['Advanced Programming', 'DBMS & Networking'],
        duration: '1 Year',
        price: '₹20,000',
      },
      {
        title: 'Master AI & BI',
        features: ['Artificial Intelligence', 'Business Intelligence', 'Python & Data Science'],
        duration: '6 Months',
        price: '₹15,000',
      },
    ],
  },
];

const comparisonData = [
  { course: 'MS Office', duration: '3 Months', fees: '₹4,500', jobs: 'Data Entry, Office Jobs', bestFor: 'Beginners, 12th Pass' },
  { course: 'Tally with GST', duration: '3 Months', fees: '₹6,500', jobs: 'Accountant, GST Consultant', bestFor: 'Commerce Students' },
  { course: 'Web Development', duration: '6 Months', fees: '₹18,000', jobs: 'Web Developer, Freelancer', bestFor: 'Engineering Students' },
  { course: 'CCC', duration: '2 Months', fees: '₹2,500', jobs: 'Government Jobs', bestFor: 'Job Seekers' },
  { course: 'Graphic Design', duration: '4 Months', fees: '₹12,000', jobs: 'Designer, Printing Press', bestFor: 'Creative Students' },
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

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CoursesPage() {
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
          {categories.map((cat) => (
            <section key={cat.id} id={cat.id}>
              {/* Category Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-[#3498db] mb-4">
                  <FontAwesomeIcon icon={cat.icon} className="w-6 h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#2c3e50]">{cat.heading}</h2>
                <p className="text-gray-600 mt-2">{cat.tagline}</p>
              </div>

              {/* Courses Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Featured Card */}
                <div className="relative bg-white rounded-2xl shadow-lg border-2 border-[#3498db]/20 p-6 sm:p-8 flex flex-col">
                  <span className="absolute -top-3 left-6 bg-[#3498db] text-white text-xs font-semibold px-4 py-1 rounded-full">
                    {cat.featured.badge}
                  </span>
                  <h3 className="text-xl font-bold text-[#2c3e50] mt-2 mb-4">{cat.featured.title}</h3>
                  <ul className="space-y-2 mb-5">
                    {cat.featured.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                        <FontAwesomeIcon icon={faCheck} className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
                    <span className="inline-flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                      <FontAwesomeIcon icon={faClock} className="w-3 h-3" /> {cat.featured.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                      <FontAwesomeIcon icon={faRupeeSign} className="w-3 h-3" /> {cat.featured.price}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                      <FontAwesomeIcon icon={faUserGraduate} className="w-3 h-3" /> {cat.featured.level}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">{cat.featured.description}</p>
                  <div className="mt-auto flex gap-3">
                    <Link
                      href="/contact"
                      className="flex-1 text-center bg-[#3498db] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#2980b9] transition-colors duration-300"
                    >
                      Enroll Now
                    </Link>
                    <Link
                      href={`#${cat.id}`}
                      className="flex-1 text-center border border-[#3498db] text-[#3498db] text-sm font-medium py-2.5 rounded-lg hover:bg-[#3498db] hover:text-white transition-colors duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Simple Cards */}
                {cat.courses.map((course) => (
                  <div
                    key={course.title}
                    className="bg-white rounded-2xl shadow-md p-6 flex flex-col hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-lg font-semibold text-[#2c3e50] mb-4">{course.title}</h3>
                    <ul className="space-y-2 mb-5">
                      {course.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
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
          ))}

          {/* Comparison Table */}
          <section className="pt-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2c3e50] text-center mb-10">
              Course Comparison
            </h2>
            <div className="overflow-x-auto rounded-2xl shadow-lg">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#2c3e50] text-white">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Course</th>
                    <th className="px-6 py-4 font-semibold">Duration</th>
                    <th className="px-6 py-4 font-semibold">Fees</th>
                    <th className="px-6 py-4 font-semibold">Job Opportunities</th>
                    <th className="px-6 py-4 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {comparisonData.map((row, i) => (
                    <tr key={row.course} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                      <td className="px-6 py-4 font-medium text-[#2c3e50] whitespace-nowrap">{row.course}</td>
                      <td className="px-6 py-4 text-gray-600">{row.duration}</td>
                      <td className="px-6 py-4 text-[#3498db] font-semibold">{row.fees}</td>
                      <td className="px-6 py-4 text-gray-600">{row.jobs}</td>
                      <td className="px-6 py-4 text-gray-600">{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

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
            <a
              href="tel:+919876543210"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white hover:text-[#3498db] transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
              Call for Inquiry
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
