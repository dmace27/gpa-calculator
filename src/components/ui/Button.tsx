import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export default function Button({
  children,
  variant = "primary",
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base = "px-4 py-2 rounded-xl font-semibold transition-all";

  const variants = {
    primary:
      "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 shadow-md disabled:bg-blue-300",
    secondary:
      "bg-purple-200 text-purple-900 hover:bg-purple-300 shadow-md",
    danger:
      "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-md",
  };

  return (
    <button
      className={clsx(base, variants[variant], disabled && "cursor-not-allowed opacity-60", className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
