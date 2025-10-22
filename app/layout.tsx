import "@/app/globals.css";
import "@/shared/lib/chartSetup";
import { Metadata } from "next";
import { ToastProvider } from "@/shared/ui/Toast/ToastProvider";

// Google Fonts 사용 (가장 안정적)
import { Noto_Sans_KR } from "next/font/google";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TeamWorks",
  description: "공정한 협업, 효율적인 운영",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body 
        className="antialiased" 
        style={{ fontFamily: "var(--font-noto-sans-kr), system-ui, sans-serif" }}
      >
        <ToastProvider>
          <div className="navbar" />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}