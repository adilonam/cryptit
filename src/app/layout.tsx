"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { Session } from "next-auth";
import NextAuthProvider from "@/components/providers/NextAuthProvider";
import { Toaster } from 'react-hot-toast';

type RootLayoutProps = {
  children: React.ReactNode;
  session: Session | null;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children, session }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <NextAuthProvider session={session}>
        <Toaster />
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {loading ? <Loader /> : children}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
