import React from "react";
import { LoaderCircle } from "lucide-react";

const Loader = () => {
  return (
    <div className="mb-32 flex h-screen items-center justify-center">
      <LoaderCircle
        className="h-32 w-32 animate-spin"
        size={48}
        strokeWidth={0.5}
      />
    </div>
  );
};

export default Loader;
