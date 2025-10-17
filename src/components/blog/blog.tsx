// File: src/components/about/about.tsx
import { HeroSectionThemeWrapper } from "../home/hero-section-theme-wrapper/HeroSectionThemeWrapper";
import { BlogSectionOne } from "./blog-sec-one/blog-sec-one";
import { BlogSectionThree } from "./blog-sec-three/blog-sec-three";
import { BlogSectionTwo } from "./blog-sec-two/blog-sec-two";


export function BlogPage() {
  return (
    <HeroSectionThemeWrapper>
      <div className="relative z-10">
       <BlogSectionOne />
       <BlogSectionTwo />
       <BlogSectionThree />
      </div>
    </HeroSectionThemeWrapper>
  );
}