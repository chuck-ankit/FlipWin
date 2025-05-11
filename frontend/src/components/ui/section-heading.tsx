import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  children?: ReactNode;
}

export function SectionHeading({
  title,
  description,
  align = 'center',
  className,
  children,
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div className={cn('mb-12 max-w-3xl', alignmentClasses[align], className)}>
      <motion.h2 
        className="font-heading text-3xl md:text-4xl font-bold gradient-text mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      
      {description && (
        <motion.p 
          className="text-muted-foreground text-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {description}
        </motion.p>
      )}
      
      {children}
    </div>
  );
}