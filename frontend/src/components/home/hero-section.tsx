import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Coins, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-secondary/20 blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-accent/20 blur-[100px]" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Powered by Solana — Fast & Secure Bets</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <span className="gradient-text">Flip & Win</span> on Solana's<br />
              Premier Betting Platform
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Experience the thrill of crypto betting with transparent odds, instant payouts, and the security of Solana's blockchain technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="glow-button text-lg group">
                <Link to="/app">
                  Launch App
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg">
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative flex justify-center">
              <motion.div 
                className="coin relative"
                animate={{ rotateY: [0, 1800] }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
              >
                <div className="coin-heads flex items-center justify-center text-xl font-bold">
                  <Coins className="h-16 w-16" />
                </div>
                <div className="coin-tails flex items-center justify-center text-xl font-bold">
                  <Coins className="h-16 w-16" />
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                className="absolute -right-8 top-1/4 bg-secondary/90 px-3 py-2 rounded-lg backdrop-blur-sm text-secondary-foreground text-sm font-medium shadow-lg"
                animate={{ y: [0, -15, 0] }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
              >
                +0.5 SOL Win!
              </motion.div>

              <motion.div
                className="absolute -left-8 bottom-1/4 bg-primary/90 px-3 py-2 rounded-lg backdrop-blur-sm text-primary-foreground text-sm font-medium shadow-lg"
                animate={{ y: [0, 15, 0] }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
              >
                Instant Payouts
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}