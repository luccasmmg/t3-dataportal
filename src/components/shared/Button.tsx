import React from "react";
import clsx from "clsx";

const baseStyles = {
  solid:
    "inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors",
  outline:
    "inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors",
};

const variantStylesSolid = {
  cyan: "relative overflow-hidden bg-cyan-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors",
  red: "relative overflow-hidden bg-red-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-red-600 active:text-white/80 before:transition-colors",
  lime: "relative overflow-hidden bg-lime-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-lime-600 active:text-white/80 before:transition-colors",
  white:
    "bg-white text-cyan-900 hover:bg-white/90 active:bg-white/90 active:text-cyan-900/70",
  gray: "bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-800 active:text-white/80",
};

const variantStylesOutline = {
  gray: "border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80",
};
const variantStyles = {
  solid: { ...variantStylesSolid },
  outline: { ...variantStylesOutline },
};

export const Button = React.forwardRef<
  HTMLButtonElement,
  {
    variant?: string;
    color?: string;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    children?: React.ReactNode;
  }
>(function Button(
  { variant = "solid", color = "gray", children, className, ...props },
  ref
) {
  className = clsx(
    baseStyles[variant as keyof typeof baseStyles],
    variantStyles[variant as keyof typeof variantStyles][
      color as keyof typeof variantStylesOutline
    ],
    className
  );

  return (
    <button ref={ref} className={className} {...props}>
      {children}
    </button>
  );
});
