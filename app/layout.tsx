import type { Metadata } from "next";
import "./globals.css";
import "./font.css";  // Add this line

export const metadata: Metadata = {
  title: "Portfolio by Kurnia Putri",
  description: "Portfolio by Kurnia Putri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}