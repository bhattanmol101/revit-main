import { Metadata } from "next";
import Hero from "@/src/components/Hero";
import Feature from "@/src/components/Features";
import About from "@/src/components/About";
import CTA from "@/src/components/CTA";
import Pricing from "@/src/components/Pricing";
import Contact from "@/src/components/Contact";

export const metadata: Metadata = {
  title: "Revit - All in one place for reviews",

  // other metadata
  description: "This is Home for Solid Pro",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Feature />
      {/* <Brands /> */}
      <CTA />
      <About />
      {/* <FeaturesTab /> */}
      {/* <FunFact /> */}
      {/* <Integration /> */}
      {/* <FAQ /> */}
      {/* <Testimonial /> */}
      <Pricing />
      <Contact />
    </main>
  );
}
