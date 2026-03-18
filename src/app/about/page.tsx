import type { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHistory,
  faBuilding,
  faBullseye,
  faEye,
  faShieldAlt,
  faAward,
  faUserGraduate,
  faBriefcase,
  faLaptopCode,
  faMapMarkerAlt,
  faUsers,
  faHandshake,
  faRupeeSign,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import TeachersSection from './TeachersSection';

export const metadata: Metadata = {
  title: 'About Us - OK ACADEMY Kurawli Computer Training Center',
  description:
    'Learn about OK ACADEMY, Kurawli\'s trusted computer training center. Serving students in Mainpuri district since 2008 with quality education.',
  keywords:
    'about OK ACADEMY, computer coaching Kurawli, Mainpuri computer institute, computer training center history',
};

export default function AboutPage() {
  return (
    <>
      {/* About Hero */}
      <section
        className="text-center text-white py-16 px-8"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">About OK ACADEMY</h1>
        <p className="text-lg sm:text-xl">
          Kurawli&apos;s Premier Computer Training Center - Empowering Students Since 2008
        </p>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-[#2c3e50] text-2xl font-bold mb-4">
              <FontAwesomeIcon icon={faHistory} className="mr-2" />
              Our Story
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              OK ACADEMY was founded in 2008 with a simple mission: to bring quality computer
              education to the students of Kurawli and surrounding areas of Mainpuri district.
              What started as a small coaching center has now grown into a trusted institution
              that has trained over 5000+ students.
            </p>
            <p className="text-gray-500 leading-relaxed mb-4">
              We understand the unique challenges faced by students in semi-urban areas who
              aspire to build careers in technology. Our curriculum is designed to bridge the
              gap between theoretical knowledge and practical skills required by the industry.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Over the years, we have continuously updated our courses to keep pace with the
              rapidly evolving tech landscape, ensuring our students are always job-ready.
            </p>
          </div>
          <div className="rounded-[10px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
            <div className="p-12 bg-[#f0f0f0] text-center">
              <FontAwesomeIcon icon={faBuilding} className="text-[#3498db] text-6xl mb-4" />
              <p className="text-gray-500 mt-4">OK ACADEMY Center</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#f8f9fa] py-12 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="bg-white p-8 rounded-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
            <FontAwesomeIcon icon={faBullseye} className="text-[#3498db] text-4xl mb-4" />
            <h3 className="text-[#2c3e50] text-xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-500 leading-relaxed">
              To provide affordable, quality computer education to every student in Kurawli and
              Mainpuri district, enabling them to achieve their career goals through practical
              skills and industry-relevant training.
            </p>
          </div>
          <div className="bg-white p-8 rounded-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
            <FontAwesomeIcon icon={faEye} className="text-[#3498db] text-4xl mb-4" />
            <h3 className="text-[#2c3e50] text-xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-500 leading-relaxed">
              To become the most trusted computer training institution in Uttar Pradesh, known
              for producing skilled professionals who contribute to the digital economy of
              India.
            </p>
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <TeachersSection />

      {/* Trust Builder */}
      <section className="py-12 px-8 bg-[#f8f9fa]">
        <h2 className="text-center text-[#2c3e50] text-2xl font-bold mb-8">
          <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
          Why Trust OK ACADEMY?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[
            {
              icon: faAward,
              title: '15+ Years Experience',
              text: 'Serving Kurawli community since 2008 with quality computer education',
            },
            {
              icon: faUserGraduate,
              title: '5000+ Students Trained',
              text: 'Successfully placed in various companies across Mainpuri and beyond',
            },
            {
              icon: faBriefcase,
              title: '100% Placement Support',
              text: 'Dedicated placement cell for job assistance and career guidance',
            },
            {
              icon: faLaptopCode,
              title: 'Modern Infrastructure',
              text: 'Latest computers, software, and air-conditioned labs for comfortable learning',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white p-8 rounded-[10px] text-center shadow-[0_5px_15px_rgba(0,0,0,0.1)]"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
              >
                <FontAwesomeIcon icon={item.icon} className="text-white text-2xl" />
              </div>
              <h3 className="text-[#2c3e50] font-bold mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Local Relevance */}
      <section className="py-12 px-8 bg-white">
        <h2 className="text-center text-[#2c3e50] text-2xl font-bold mb-8">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
          Serving Kurawli &amp; Mainpuri
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 max-w-7xl mx-auto">
          <div>
            <h3 className="text-[#2c3e50] text-xl font-bold mb-4">
              Your Local Computer Education Partner
            </h3>
            <p className="text-gray-500 leading-relaxed mb-6">
              OK ACADEMY has been the trusted computer training center in Kurawli and
              surrounding areas of Mainpuri district since 2008. We understand the local
              education needs and job market requirements.
            </p>

            <div className="grid gap-4">
              {[
                {
                  icon: faUsers,
                  title: 'Local Community Focus',
                  text: 'Tailored courses for Kurawli students and professionals',
                },
                {
                  icon: faHandshake,
                  title: 'Local Industry Connections',
                  text: 'Strong network with Mainpuri businesses for placements',
                },
                {
                  icon: faRupeeSign,
                  title: 'Affordable Education',
                  text: 'Quality training at reasonable fees for local students',
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="text-[#3498db] text-xl mt-1 w-6 shrink-0"
                  />
                  <div>
                    <h4 className="text-[#2c3e50] font-semibold mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#f8f9fa] p-6 rounded-[10px]">
            <h4 className="text-[#2c3e50] font-bold mb-4">Our Service Areas</h4>
            <ul className="space-y-3">
              {['Kurawli Town', 'Mainpuri City', 'Surrounding Villages', 'Nearby Districts'].map(
                (area) => (
                  <li key={area} className="flex items-center gap-2 text-gray-600">
                    <FontAwesomeIcon icon={faCheck} className="text-[#3498db]" />
                    {area}
                  </li>
                )
              )}
            </ul>
            <p className="mt-4 text-sm italic text-gray-400">
              Easily accessible from all parts of Mainpuri district
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
