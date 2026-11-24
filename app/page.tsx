import Features from "@/components/Features";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FlowStory from "@/components/FlowStory";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Problem from "@/components/Problem";
import ProofStrip from "@/components/ProofStrip";
import Solution from "@/components/Solution";
import WaysIn from "@/components/WaysIn";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <ProofStrip />
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
