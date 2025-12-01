"use client";

import React, { useState, useEffect } from "react";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Button from "./ui/Button";
import Card from "./ui/Card";

import {
  validateClassInput,
  validateGrade,
  validateClassName,
  validateWeight,
} from "@/lib/validation";

import {
  enrichClassGPA,
  calculateSchoolUnweighted,
  calculateSchoolWeighted,
  calculateStandardizedUnweighted,
  calculateStandardizedWeighted,
} from "@/lib/gpa-calculator";

import { getAvailableWeights } from "@/lib/grade-weight-mappings";
import { ClassItem } from "@/types";
import { v4 as uuidv4 } from "uuid";

interface ClassInputProps {
  onAdd: (classItem: ClassItem) => void;
}

export default function ClassInput({ onAdd }: ClassInputProps) {
  // Form fields
  const [name, setName] = useState("");
  const [grade, setGrade] = useState<number | string>("");
  const [weight, setWeight] = useState<number>(1.0);

  // Validation errors
  const nameError = validateClassName(name);
  const gradeError = validateGrade(Number(grade));
  const weightError = validateWeight(weight);

  const formValid = !nameError && !gradeError && !weightError;

  // Live GPA preview: compute when possible
  const showPreview =
    name.length > 0 && grade.toString().length > 0; // Preview starts as soon as typing begins

  // Derived GPA values
  const numericGrade = Number(grade);

  const schoolWeighted = !gradeError
    ? calculateSchoolWeighted(numericGrade, weight)
    : null;

  const schoolUnweighted = !gradeError
    ? calculateSchoolUnweighted(numericGrade)
    : null;

  const standardizedWeighted = !gradeError
    ? calculateStandardizedWeighted(numericGrade, weight)
    : null;

  const standardizedUnweighted = !gradeError
    ? calculateStandardizedUnweighted(numericGrade)
    : null;

  // Handle adding the class
  function handleAdd() {
    if (!formValid) return;

    const newClass: ClassItem = {
      id: uuidv4(),
      name,
      grade: numericGrade,
      weightKey: weight,
    };

    onAdd(enrichClassGPA(newClass));

    // Reset fields
    setName("");
    setGrade("");
    setWeight(1.0);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-6 space-y-4 bg-purple-50 border-purple-200">
      <h2 className="text-xl font-bold text-purple-700">Add a Class</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="Class Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={nameError}
        />

        <Input
          label="Grade (0–100)"
          type="number"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          error={gradeError}
        />

        <Select
          label="Weight"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          error={weightError}
        >
          {getAvailableWeights().map((w) => (
            <option key={w} value={w}>
              {w.toFixed(1)}
            </option>
          ))}
        </Select>
      </div>

      {/* Live GPA Preview */}
      {showPreview && (
        <Card className="bg-blue-50 border-blue-200 shadow">
          <h3 className="font-bold text-blue-700 text-lg mb-2">
            Live GPA Preview
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="font-semibold text-blue-600">School Weighted:</p>
              <p className="text-xl">
                {schoolWeighted !== null ? schoolWeighted.toFixed(3) : "—"}
              </p>
            </div>

            <div>
              <p className="font-semibold text-blue-600">School Unweighted:</p>
              <p className="text-xl">
                {schoolUnweighted !== null ? schoolUnweighted.toFixed(3) : "—"}
              </p>
            </div>

            <div>
              <p className="font-semibold text-blue-600">Standardized Weighted:</p>
              <p className="text-xl">
                {standardizedWeighted !== null
                  ? standardizedWeighted.toFixed(3)
                  : "—"}
              </p>
            </div>

            <div>
              <p className="font-semibold text-blue-600">Standardized Unweighted:</p>
              <p className="text-xl">
                {standardizedUnweighted !== null
                  ? standardizedUnweighted.toFixed(3)
                  : "—"}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Add button */}
      <div className="pt-3">
        <Button
          variant="primary"
          onClick={handleAdd}
          disabled={!formValid}
          className="w-full"
        >
          Add Class
        </Button>
      </div>
    </Card>
  );
}
