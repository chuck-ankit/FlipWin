import { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/context/WalletContext';
import { motion } from 'framer-motion';

interface BetControlsProps {
  onBet: (amount: number, selection: 'heads' | 'tails') => void;
  isLoading: boolean;
}

export function BetControls({ onBet, isLoading }: BetControlsProps) {
  const [selection, setSelection] = useState<'heads' | 'tails'>('heads');
  const [amount, setAmount] = useState<number>(0.1);
  const { toast } = useToast();
  const { balance, isConnected } = useWallet();
  
  const presetAmounts = [0.1, 0.2, 0.3, 0.4, 0.5, 1];
  
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(event.target.value);
    setAmount(isNaN(newAmount) ? 0 : Math.min(newAmount, 3));
  };
  
  const handlePlaceBet = () => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to place a bet.",
        variant: "destructive",
      });
      return;
    }
    
    if (amount <= 0) {
      toast({
        title: "Invalid bet amount",
        description: "Please enter a bet amount greater than 0.",
        variant: "destructive",
      });
      return;
    }
    
    if (amount > balance) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough SOL for this bet.",
        variant: "destructive",
      });
      return;
    }
    
    onBet(amount, selection);
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Select Side</Label>
        <Tabs 
          defaultValue="heads" 
          onValueChange={(value) => setSelection(value as 'heads' | 'tails')}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 w-full h-16">
            <TabsTrigger 
              value="heads" 
              className="flex items-center justify-center gap-2 text-lg data-[state=active]:bg-primary/10"
            >
              <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                H
              </span>
              Heads
            </TabsTrigger>
            <TabsTrigger 
              value="tails" 
              className="flex items-center justify-center gap-2 text-lg data-[state=active]:bg-primary/10"
            >
              <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                T
              </span>
              Tails
            </TabsTrigger>
            <TabsContent value="heads"></TabsContent>
            <TabsContent value="tails"></TabsContent>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="space-y-2">
        <Label>Bet Amount (SOL)</Label>
        <Input
          type="number"
          min="0.01"
          max="3"
          step="0.1"
          value={amount}
          onChange={handleAmountChange}
          className="text-lg h-12"
        />
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-2">
          {presetAmounts.map((preset) => (
            <Button
              key={preset}
              type="button"
              variant="outline"
              className={`${amount === preset ? 'bg-primary/10 border-primary' : ''}`}
              onClick={() => setAmount(preset)}
              disabled={isLoading || preset > balance}
            >
              {preset} SOL
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col space-y-2">
        <p className="text-muted-foreground text-sm">
          Potential winnings: <span className="font-bold text-primary">{(amount * 2).toFixed(2)} SOL</span>
        </p>
        
        <motion.div whileTap={{ scale: 0.98 }}>
          <Button 
            onClick={handlePlaceBet} 
            size="lg" 
            className="w-full text-lg h-14 glow-button"
            disabled={isLoading || !isConnected || amount <= 0 || amount > balance}
          >
            {isLoading ? 'Flipping...' : 'Place Bet & Flip'}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}