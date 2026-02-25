import AnnouncementBanner from "@/components/AnnouncementBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HotTicker from "@/components/HotTicker";
import SkillsTerminal from "@/components/SkillsTerminal";
import SkillCards from "@/components/SkillCards";
import ArbitragePanel from "@/components/ArbitragePanel";
import StatsBar from "@/components/StatsBar";
import WhyAgents from "@/components/WhyAgents";
import HowItWorks from "@/components/HowItWorks";
import AgentTypes from "@/components/AgentTypes";
import EngineeringCase from "@/components/EngineeringCase";
import EarningsCalculator from "@/components/EarningsCalculator";
import Leaderboard from "@/components/Leaderboard";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBanner />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <HotTicker />
        <SkillsTerminal />
        <SkillCards />
        <ArbitragePanel />
        <StatsBar />
        <WhyAgents />
        <HowItWorks />
        <AgentTypes />
        <EngineeringCase />
        <EarningsCalculator />
        <Leaderboard />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
