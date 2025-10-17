import { FooterDemo } from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";
import { ProductPage } from "@/components/product/product";

export default function Products() {
  return (
    <div>
      <Navbar />
      <ProductPage />
      <FooterDemo />
    </div>
  );
}
