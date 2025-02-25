"use client"
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import Encryption from "@/components/Dashboard/Encryption";

 
export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); // 5 seconds delay
  }, []);

  return (
 
    <DefaultLayout  >

        {loading ? <Loader /> : <Encryption />}

        </DefaultLayout>
     
 
  );
}
