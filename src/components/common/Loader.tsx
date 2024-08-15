import React from "react";
import { LoaderCircle } from "lucide-react";

const Loader = () => {
  return (
    <>
      <LoaderCircle className="rotate-div" size={48} strokeWidth={0.5} />
    </>
  );
};

export default Loader;
