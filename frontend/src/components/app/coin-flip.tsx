import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Coins } from 'lucide-react';

interface CoinFlipProps {
  flipping: boolean;
  result?: 'heads' | 'tails' | null;
  won?: boolean;
  onFlipComplete?: () => void;
}

export function CoinFlip({ flipping, result, won, onFlipComplete }: CoinFlipProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const animationCompleteRef = useRef(false);
  
  useEffect(() => {
    if (flipping && !isAnimating) {
      setIsAnimating(true);
      animationCompleteRef.current = false;
    }
  }, [flipping, isAnimating]);
  
  const handleAnimationComplete = () => {
    if (!animationCompleteRef.current) {
      animationCompleteRef.current = true;
      setTimeout(() => {
        setIsAnimating(false);
        if (onFlipComplete) {
          onFlipComplete();
        }
      }, 500);
    }
  };
  
  const getAnimationParams = () => {
    if (!isAnimating) {
      return {
        rotateY: result === 'heads' ? 0 : 180,
      };
    }
    
    // Ensure we end on the right side based on result
    // We do multiple full rotations for effect
    const endRotation = result === 'heads' ? 1440 : 1440 + 180;
    
    return {
      rotateY: [0, endRotation],
      transition: { 
        duration: 2,
        ease: "easeInOut",
        onComplete: handleAnimationComplete
      }
    };
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 relative">
      {/* Result overlay shown after animation */}
      {!isAnimating && result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`absolute z-20 px-5 py-3 rounded-lg ${
            won ? 'bg-success/90' : 'bg-destructive/90'
          } text-white font-bold text-lg shadow-lg`}
        >
          {won ? 'You Won!' : 'You Lost'}
        </motion.div>
      )}
      
      <motion.div
        className="coin"
        animate={getAnimationParams()}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="coin-heads">
          <Coins className="h-16 w-16" />
        </div>
        <div className="coin-tails">
          <Coins className="h-16 w-16" />
        </div>
      </motion.div>
      
      {!isAnimating && !result && (
        <p className="text-muted-foreground mt-6">
          Make your selection and place your bet to flip the coin
        </p>
      )}
    </div>
  );
}