import { HeroSectionThemeWrapper } from "../home/hero-section-theme-wrapper/HeroSectionThemeWrapper";
// import { ProductSecOne } from "./product-sec-one/product-sec-one";

import { ProductSecTwo } from "./product-sec-two/product-sec-two";

export function ProductPage() {
  return (
    <HeroSectionThemeWrapper>
      <div className="relative z-10">
        {/* <ProductSecOne /> */}
        <ProductSecTwo />
        {/* <ProductSecThree /> */}
      </div>
    </HeroSectionThemeWrapper>
  );
}
