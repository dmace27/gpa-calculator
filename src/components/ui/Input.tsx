import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="font-medium text-gray-700">{label}</label>
      )}

      <input
        {...props}
        className={clsx(
          "px-3 py-2 rounded-xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400",
          error ? "border-red-400" : "border-gray-300",
          className
        )}
      />

      {error && (
        <p className="text-red-500 text-sm font-medium">{error}</p>
      )}
    </div>
  );
}
