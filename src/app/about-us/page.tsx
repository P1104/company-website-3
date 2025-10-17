import { AboutPage } from "@/components/about-us/about";
import  {ExploreMoreSection}  from "@/components/ExploreMoreSection";
import { FooterDemo } from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";



export default function About() {
  return (
    <div>
      <Navbar />
      <AboutPage />
<ExploreMoreSection />
      <FooterDemo />
    </div>
  );
}
