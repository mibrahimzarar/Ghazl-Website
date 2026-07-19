import { Hero } from "@/components/home/Hero";
import { Purpose } from "@/components/home/Purpose";
import { Features } from "@/components/home/Features";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ValuesStrip } from "@/components/home/ValuesStrip";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Purpose />
      <Features />
      <HowItWorks />
      <ValuesStrip />
      <FinalCTA />
    </>
  );
}
