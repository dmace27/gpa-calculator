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
    <Card className="w-full max-w-2xl mx-auto mt-8 bg-yellow-50 border-yellow-200">
      <h2 className="text-xl font-bold text-yellow-700 mb-4">
        Overall GPA Summary
      </h2>

      <div className="grid grid-cols-2 gap-6 text-center">
        {/* School Weighted */}
        <div className="bg-white rounded-xl p-4 shadow border border-yellow-300">
          <p className="font-semibold text-yellow-700">School Weighted</p>
          <p className="text-2xl font-bold text-yellow-900">
            {schoolWeightedAvg.toFixed(3)}
          </p>
        </div>

        {/* School Unweighted */}
        <div className="bg-white rounded-xl p-4 shadow border border-yellow-300">
          <p className="font-semibold text-yellow-700">School Unweighted</p>
          <p className="text-2xl font-bold text-yellow-900">
            {schoolUnweightedAvg.toFixed(3)}
          </p>
        </div>

        {/* Standardized Weighted */}
        <div className="bg-white rounded-xl p-4 shadow border border-yellow-300">
          <p className="font-semibold text-yellow-700">Standardized Weighted</p>
          <p className="text-2xl font-bold text-yellow-900">
            {standardizedWeightedAvg.toFixed(3)}
          </p>
        </div>

        {/* Standardized Unweighted */}
        <div className="bg-white rounded-xl p-4 shadow border border-yellow-300">
          <p className="font-semibold text-yellow-700">
            Standardized Unweighted
          </p>
          <p className="text-2xl font-bold text-yellow-900">
            {standardizedUnweightedAvg.toFixed(3)}
          </p>
        </div>
      </div>
    </Card>
  );
}
