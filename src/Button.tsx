import { cva, type VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, PropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const button = cva(
  [
    "rounded-lg",
    "px-4",
    "py-2",
    "text-sm",
    "text-white",
    "transition-all",
    "duration-300",
  ],
  {
    variants: {
      intent: {
        done: ["bg-sky-500 hover:bg-sky-300"],
        undone: ["bg-slate-500 hover:bg-slate-300"],
        edit: ["bg-yellow-500 hover:bg-yellow-300"],
        delete: ["bg-red-500 hover:bg-red-300"],
      },
    },
    defaultVariants: {
      intent: "done",
    },
  },
);

type button = VariantProps<typeof button>;

type ButtonProps = {
  className?: string;
  props?: PropsWithoutRef<any>;
  children: ReactNode;
} & button &
  ComponentPropsWithoutRef<"button">;

const Button = ({
  intent = "done",
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button {...props} className={twMerge(button({ intent }), className)}>
      {children}
    </button>
  );
};

export default Button;
