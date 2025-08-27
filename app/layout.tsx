"use client";
import "@/app/globals.css";
import "@/shared/lib/chartSetup";
import { useToast } from "@/shared/hooks";
import { Toast } from "@/shared/ui/common";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isVisible, message } = useToast();

  return (
    <html lang="ko">
      <body className="antialiased">
        <div className="navbar" />
        {children}
        {isVisible && <Toast message={message} />}
      </body>
    </html>
  );
}