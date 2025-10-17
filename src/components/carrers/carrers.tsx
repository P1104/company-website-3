

import { HeroSectionThemeWrapper } from "../home/hero-section-theme-wrapper/HeroSectionThemeWrapper";
import { CarrerSecOne } from "./carrers-sec-one/carrers-sec-one";
import { CarrerSecTwo } from "./carrers-sec-two/carrers-sec-two";

export function CarrersPage () {
  return (
    <HeroSectionThemeWrapper>
      <div className="relative z-10">
        <CarrerSecOne />
        <CarrerSecTwo />
      </div>
    </HeroSectionThemeWrapper>
  );
}
