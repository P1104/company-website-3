import { ExploreMoreSection } from "@/components/ExploreMoreSection";
import { FooterDemo } from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";
import { UseCasesPage } from "@/components/use-cases/use-cases";

export default function UseCases() {
  return (
    <div>
      <Navbar />
      <UseCasesPage />
      <ExploreMoreSection />
      <FooterDemo />
    </div>
  );
}
