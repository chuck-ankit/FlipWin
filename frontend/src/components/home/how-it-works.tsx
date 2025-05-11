import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { 
  Wallet, 
  Coins, 
  FlipHorizontal,
  BadgeDollarSign
} from 'lucide-react';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  step: number;
}

function Step({ icon, title, description, delay, step }: StepProps) {
  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.3 }}
    >
      <div className="relative mb-6">
        <div className="bg-primary/10 p-5 rounded-full">
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
          {step}
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-3 font-heading">
        {title}
      </h3>
      
      <p className="text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container">
        <SectionHeading
          title="How It Works"
          description="Get started with FlipWin in just a few simple steps. It's easy, secure, and fun!"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <Step
            icon={<Wallet className="h-8 w-8 text-primary" />}
            title="Connect Wallet"
            description="Link your Solana wallet to start playing. No registration required."
            delay={0}
            step={1}
          />
          
          <Step
            icon={<Coins className="h-8 w-8 text-secondary" />}
            title="Choose Bet Amount"
            description="Select how much SOL you want to bet on each flip."
            delay={1}
            step={2}
          />
          
          <Step
            icon={<FlipHorizontal className="h-8 w-8 text-accent" />}
            title="Pick Heads or Tails"
            description="Make your prediction on which side the coin will land."
            delay={2}
            step={3}
          />
          
          <Step
            icon={<BadgeDollarSign className="h-8 w-8 text-secondary" />}
            title="Win & Withdraw"
            description="Instant payouts directly to your wallet when you win."
            delay={3}
            step={4}
          />
        </div>
      </div>
    </section>
  );
}