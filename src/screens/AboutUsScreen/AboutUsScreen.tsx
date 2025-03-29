/* eslint-disable react/no-unescaped-entities */
import HeroBackground from "@/components/common/HeroBackground";
import React from "react";
import { outfit } from "@/app/fonts";

const imageUrl =
  "https://utfs.io/f/d6d02c86-18f7-4871-a439-e47d719582af-m6il6n.jpg";

const AboutUsScreen = () => {
  return (
    <>
      <HeroBackground imageUrl={imageUrl} heading="ABOUT-US" />
      <section className="mx-6 mt-16 lg:hidden">
        <p
          className={`${outfit.className} text-justify text-xl leading-[26px] tracking-spaced-06`}
        >
          CodeBrwn is not just a clothing line. It's a community. It's Indian
          luxury. An initiative towards pushing the cultural perspective founded
          by Abhay Sehgal and Aayush Khandelwal. It is an interpretation that
          creates a beautiful hybrid on cultural boundaries. It's about pushing
          your perspective. It's a factor of nostalgia that blends in with
          today’s culture. We have always seen different countries embracing
          their roots and portraying what they feel about streetwear, be it
          Korean, Japanese, or American. It's time we set ours.
        </p>

        <p
          className={`${outfit.className} mt-4 text-justify text-xl leading-[26px] tracking-spaced-06`}
        >
          At Codebrwn, each piece tells you a story. A perspective. Your
          perspective. Your story. It's how you perceive today’s psychology with
          the past. Aayush and Abhay first met in school and now find their
          shared zeal for fashion turning into building Codebrwn. Abhay, as a
          brown artist feels that he is gifted with history and roots. But,
          embracing our ethnicity via streetwear is something he is very keen
          on. The best part is that this brand will keep evolving since it's
          correlated from an artist’s perspective. Its east meeting west and
          it's going to be an exciting journey we want you to be a part of.
        </p>
      </section>

      {/*DESKTOP VIEW*/}
      <section className="hidden lg:block">
        <div className="mx-16 mt-24 flex items-center justify-center gap-16">
          <div className="h-[388px] w-[780px]">
            <p
              className={`${outfit.className} text-justify text-xl leading-[26px] tracking-spaced-06`}
            >
              CodeBrwn is not just a clothing line. It's a community. It's
              Indian luxury. An initiative towards pushing the cultural
              perspective founded by Abhay Sehgal and Aayush Khandelwal. It is
              an interpretation that creates a beautiful hybrid on cultural
              boundaries. It's about pushing your perspective. It's a factor of
              nostalgia that blends in with today’s culture. We have always seen
              different countries embracing their roots and portraying what they
              feel about streetwear, be it Korean, Japanese, or American. It's
              time we set ours.
            </p>

            <p
              className={`${outfit.className} mt-8 text-justify text-xl leading-[26px] tracking-spaced-06`}
            >
              At Codebrwn, each piece tells you a story. A perspective. Your
              perspective. Your story. It's how you perceive today’s psychology
              with the past. Aayush and Abhay first met in school and now find
              their shared zeal for fashion turning into building Codebrwn.
              Abhay, as a brown artist feels that he is gifted with history and
              roots. But, embracing our ethnicity via streetwear is something he
              is very keen on. The best part is that this brand will keep
              evolving since it's correlated from an artist’s perspective. Its
              east meeting west and it's going to be an exciting journey we want
              you to be a part of.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUsScreen;
