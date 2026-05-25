'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-[44px] min-w-[44px] active:scale-95',
  {
    variants: {
      variant: {
        default:
          'bg-brand-blue-500 text-white hover:bg-brand-blue-600 shadow-md hover:shadow-lg',
        amber:
          'bg-brand-amber-500 text-white hover:bg-brand-amber-600 shadow-md hover:shadow-lg',
        outline:
          'border-2 border-brand-blue-500 text-brand-blue-500 bg-transparent hover:bg-brand-blue-50',
        ghost:
          'text-brand-blue-500 hover:bg-brand-blue-50',
        white:
          'bg-white text-brand-blue-500 hover:bg-gray-50 shadow-md hover:shadow-lg',
        whatsapp:
          'bg-[#25D366] text-white hover:bg-[#20BA5A] shadow-md hover:shadow-lg',
        destructive:
          'bg-red-500 text-white hover:bg-red-600',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        default: 'h-11 px-6 text-sm',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
