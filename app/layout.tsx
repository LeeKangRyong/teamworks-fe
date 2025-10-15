"use client";
import "@/app/globals.css";
import "@/shared/lib/chartSetup";
import { Toast, useToast } from "@/shared/ui/Toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isVisible, message } = useToast();

  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/logo.png" type="image/x-icon" />
        <title>TeamWorks</title>
      </head>
      <body className="antialiased">
        <div className="navbar" />
        {children}
        {isVisible && <Toast message={message} />}
      </body>
    </html>
  );
}