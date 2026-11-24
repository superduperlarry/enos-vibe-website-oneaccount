import Features from "@/components/Features";
import FinalCTA from "@/components/FinalCTA";
import FlowStory from "@/components/FlowStory";
import Footer from "@/components/Footer";
import GreenBand from "@/components/GreenBand";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import WaysIn from "@/components/WaysIn";

// Section rhythm per the Masterbrand assets palette:
// Deep Green → ENOS Green (one bold moment) → Parchment → White → Deep Green → Parchment → White → Deep Green
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <GreenBand />
      <Problem />
      <Solution />
      <FlowStory />
      <WaysIn />
      <Features />
      <FinalCTA />
      <Footer />
    </main>
  );
}
