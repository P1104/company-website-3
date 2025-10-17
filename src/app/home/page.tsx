// File: src/app/page.tsx

import { ExploreMoreSection } from "@/components/ExploreMoreSection";
import { FooterDemo } from "@/components/footer/footer";
import { HomePage } from "@/components/home/home";
import { Navbar } from "@/components/navbar/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HomePage />
      <ExploreMoreSection />
      <FooterDemo />
    </div>
  );
}
