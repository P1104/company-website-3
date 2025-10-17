import { BlogPage } from "@/components/blog/blog";
import { FooterDemo } from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";

export default function Blog() {
  return (
    <div>
      <Navbar />
      <BlogPage />
      <FooterDemo />
    </div>
  );
}
