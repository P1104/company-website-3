// File: src/components/home/home.tsx
import { HeroSectionOne } from "./hero-section-one/hero-section-one";
import { HeroSectionThree } from "./hero-section-three/hero-section-three";
import { HeroSectionTwo } from "./hero-section-two/hero-section-two";
import { HeroSectionThemeWrapper } from "./hero-section-theme-wrapper/HeroSectionThemeWrapper";
import { HeroSectionFour } from "./hero-section-four/hero-section-four";
import { Marketing } from "../marketing";

export function HomePage() {
  return (
    <HeroSectionThemeWrapper>
      <div className="relative z-10">
        <HeroSectionOne />
        <HeroSectionTwo />
        <HeroSectionFour />
        <br />
        <Marketing />
        <HeroSectionThree />
      </div>
    </HeroSectionThemeWrapper>
  );
}