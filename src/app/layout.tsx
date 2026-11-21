import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aayup Technologies | Admin Panel",
  description:
    "Official management dashboard for Aayup Technologies Pvt. Ltd.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-white text-[#0B1220]">
        {children}
      </body>
    </html>
  );
}
