import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/home/hero-section';
import { StatsSection } from '@/components/home/stats-section';
import { HowItWorks } from '@/components/home/how-it-works';
import { FaqSection } from '@/components/home/faq-section';
import { CtaSection } from '@/components/home/cta-section';
import { ParticleBackground } from '@/components/ui/particle-background';

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'FlipWin | Solana Betting Platform';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ParticleBackground />
      <Navbar />
      
      <main>
        <HeroSection />
        <StatsSection />
        <HowItWorks />
        <FaqSection />
        <CtaSection />
      </main>
      
      <Footer />
    </motion.div>
  );
}