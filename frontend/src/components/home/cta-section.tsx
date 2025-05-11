import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function CtaSection() {
  return (
    <section className="py-20">
      <div className="container">
        <motion.div 
          className="relative overflow-hidden rounded-3xl glassmorphism"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-secondary/20 blur-[100px]" />
          </div>

          <div className="px-6 py-16 md:p-16 text-center">
            <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Get Started in Seconds</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading gradient-text">
              Ready to Try Your Luck?
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of players who are already winning on the Solana blockchain. 
              Connect your wallet, place your bet, and experience the thrill of the flip.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="glow-button group">
                <Link to="/app">
                  Launch App
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}