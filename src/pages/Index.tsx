import { motion } from "framer-motion";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
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
import Partners from "@/components/Partners";
import FAQ from "@/components/FAQ";
import CreatePortal from "@/components/CreatePortal";
import Footer from "@/components/Footer";
import Leaderboard from "@/components/Leaderboard";
import EarningsCalculator from "@/components/EarningsCalculator";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const Section = ({ id, children }: { id?: string; children: React.ReactNode }) => (
  <motion.div
    id={id}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    variants={sectionVariants}
  >
    {children}
  </motion.div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <AnnouncementBanner />
      <Navbar />
      <main id="main-content">
        <Section>
          <HeroSection />
        </Section>
        <HotTicker />
        <Section id="create">
          <SkillsTerminal />
        </Section>
        <Section>
          <SkillCards />
        </Section>
        <Section>
          <ArbitragePanel />
        </Section>
        <StatsBar />
        <Section>
          <Leaderboard />
        </Section>
        <Section>
          <EarningsCalculator />
        </Section>
        <Section>
          <WhyAgents />
        </Section>
        <Section>
          <HowItWorks />
        </Section>
        <Section>
          <AgentTypes />
        </Section>
        <Section>
          <EngineeringCase />
        </Section>
        <Partners />
        <Section id="faq">
          <FAQ />
        </Section>
        <Section id="create-portal">
          <CreatePortal />
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
