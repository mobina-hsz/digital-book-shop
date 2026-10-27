import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest transition-colors focus:outline-none focus:ring-1 focus:ring-ring select-none",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-foreground text-background shadow",
        secondary:
          "border border-border bg-secondary text-secondary-foreground",
        destructive:
          "border border-transparent bg-destructive text-destructive-foreground shadow",
        outline: "border border-foreground text-foreground",
        a24: "border border-neutral-800 dark:border-neutral-200 bg-transparent text-neutral-900 dark:text-neutral-100",
        success:
          "border border-emerald-600 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      },
    },
    defaultVariants: {
      variant: "default",
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

