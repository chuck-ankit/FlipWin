import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { SectionHeading } from '@/components/ui/section-heading';
import { 
  CircleDollarSign, 
  Users, 
  Trophy
} from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  delay: number;
  duration?: number;
  decimals?: number;
}

function StatItem({ 
  icon, 
  label, 
  value, 
  prefix = '', 
  suffix = '', 
  delay, 
  duration = 2.5,
  decimals = 0 
}: StatItemProps) {
  const [isStarted, setIsStarted] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (inView && !isStarted) {
      const timer = setTimeout(() => {
        setIsStarted(true);
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [inView, delay, isStarted]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center p-6 rounded-2xl glassmorphism"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.2 }}
    >
      <div className="bg-primary/10 p-3 rounded-full mb-4">
        {icon}
      </div>
      
      <div className="text-3xl md:text-4xl font-bold mb-2 font-heading">
        {prefix}
        {inView ? (
          <CountUp 
            start={0} 
            end={isStarted ? value : 0} 
            duration={duration}
            decimals={decimals}
            separator=","
          />
        ) : 0}
        {suffix}
      </div>
      
      <div className="text-muted-foreground text-center">
        {label}
      </div>
    </motion.div>
  );
}

export function StatsSection() {
  return (
    <section className="py-20">
      <div className="container">
        <SectionHeading
          title="Live Platform Statistics"
          description="Our platform processes thousands of bets daily with complete transparency and instant payouts."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatItem
            icon={<CircleDollarSign className="h-8 w-8 text-primary" />}
            label="Total Bets Placed"
            value={238945}
            delay={0}
          />
          
          <StatItem
            icon={<Users className="h-8 w-8 text-secondary" />}
            label="Active Players"
            value={12678}
            delay={0.3}
          />
          
          <StatItem
            icon={<Trophy className="h-8 w-8 text-accent" />}
            label="Biggest Win"
            value={126.8}
            prefix=""
            suffix=" SOL"
            delay={0.6}
            decimals={1}
          />
        </div>
      </div>
    </section>
  );
}