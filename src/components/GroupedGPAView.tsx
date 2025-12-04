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
function GPABar({
  gpa,
  size = "normal", // "normal" or "large"
}: {
  gpa: ReturnType<typeof calculateGroupGPA>;
  size?: "normal" | "large";
}) {
  // Adjust sizes based on mode
  const labelClass =
    size === "large"
      ? "text-lg text-gray-700 whitespace-nowrap"
      : "text-xs text-gray-600 whitespace-nowrap";

  const valueClass =
    size === "large"
      ? "text-4xl font-extrabold text-purple-700 leading-tight"
      : "text-xl font-bold text-purple-700 leading-tight";

  const boxHeight = size === "large" ? "min-h-[80px]" : "min-h-[70px]";

  return (
    <div className="w-full bg-purple-100 border border-purple-300 rounded-xl p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">

        {[
          { label: "School Weighted", value: gpa.schoolWeightedGPA },
          { label: "School Unweighted", value: gpa.schoolUnweightedGPA },
          { label: "Std Weighted", value: gpa.standardizedWeightedGPA },
          { label: "Std Unweighted", value: gpa.standardizedUnweightedGPA },
        ].map((item) => (
          <div
            key={item.label}
            className={`
              flex flex-col items-center justify-center 
              ${boxHeight}
            `}
          >
            <p className={labelClass}>{item.label}</p>
            <p className={valueClass}>{item.value.toFixed(3)}</p>
          </div>
        ))}

      </div>
    </div>
  );
}



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

                    <GPABar gpa={gpa} />


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
            <Card className="bg-purple-50 border-purple-300 shadow p-4 space-y-3">
              <h3 className="text-xl font-bold text-purple-800">Year Summary</h3>

              <GPABar
                size="large"
                gpa={calculateGroupGPA(
                  sortedSemesters.flatMap((sem) => semestersMap[sem] ?? [])
                )}
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
