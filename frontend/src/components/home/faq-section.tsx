import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from '@/components/ui/section-heading';
import { motion } from 'framer-motion';

export function FaqSection() {
  const faqItems = [
    {
      question: "How does the betting system work?",
      answer: "Our betting system is simple: you choose heads or tails and place your bet. The outcome is determined by a verifiably fair algorithm on the Solana blockchain. If your prediction is correct, you win double your bet amount. All results are provably fair and can be verified on-chain."
    },
    {
      question: "Is betting on FlipWin secure?",
      answer: "Yes! FlipWin operates on the Solana blockchain, providing transparency and security for all bets. Smart contracts handle all transactions, and the outcome of each flip is determined by verifiable randomness. All code is open-source and audited for security."
    },
    {
      question: "How do I deposit and withdraw SOL?",
      answer: "To deposit, simply connect your Solana wallet and transfer funds to your FlipWin account. Withdrawals are processed instantly to your connected wallet. There are no minimum withdrawal amounts, and the only fees are the standard Solana network fees."
    },
    {
      question: "What are the betting limits?",
      answer: "The minimum bet is 0.1 SOL, and the maximum bet is determined by our current liquidity pool, typically capped at 50 SOL per flip. These limits ensure we can always pay out winners and maintain platform stability."
    },
    {
      question: "How can I verify that the coin flip is fair?",
      answer: "Each flip generates a unique transaction hash on the Solana blockchain. You can verify the randomness of each flip by checking this hash. We use a provably fair algorithm that cannot be manipulated by either the player or the platform."
    }
  ];

  return (
    <section id="faq" className="py-20">
      <div className="container">
        <SectionHeading
          title="Frequently Asked Questions"
          description="Got questions about FlipWin? Find answers to the most common questions below."
        />
        
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger className="text-lg font-medium py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}