"use client";

import React from "react";
import Button from "./ui/Button";
import Card from "./ui/Card";
import { ClassItem } from "@/types";

interface ClassListProps {
  classes: ClassItem[];
  onDelete: (id: string) => void;
  // allow callers to pass either a simple (id) handler or the full edit signature
  onEdit: (id: string, updatedFields?: Partial<ClassItem>) => void;
}

export default function ClassList({
  classes,
  onDelete,
  onEdit,
}: ClassListProps) {
  if (classes.length === 0) {
    return (
      <Card className="mt-6 text-center text-gray-600">
        No classes added yet.
      </Card>
    );
  }

  return (
    <Card className="mt-6 overflow-x-auto bg-green-50 border-green-200">
      <h2 className="text-xl font-bold text-green-700 mb-4">
        Classes This Semester
      </h2>

      <table className="min-w-full border-collapse rounded-xl overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-green-200 text-green-900 font-semibold">
            <th className="px-4 py-2 text-left">Year</th>
            <th className="px-4 py-2 text-left">Semester</th>
            <th className="px-4 py-2 text-left">Class</th>
            <th className="px-4 py-2 text-left">Grade</th>
            <th className="px-4 py-2 text-left">Weight</th>
            <th className="px-4 py-2 text-left">School W</th>
            <th className="px-4 py-2 text-left">School UW</th>
            <th className="px-4 py-2 text-left">Std W</th>
            <th className="px-4 py-2 text-left">Std UW</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
      </thead>


        <tbody>
          {classes.map((cls) => (
            <tr
              key={cls.id}
              className="odd:bg-white even:bg-green-100 border-b border-green-300"
            >
              {/* NEW: YEAR + SEMESTER */}
              <td className="px-4 py-3">
                {cls.year !== undefined ? cls.year : "—"}
              </td>

              <td className="px-4 py-3">
                {cls.semester !== undefined ? cls.semester : "—"}
              </td>

              {/* EXISTING FIELDS */}
              <td className="px-4 py-3 font-medium">{cls.name}</td>
              <td className="px-4 py-3">{cls.grade}</td>
              <td className="px-4 py-3">
                {cls.weightKey?.toString?.()}
              </td>

              <td className="px-4 py-3">{cls.schoolWeightedGPA?.toFixed(3)}</td>
              <td className="px-4 py-3">{cls.schoolUnweightedGPA?.toFixed(3)}</td>
              <td className="px-4 py-3">{cls.standardizedWeightedGPA?.toFixed(3)}</td>
              <td className="px-4 py-3">{cls.standardizedUnweightedGPA?.toFixed(3)}</td>

              <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                <Button variant="secondary" onClick={() => onEdit(cls.id)}>Edit</Button>
                <Button variant="danger" onClick={() => onDelete(cls.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </Card>
  );
}
