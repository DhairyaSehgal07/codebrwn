import React from "react";
import { fira_mono } from "@/app/fonts";

const HomeScreen = () => {
  return (
    <div>
      <p
        className={`${fira_mono.className}  font-normal tracking-spaced-06 leading-14`}
      >
        This is a test using Fira Mono (500 weight) with custom styles.
      </p>
    </div>
  );
};

export default HomeScreen;
