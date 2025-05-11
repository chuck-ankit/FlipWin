import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { BetControls } from '@/components/app/bet-controls';
import { CoinFlip } from '@/components/app/coin-flip';
import { HistoryCard } from '@/components/app/history-card';
import { ParticleBackground } from '@/components/ui/particle-background';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ArrowRight, Wallet, GamepadIcon } from 'lucide-react';

export default function AppPage() {
  const [flipping, setFlipping] = useState(false);
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const [won, setWon] = useState<boolean | null>(null);
  const { isConnected, isDemoAccount, balance, connectWallet, connectDemo, placeBet } = useWallet();
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'FlipWin | Game';
  }, []);

  const handleBet = async (amount: number, selection: 'heads' | 'tails') => {
    setFlipping(true);
    setResult(null);
    setWon(null);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get the result from our simulated bet
      const isWin = await placeBet(amount, selection);
      
      // Randomly determine heads or tails
      const flipResult = Math.random() > 0.5 ? 'heads' : 'tails';
      
      // If we need to force a win or loss based on the isWin result
      const finalResult = isWin 
        ? selection // Force matching result for win
        : selection === 'heads' ? 'tails' : 'heads'; // Force opposite for loss
      
      // Set the result state after the animation
      setTimeout(() => {
        setResult(finalResult);
        setWon(isWin);
        
        toast({
          title: isWin ? "You won!" : "You lost!",
          description: isWin 
            ? `Congratulations! You've won ${amount.toFixed(1)} SOL.`
            : `Better luck next time. You lost ${amount.toFixed(1)} SOL.`,
          variant: isWin ? "default" : "destructive",
        });
      }, 2000);
    } catch (error) {
      console.error("Error placing bet:", error);
      setFlipping(false);
      toast({
        title: "Error",
        description: "An error occurred while placing your bet.",
        variant: "destructive",
      });
    }
  };

  const handleFlipComplete = () => {
    setFlipping(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ParticleBackground />
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container">
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {!isConnected ? (
              <motion.div variants={itemVariants}>
                <Card className="glassmorphism border-primary/20 overflow-hidden">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-heading gradient-text">
                      Choose How to Play
                    </CardTitle>
                    <CardDescription>
                      Connect your wallet to play with real SOL or try the demo version
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col sm:flex-row justify-center items-center gap-4 pb-8">
                    <Button 
                      onClick={connectWallet} 
                      size="lg" 
                      className="glow-button text-lg w-full sm:w-auto"
                    >
                      <Wallet className="mr-2 h-5 w-5" />
                      Connect Wallet
                    </Button>
                    <Button 
                      onClick={connectDemo} 
                      variant="secondary"
                      size="lg" 
                      className="text-lg w-full sm:w-auto"
                    >
                      <GamepadIcon className="mr-2 h-5 w-5" />
                      Play Demo
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <>
                <motion.div variants={itemVariants} className="mb-8">
                  <Card className="glassmorphism border-primary/20 overflow-hidden">
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl font-heading">
                        Flip & Win {isDemoAccount ? '(Demo Mode)' : ''}
                      </CardTitle>
                      <CardDescription>
                        Choose heads or tails, place your bet, and flip the coin to win!
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                          <CoinFlip 
                            flipping={flipping} 
                            result={result} 
                            won={won !== null ? won : undefined}
                            onFlipComplete={handleFlipComplete}
                          />
                        </div>
                        <div>
                          <BetControls onBet={handleBet} isLoading={flipping} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <HistoryCard />
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
}