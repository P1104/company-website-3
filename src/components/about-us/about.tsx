// File: src/components/about/about.tsx
import { AboutSectionOne } from "./about-us-sec-one/about-us-sec-one";
import { HeroSectionThemeWrapper } from "../home/hero-section-theme-wrapper/HeroSectionThemeWrapper";
import { AboutSectionTwo } from "./about-us-sec-two/about-us-sec-two";
import { AboutSectionThree } from "./about-us-sec-three/about-us-sec-three";
import { AboutSectionFour } from "./about-us-sec-four/about-us-sec-four";

export function AboutPage() {
  return (
    <HeroSectionThemeWrapper>
      <div className="relative z-10">
        <AboutSectionOne />
        <AboutSectionTwo />
        <AboutSectionThree />
        <AboutSectionFour />
      </div>
    </HeroSectionThemeWrapper>
  );
}