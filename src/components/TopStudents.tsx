'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faUserGraduate } from '@fortawesome/free-solid-svg-icons';

interface Student {
  id: number;
  name: string;
  achievement: string;
  photo?: string;
}

export default function TopStudents() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetch('/api/students')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          setStudents(data.data);
        }
      })
      .catch(() => {});
  }, []);

  if (students.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-secondary text-center mb-2">
          <FontAwesomeIcon
            icon={faTrophy}
            className="w-8 h-8 text-warning mr-2"
          />
          Our Top Achievers
        </h2>
        <p className="text-center text-gray-500 mb-10">
          Students who made us proud
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:-translate-y-1 transition"
            >
              {student.photo ? (
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gradient-to-br from-accent to-purple flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faUserGraduate}
                    className="w-8 h-8 text-white"
                  />
                </div>
              )}
              <h4 className="font-semibold text-secondary text-sm">
                {student.name}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {student.achievement}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
