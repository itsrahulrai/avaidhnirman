import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@/component/MainLayout";


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
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
