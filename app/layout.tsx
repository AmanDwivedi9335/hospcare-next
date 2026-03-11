import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HospCare SaaS starter",
  description:
    "Next.js + Prisma boilerplate for selling Smart Hospital as a multi-tenant subscription",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  );
}
