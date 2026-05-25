import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-brand-blue-100 text-brand-blue-700',
        amber: 'bg-brand-amber-100 text-brand-amber-700',
        purple: 'bg-brand-purple-100 text-brand-purple-700',
        teal: 'bg-brand-teal-100 text-brand-teal-700',
        outline: 'border border-brand-blue-200 text-brand-blue-600',
        white: 'bg-white/20 text-white border border-white/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
