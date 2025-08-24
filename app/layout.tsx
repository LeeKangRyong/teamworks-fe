import type { Metadata } from "next";
import "@/app/globals.css";
import "@/shared/lib/chartSetup";

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
        <div className="horizontal-scroll-container">
          <div className="navbar" /> {/* 여기에 LayoutHeader 넣을 지 고민 */}
          {children}
        </div>
      </body>
    </html>
  );
}