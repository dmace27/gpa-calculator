"use client";

import React, { useState } from "react";
import ClassInput from "@/components/ClassInput";
import ClassList from "@/components/ClassList";
import GPADisplay from "@/components/GPADisplay";
import Link from "next/link";
import { ClassItem } from "@/types";
import Card from "@/components/ui/Card";

export default function HomePage() {
  const [classes, setClasses] = useState<ClassItem[]>([]);

  // Handle adding a class
  function handleAddClass(newClass: ClassItem) {
    setClasses((prev) => [...prev, newClass]);
  }

  // Handle deleting a class
  function handleDeleteClass(id: string) {
    setClasses((prev) => prev.filter((cls) => cls.id !== id));
  }

  // Handle editing a class (future: modal or inline editor)
  function handleEditClass(id: string) {
    alert("Editing is coming soon!"); // placeholder
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-green-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* TITLE */}
        <Card className="text-center bg-white border-purple-300 shadow">
          <h1 className="text-4xl font-extrabold text-purple-700">
            School GPA Calculator
          </h1>
          <p className="text-gray-600 mt-2">
            Enter your classes to calculate both school and standardized GPAs.
          </p>

          {/* GPA Chart Link */}
          <div className="mt-4">
            <Link
              href="/gpa-chart"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl shadow transition"
            >
              View GPA Conversion Chart
            </Link>
          </div>
        </Card>

        {/* CLASS INPUT */}
        <ClassInput onAdd={handleAddClass} />

        {/* GPA SUMMARY */}
        <GPADisplay classes={classes} />

        {/* CLASS LIST */}
        <ClassList
          classes={classes}
          onDelete={handleDeleteClass}
          onEdit={handleEditClass}
        />
      </div>
    </main>
  );
}
