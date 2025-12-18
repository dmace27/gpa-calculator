"use client";

import React, { useState } from "react";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Button from "./ui/Button";
import Card from "./ui/Card";

import { validateClassName, validateGrade, validateWeight } from "@/lib/validation";
import { getAvailableWeights } from "@/lib/grade-weight-mappings";
import { enrichClassGPA } from "@/lib/gpa-calculator";

import { ClassItem } from "@/types";
import { v4 as uuidv4 } from "uuid";

interface ClassInputProps {
  onAdd: (classItem: ClassItem) => void;
}

export default function ClassInput({ onAdd }: ClassInputProps) {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState<string>("");
  const [weight, setWeight] = useState<string>("1.0");

  const [year, setYear] = useState<string>(""); // freshman, sophomore etc
  const [semester, setSemester] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  // Validation errors
  const nameError = validateClassName(name);
  const gradeError = validateGrade(Number(grade));
  const weightError = validateWeight(weight ? Number(weight) : NaN);

  const yearError = year === "" ? "Please select a year." : null;
  const semesterError = semester === "" ? "Please select a semester." : null;

  const formValid =
    !nameError &&
    !gradeError &&
    !weightError &&
    !yearError &&
    !semesterError;

  const schoolGradeValue = Number(grade);

  // Live Preview values
  // (same as before — truncated here for clarity)

  function handleAdd() {
  setSubmitted(true);  // <--- show errors after first submit attempt

  if (!formValid) return;

  const newClass: ClassItem = {
    id: uuidv4(),
    name,
    grade: schoolGradeValue,
    weightKey: weight,
    year: Number(year),
    semester: Number(semester)
  };

  const enriched = enrichClassGPA(newClass);
  onAdd(enriched);

  // Reset fields
  setName("");
  setGrade("");
  setWeight("1.0");
  setYear("");
  setSemester("");

  // Reset validation state
  setSubmitted(false);
}
  return (
    <Card className="w-full max-w-3xl mx-auto mt-6 space-y-4 bg-purple-50 border-purple-200">
      <h2 className="text-2xl text-center font-bold text-purple-700">
        Enter Info for Each Class
        </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* CLASS NAME */}
        <Input
          label="Class Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={submitted ? nameError : undefined}
        />


        {/* GRADE */}
        <Input
          label="Grade (0 - 100)"
          type="number"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          error={submitted ? nameError : undefined}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* WEIGHT */}
        <Select
          label="Weighting"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          error={submitted ? weightError : undefined}
        >

          {getAvailableWeights().map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </Select>

        {/* YEAR DROPDOWN */}
        <Select
          label="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          error={submitted ? yearError ?? undefined : undefined}
        >
          <option value="">Select Year</option>
          <option value="9">Freshman</option>
          <option value="10">Sophomore</option>
          <option value="11">Junior</option>
          <option value="12">Senior</option>
        </Select>

        {/* SEMESTER DROPDOWN */}
        <Select
          label="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          error={submitted ? semesterError ?? undefined : undefined}
        >

          <option value="">Select Semester</option>
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
        </Select>
      </div>

      {/* Add Button */}
      <Button
        variant="primary"
        onClick={handleAdd}
        disabled={!formValid}
        className="w-full"
      >
        Add Class
      </Button>
    </Card>
  );
}
