import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-bold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-majorelle-blue text-indigo hover:bg-majorelle-blue/90",
        accent: "bg-mango text-indigo hover:bg-mango/90",
        secondary:
          "bg-transparent border border-majorelle-blue text-majorelle-blue hover:bg-lavender",
        tertiary: "bg-transparent text-majorelle-blue hover:bg-lavender",
        "tertiary-warning": "bg-transparent text-jelly-bean hover:bg-pale-pink",
        "tertiary-action":
          "bg-transparent text-bleu-de-france hover:bg-alice-blue",
        filter:
          "bg-white text-primary border border-soft shadow-sm hover:bg-bg-secondary",
      },
      size: {
        default: "h-11 px-4 py-2 text-B6",
        sm: "h-9 rounded-md px-3 text-B7",
        lg: "h-12 rounded-lg px-8 text-B5",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      startIcon,
      endIcon,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {startIcon && <span className="mr-2">{startIcon}</span>}
        {children}
        {endIcon && <span className="ml-2">{endIcon}</span>}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
