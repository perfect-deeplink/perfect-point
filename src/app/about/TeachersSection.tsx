'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faUser, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface Teacher {
  _id: string;
  name: string;
  designation: string;
  experience: string;
  photo?: string;
}

export default function TeachersSection() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeachers() {
      try {
        const res = await fetch('/api/teachers');
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setTeachers(data.data);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    loadTeachers();
  }, []);

  if (!loading && teachers.length === 0) return null;

  return (
    <section className="py-12 px-8 bg-white">
      <h2 className="text-center text-[#2c3e50] text-2xl font-bold mb-2">
        <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" />
        Our Expert Faculty
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Learn from experienced and certified trainers
      </p>

      {loading ? (
        <div className="text-center text-gray-500">
          <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
          Loading faculty information...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {teachers.map((teacher) => (
            <div
              key={teacher._id}
              className="bg-[#f8f9fa] p-6 rounded-[10px] text-center transition-transform duration-300 hover:-translate-y-1"
            >
              {teacher.photo ? (
                <Image
                  src={teacher.photo}
                  alt={teacher.name}
                  width={120}
                  height={120}
                  className="w-[120px] h-[120px] rounded-full object-cover border-4 border-[#3498db] mx-auto mb-4"
                />
              ) : (
                <div className="w-[120px] h-[120px] bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="text-gray-400 text-4xl" />
                </div>
              )}
              <h4 className="text-[#2c3e50] font-semibold mb-1">{teacher.name}</h4>
              <p className="text-[#3498db] font-medium">{teacher.designation}</p>
              <p className="text-gray-500 text-sm">{teacher.experience} Experience</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
