import React from "react";
import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white rounded-2xl shadow-lg p-5 border border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
}
