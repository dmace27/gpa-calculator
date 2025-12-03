"use client";

import React, { useState } from "react";
import Card from "./ui/Card";
import { ClassItem } from "@/types";

interface SemesterYearGPAProps {
  classes: ClassItem[];
}

export default function SemesterYearGPA({ classes }: SemesterYearGPAProps) {
  if (classes.length === 0) return null;

  // Group classes by year
  const years = groupByYear(classes);

  return (
    <div className="space-y-6 mt-10">
      <h2 className="text-2xl font-bold text-purple-700">GPA by Year & Semester</h2>

      {Object.entries(years).map(([year, yearClasses]) => (
        <YearAccordion key={year} year={Number(year)} classes={yearClasses} />
      ))}
    </div>
  );
}

/* ------------------------- Helper Components ------------------------- */

function YearAccordion({
  year,
  classes,
}: {
  year: number;
  classes: ClassItem[];
}) {
  const [open, setOpen] = useState(false);

  // Group by semester
  const semesters = groupBySemester(classes);

  return (
    <Card className="bg-white border-purple-300 shadow">
      {/* YEAR HEADER */}
      <div
        className="flex justify-between items-center cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <h3 className="text-xl font-bold text-purple-700">
          Year {year}
        </h3>

        <span className="text-purple-600 font-semibold">
          {open ? "▲ Collapse" : "▼ Expand"}
        </span>
      </div>

      {open && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
          {Object.entries(semesters).map(([semester, semClasses]) => (
            <SemesterCard
              key={semester}
              semester={Number(semester)}
              classes={semClasses}
            />
          ))}
        </div>
      )}
    </Card>
  );
}

function SemesterCard({
  semester,
  classes,
}: {
  semester: number;
  classes: ClassItem[];
}) {
  // Compute GPA averages for this semester
  const schoolW =
    classes.reduce((a, c) => a + (c.schoolWeightedGPA ?? 0), 0) /
    classes.length;
  const schoolUW =
    classes.reduce((a, c) => a + (c.schoolUnweightedGPA ?? 0), 0) /
    classes.length;
  const stdW =
    classes.reduce((a, c) => a + (c.standardizedWeightedGPA ?? 0), 0) /
    classes.length;
  const stdUW =
    classes.reduce((a, c) => a + (c.standardizedUnweightedGPA ?? 0), 0) /
    classes.length;

  return (
    <Card className="bg-blue-50 border-blue-200 shadow-md rounded-xl p-4">
      <h4 className="text-lg font-bold text-blue-700 mb-3">
        Semester {semester}
      </h4>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-white rounded-lg p-3 border border-blue-300">
          <p className="text-blue-700 font-semibold">School W</p>
          <p className="text-xl font-bold text-blue-900">{schoolW.toFixed(3)}</p>
        </div>

        <div className="bg-white rounded-lg p-3 border border-blue-300">
          <p className="text-blue-700 font-semibold">School UW</p>
          <p className="text-xl font-bold text-blue-900">{schoolUW.toFixed(3)}</p>
        </div>

        <div className="bg-white rounded-lg p-3 border border-blue-300">
          <p className="text-blue-700 font-semibold">Std W</p>
          <p className="text-xl font-bold text-blue-900">{stdW.toFixed(3)}</p>
        </div>

        <div className="bg-white rounded-lg p-3 border border-blue-300">
          <p className="text-blue-700 font-semibold">Std UW</p>
          <p className="text-xl font-bold text-blue-900">{stdUW.toFixed(3)}</p>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------- Grouping Helpers ------------------------- */

function groupByYear(classes: ClassItem[]): Record<number, ClassItem[]> {
  const map: Record<number, ClassItem[]> = {};
  for (const cls of classes) {
    if (!cls.year) continue;
    if (!map[cls.year]) map[cls.year] = [];
    map[cls.year].push(cls);
  }
  return map;
}

function groupBySemester(classes: ClassItem[]): Record<number, ClassItem[]> {
  const map: Record<number, ClassItem[]> = {};
  for (const cls of classes) {
    if (!cls.semester) continue;
    if (!map[cls.semester]) map[cls.semester] = [];
    map[cls.semester].push(cls);
  }
  return map;
}
