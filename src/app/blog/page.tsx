import { BlogPage } from "@/components/blog/blog";
import { ExploreMoreSection } from "@/components/ExploreMoreSection";
import { FooterDemo } from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";

export default function Blog() {
  return (
    <div>
      <Navbar />
      <BlogPage />
      <ExploreMoreSection />
      <FooterDemo />
    </div>
  );
}
