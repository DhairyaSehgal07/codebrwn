import React from "react";
import HomeScreen from "@/screens/HomeScreen";
import Navbar from "@/components/common/Navbar";

const page = () => {
  return (
    <>
      <main className="flex flex-1 flex-grow flex-col">
        <HomeScreen />
      </main>
    </>
  );
};

export default page;
