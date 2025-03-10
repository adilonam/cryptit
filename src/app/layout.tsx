import "@/css/satoshi.css";
import "@/css/style.css";
import React from "react";
import { Toaster } from 'react-hot-toast';
import { GoogleTagManager } from '@next/third-parties/google'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Cryptit Saas for local encryption and decryption",
  description:
    "Cryptit is a saas for local encryption and decryption. It is a simple and easy to use tool for encrypting and decrypting your data.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleTagManager gtmId={process.env.GOOGLE_TAG_MANAGER_ID as string} />
 
      <body>
        <Toaster />
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
