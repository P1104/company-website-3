import { CarrersPage } from "@/components/carrers/carrers";
import { ExploreMoreSection } from "@/components/ExploreMoreSection";
import { FooterDemo } from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";

export default function carrers() {
  return (
    <div>
      <Navbar />
      <CarrersPage />
      <ExploreMoreSection />
      <FooterDemo />
    </div>
  );
}
