"use client"
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";

 const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); // 5 seconds delay
  }, []);

  return (
 
    <DefaultLayout>
    {loading ? <Loader /> : <ECommerce />}
    </DefaultLayout>
     
 
  );
}
