import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import FontAwesomeConfig from "@/components/FontAwesomeConfig";
import Header from "@/components/Header";
import FooterWrapper from "@/components/FooterWrapper";
import FloatingButtons from "@/components/FloatingButtons";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "OK ACADEMY - Kurawli Computer Training & Coaching Center",
  description:
    "Kurawli Computer Training & Coaching Center – Learn Computer Skills from Basics to Advanced. Best computer institute in Mainpuri district.",
  keywords:
    "computer course Kurawli, Mainpuri computer training, OK ACADEMY, MS Office, Tally, Web Development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body className={poppins.className}>
        <FontAwesomeConfig />
        <Header />
        {children}
        <FooterWrapper />
        <FloatingButtons />
      </body>
    </html>
  );
}
