import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@/component/MainLayout";
import { Toaster } from 'react-hot-toast';
import SessionWrapper from "@/component/SessionWrapper";

export const metadata: Metadata = {
  title: "Avaidh Nirma Virodhi Morcha",
  description: "Join Us",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <Toaster position="top-center" />
          <MainLayout>{children}</MainLayout>
        </SessionWrapper>
      </body>
    </html>
  );
}
