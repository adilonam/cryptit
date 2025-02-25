"use client"
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { Metadata } from "next";

 
export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); // 5 seconds delay
  }, []);

  return (
 
    <DefaultLayout  >

        {loading ? <Loader /> : <ECommerce />}

        </DefaultLayout>
     
 
  );
}
