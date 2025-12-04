import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export default function Card({ children, className, ...rest }: CardProps) {
  return (
    <div
      {...rest}
      className={clsx(
        "bg-white rounded-2xl shadow-lg p-5 border border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
}
