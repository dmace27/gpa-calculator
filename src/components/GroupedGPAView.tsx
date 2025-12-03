"use client";

import React from "react";
import Card from "./ui/Card";
import GPADisplay from "./GPADisplay";
import { ClassItem } from "@/types";
import { calculateGroupGPA } from "@/lib/gpa-calculator";

interface GroupedGPAViewProps {
  classes: ClassItem[];
}

/**
 * GroupedGPAView
 * Renders all years and their semesters simultaneously.
 */
export default function GroupedGPAView({ classes }: GroupedGPAViewProps) {
  if (!classes || classes.length === 0) return null;

  // Group classes by year -> semester
  const yearsMap = groupByYear(classes);

  // Sort years numerically ascending
  const sortedYears = Object.keys(yearsMap)
    .map((y) => Number(y))
    .sort((a, b) => a - b);

  return (
    <div className="space-y-10">
      {sortedYears.map((year) => {
        const yearClasses = yearsMap[year] ?? [];
        const semestersMap = groupBySemester(yearClasses);
        const sortedSemesters = Object.keys(semestersMap)
          .map((s) => Number(s))
          .sort((a, b) => a - b);

        return (
          <Card
            key={year}
            className="border-purple-300 bg-white shadow-lg p-6 space-y-6"
          >
            <h2 className="text-3xl font-bold text-purple-700 mb-4">
              {year === 9 && "Freshman Year"}
              {year === 10 && "Sophomore Year"}
              {year === 11 && "Junior Year"}
              {year === 12 && "Senior Year"}
              {![9, 10, 11, 12].includes(year) && `Year ${year}`}
            </h2>

            {/* PER-SEMESTER SECTIONS (side-by-side on md+) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedSemesters.map((sem) => {
                const semClasses: ClassItem[] = semestersMap[sem] ?? [];
                const gpa = calculateGroupGPA(semClasses);

                return (
                  <Card
                    key={sem}
                    className="border-blue-300 bg-blue-50 shadow p-4 space-y-4"
                  >
                    <h3 className="text-xl font-bold text-blue-800">
                      Semester {sem} Summary
                    </h3>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold text-gray-700">School Weighted:</p>
                        <p className="text-gray-900">
                          {gpa.schoolWeightedGPA.toFixed(3)}
                        </p>
                      </div>

                      <div>
                        <p className="font-semibold text-gray-700">School Unweighted:</p>
                        <p className="text-gray-900">
                          {gpa.schoolUnweightedGPA.toFixed(3)}
                        </p>
                      </div>

                      <div>
                        <p className="font-semibold text-gray-700">Std Weighted:</p>
                        <p className="text-gray-900">
                          {gpa.standardizedWeightedGPA.toFixed(3)}
                        </p>
                      </div>

                      <div>
                        <p className="font-semibold text-gray-700">Std Unweighted:</p>
                        <p className="text-gray-900">
                          {gpa.standardizedUnweightedGPA.toFixed(3)}
                        </p>
                      </div>
                    </div>

                    {/* Table of classes */}
                    <table className="w-full border-collapse text-sm mt-2">
                      <thead>
                        <tr className="bg-blue-200 text-blue-900 font-semibold">
                          <th className="px-2 py-1 text-left">Class</th>
                          <th className="px-2 py-1 text-left">Grade</th>
                          <th className="px-2 py-1 text-left">Weight</th>
                          <th className="px-2 py-1 text-left">School W</th>
                          <th className="px-2 py-1 text-left">Std W</th>
                        </tr>
                      </thead>
                      <tbody>
                        {semClasses.map((c: ClassItem) => (
                          <tr key={c.id} className="odd:bg-white even:bg-blue-100 border-b">
                            <td className="px-2 py-1">{c.name}</td>
                            <td className="px-2 py-1">{c.grade}</td>
                            <td className="px-2 py-1">{c.weightKey}</td>
                            <td className="px-2 py-1">
                              {c.schoolWeightedGPA?.toFixed(3)}
                            </td>
                            <td className="px-2 py-1">
                              {c.standardizedWeightedGPA?.toFixed(3)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card>
                );
              })}
            </div>

            {/* YEAR SUMMARY: combine all semester classes for the year */}
            <Card className="bg-purple-50 border-purple-400 shadow p-4 space-y-4">
              <h3 className="text-2xl font-bold text-purple-800">
                Year Summary
              </h3>

              <GPADisplay
                classes={sortedSemesters.flatMap((sem) => semestersMap[sem] ?? [])}
              />
            </Card>
          </Card>
        );
      })}
    </div>
  );
}

/* ------------------------- Helpers ------------------------- */

function groupByYear(classes: ClassItem[]): Record<number, ClassItem[]> {
  const map: Record<number, ClassItem[]> = {};
  classes.forEach((c: ClassItem) => {
    const y = c.year;
    if (y === undefined || y === null) return;
    if (!map[y]) map[y] = [];
    map[y].push(c);
  });
  return map;
}

function groupBySemester(classes: ClassItem[]): Record<number, ClassItem[]> {
  const map: Record<number, ClassItem[]> = {};
  classes.forEach((c: ClassItem) => {
    const s = c.semester;
    if (s === undefined || s === null) return;
    if (!map[s]) map[s] = [];
    map[s].push(c);
  });
  return map;
}
