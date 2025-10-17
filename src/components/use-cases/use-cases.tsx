import { HeroSectionThemeWrapper } from "../home/hero-section-theme-wrapper/HeroSectionThemeWrapper";
// import { UseCasesSecOne } from "./use-cases-sec-one/use-cases-sec-one";
import { UseCasesSecThree } from "./use-cases-sec-three/use-cases-sec-three";
import { UseCasesSectionTwo } from "./use-cases-sec-two/use-cases-sec-two";

export function UseCasesPage () {
  return (
    <HeroSectionThemeWrapper>
      <div className="relative z-10">
        {/* <UseCasesSecOne /> */}
        <UseCasesSectionTwo />
        <UseCasesSecThree />
      </div>
    </HeroSectionThemeWrapper>
  );
}
