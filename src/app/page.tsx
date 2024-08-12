import React from "react";
import HomeScreen from "@/screens/HomeScreen";
import Navbar from "@/components/common/Navbar";
import TopBanner from "@/components/common/TopBanner";

const page = () => {
  return (
    <>
      <TopBanner />
      <Navbar />
      <main className="flex flex-1 flex-grow flex-col">
        <HomeScreen />
      </main>
    </>
  );
};

export default page;
