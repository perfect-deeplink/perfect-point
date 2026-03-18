import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel - OK ACADEMY",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
