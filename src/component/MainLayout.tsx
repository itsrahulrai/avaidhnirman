"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Header from "./Header";
import Footer from "./Footer";
import Layout from "@/app/admin/Layout";

const MainLayout = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith("/admin");

    if (isAdminRoute) {
        return (
            <SessionProvider>
                <Layout>{children}</Layout>
            </SessionProvider>
        );
    }

    return (
        <>

            <Header />
            {children}
            <Footer />

        </>
    );
};

export default MainLayout;