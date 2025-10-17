// File: src/app/page.tsx

import { FooterDemo } from "@/components/footer/footer";
import { HomePage } from "@/components/home/home";
import { Navbar } from "@/components/navbar/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HomePage />
      <FooterDemo />
    </div>
  );
}
