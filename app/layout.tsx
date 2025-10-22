import "@/app/globals.css";
import "@/shared/lib/chartSetup";
import { Metadata } from "next";
import { ToastProvider } from "@/shared/ui/Toast/ToastProvider";

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
    <html lang="ko">
      <body className="antialiased">
        <ToastProvider>
          <div className="navbar" />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}