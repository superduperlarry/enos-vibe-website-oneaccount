import Agents from "@/components/Agents";
import Features from "@/components/Features";
import FinalCTA from "@/components/FinalCTA";
import FlowStory from "@/components/FlowStory";
import Footer from "@/components/Footer";
import GreenBand from "@/components/GreenBand";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Problem from "@/components/Problem";
import Savings from "@/components/Savings";
import Solution from "@/components/Solution";
import VersionSwitch from "@/components/VersionSwitch";
import WaysIn from "@/components/WaysIn";

// Section rhythm per the Masterbrand assets palette:
// Deep Green → ENOS Green (one bold moment) → Parchment → White → Deep Green → Parchment → Deep Green (agents) → White → Parchment → Deep Green
export default function HomePage({ visual }: { visual: "e" | "globe" }) {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero visual={visual} />
        <GreenBand />
        <Problem />
        <Solution />
        <FlowStory />
        <WaysIn />
        <Agents />
        <Features />
        <Savings />
        <FinalCTA />
      </main>
      <Footer />
      <VersionSwitch current={visual} />
    </>
  );
}
