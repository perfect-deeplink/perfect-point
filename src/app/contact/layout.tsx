import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - OK ACADEMY Kurawli Computer Training Center',
  description: 'Contact OK ACADEMY in Kurawli, Mainpuri for computer courses. Call, WhatsApp, email, or visit our center for free counseling.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
