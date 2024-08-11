"use client";
import { usePathname } from "next/navigation";
import HomeScreenNavbar from "../HomeScreenNavbar";
import OtherScreenNavbar from "../OtherScreenNavbar";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <>
      {pathname === "/" ? (
        <>
          <HomeScreenNavbar />
        </>
      ) : (
        <>
          <OtherScreenNavbar />
        </>
      )}
    </>
  );
};

export default Navbar;
