import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "TeamWorks",
  description: "Teamworks Web Service by 노랑통닭",
  icons: '/logo.png',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <div className="navbar" /> {/* 여기에 상단 bar 넣기 (link) */}
        {children}
      </body>
    </html>
  );
}
