import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Computer Courses - OK ACADEMY Kurawli Training Center',
  description:
    'Complete computer courses in Kurawli, Mainpuri: MS Office, Tally, Web Development, Graphic Design, O-Level, CCC, BCA, MCA, and more. Affordable fees.',
  keywords:
    'computer course Kurawli, Mainpuri computer classes, MS Office training, Tally course, web development course, computer coaching near me',
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
