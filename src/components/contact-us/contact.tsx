import { HeroSectionThemeWrapper } from "../home/hero-section-theme-wrapper/HeroSectionThemeWrapper";
import { ContactSecFour } from "./contact-us-sec-four/contact-us-sec-four";
import { ContactSecOne } from "./contact-us-sec-one/contact-us-sec-one";

import { ContactSecTwo } from "./contact-us-sec-two/contact-us-sec-two";

export function ConatctPage () {
  return (
    <HeroSectionThemeWrapper>
      <div className="relative z-10">
        <ContactSecOne />
        <ContactSecTwo />
        {/* <ContactSecThree /> */}
        <ContactSecFour />
      </div>
    </HeroSectionThemeWrapper>
  );
}
