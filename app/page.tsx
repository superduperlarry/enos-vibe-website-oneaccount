import Audience from "@/components/Audience";
import Features from "@/components/Features";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FlowStory from "@/components/FlowStory";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <Problem />
      <Solution />
      <FlowStory />
      <Audience />
      <Features />
      <FinalCTA />
      <Footer />
    </main>
  );
}
