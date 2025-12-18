"use client";

import React from "react";
import Card from "./ui/Card";
import { ClassItem } from "@/types";

interface GPADisplayProps {
  classes: ClassItem[];
}

export default function GPADisplay({ classes }: GPADisplayProps) {
  if (classes.length === 0) {
    return null; // hide until classes exist
  }

  function GPABarGreen({
  gpa,
  size = "large",
}: {
  gpa: {
    schoolWeightedGPA: number;
    schoolUnweightedGPA: number;
    standardizedWeightedGPA: number;
    standardizedUnweightedGPA: number;
  };
  size?: "normal" | "large";
}) {
  const labelClass =
    size === "large"
      ? "text-lg text-gray-700 whitespace-nowrap"
      : "text-xs text-gray-600 whitespace-nowrap";

  const valueClass =
    size === "large"
      ? "text-4xl font-extrabold text-green-700 leading-tight"
      : "text-xl font-bold text-green-700 leading-tight";

  const boxHeight = size === "large" ? "min-h-[90px]" : "min-h-[70px]";

  return (
    <div className="w-full bg-green-100 border border-green-300 rounded-xl p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">

        {[
          { label: "School Weighted", value: gpa.schoolWeightedGPA },
          { label: "School Unweighted", value: gpa.schoolUnweightedGPA },
          { label: "Std Weighted", value: gpa.standardizedWeightedGPA },
          { label: "Std Unweighted", value: gpa.standardizedUnweightedGPA },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex flex-col items-center justify-center ${boxHeight}`}
          >
            <p className={labelClass}>{item.label}</p>
            <p className={valueClass}>{item.value.toFixed(3)}</p>
          </div>
        ))}

      </div>
    </div>
  );
}


  // Compute overall averages
  const schoolWeightedAvg =
    classes.reduce((acc, c) => acc + (c.schoolWeightedGPA ?? 0), 0) /
    classes.length;

  const schoolUnweightedAvg =
    classes.reduce((acc, c) => acc + (c.schoolUnweightedGPA ?? 0), 0) /
    classes.length;

  const standardizedWeightedAvg =
    classes.reduce((acc, c) => acc + (c.standardizedWeightedGPA ?? 0), 0) /
    classes.length;

  const standardizedUnweightedAvg =
    classes.reduce((acc, c) => acc + (c.standardizedUnweightedGPA ?? 0), 0) /
    classes.length;

  return (
  <Card className="w-full max-w-3xl mx-auto mt-8 bg-green-50 border-green-200 p-6 space-y-4">
    <h2 className="text-2xl font-bold text-green-800">
      Cummulative GPA Summary
    </h2>

    <GPABarGreen
      gpa={{
        schoolWeightedGPA: schoolWeightedAvg,
        schoolUnweightedGPA: schoolUnweightedAvg,
        standardizedWeightedGPA: standardizedWeightedAvg,
        standardizedUnweightedGPA: standardizedUnweightedAvg,
      }}
      size="large"
    />
  </Card>
);

}
