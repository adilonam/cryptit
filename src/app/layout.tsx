import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React from "react";
import { Toaster } from 'react-hot-toast';
import { GoogleTagManager } from '@next/third-parties/google'

type RootLayoutProps = {
  children: React.ReactNode;
};




const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {


  return (
    <html lang="en" suppressHydrationWarning>
  <GoogleTagManager gtmId={process.env.GOOGLE_TAG_MANAGER_ID as string} />

  
      <body >
      
        <Toaster />
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {children}
          </div>
    
      </body>
    </html>
  );
};

export default RootLayout;
