import { Fira_Mono, Outfit, Raleway } from "next/font/google";

// This defines the fira_mono with the latin subset
export const fira_mono = Fira_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// This defines the outfit with the latin subset
export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// This defines the raleway with the latin subset
export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

