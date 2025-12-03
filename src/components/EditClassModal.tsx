"use client";

import React, { useEffect, useState } from "react";
import Card from "./ui/Card";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Button from "./ui/Button";
import { ClassItem } from "@/types";

import {
  validateClassName,
  validateGrade,
  validateWeight,
} from "@/lib/validation";
import { getAvailableWeights } from "@/lib/grade-weight-mappings";

interface EditClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  classItem: ClassItem | null;
  onSave: (id: string, updatedFields: Partial<ClassItem>) => void;
}

export default function EditClassModal({
  isOpen,
  onClose,
  classItem,
  onSave,
}: EditClassModalProps) {
  if (!isOpen || !classItem) return null;

  const [name, setName] = useState(classItem.name);
  const [grade, setGrade] = useState(classItem.grade.toString());
  const [weight, setWeight] = useState(classItem.weightKey);

  const [year, setYear] = useState(classItem.year?.toString() ?? "");
  const [semester, setSemester] = useState(classItem.semester?.toString() ?? "");

  // Reinitialize when the modal is opened for another class
  useEffect(() => {
    if (!classItem) return;
    setName(classItem.name);
    setGrade(classItem.grade.toString());
    setWeight(classItem.weightKey);
    setYear(classItem.year?.toString() ?? "");
    setSemester(classItem.semester?.toString() ?? "");
  }, [classItem]);

  // Validate
  const nameError = validateClassName(name) ?? undefined;
  const gradeError = validateGrade(Number(grade)) ?? undefined;
  const weightError = validateWeight(Number(weight)) ?? undefined;

  const yearError = year === "" ? "Please select a year." : undefined;
  const semesterError = semester === "" ? "Please select a semester." : undefined;

  const valid =
    !nameError && !gradeError && !weightError && !yearError && !semesterError;

  function handleSave() {
    if (!valid || !classItem) return;

    onSave(classItem.id, {
      name,
      grade: Number(grade),
      weightKey: weight,
      year: Number(year),
      semester: Number(semester),
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <Card className="w-full max-w-lg bg-white border-purple-300 shadow-xl p-6 space-y-4">
        <h2 className="text-2xl font-bold text-purple-700">Edit Class</h2>

        {/* Inputs */}
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
          onChange={(e) => setWeight(e.target.value)}
          error={weightError}
        >
          {getAvailableWeights().map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </Select>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            error={yearError}
          >
            <option value="">Select Year</option>
            <option value="9">Freshman</option>
            <option value="10">Sophomore</option>
            <option value="11">Junior</option>
            <option value="12">Senior</option>
          </Select>

          <Select
            label="Semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            error={semesterError}
          >
            <option value="">Select Semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="primary" onClick={handleSave} disabled={!valid}>
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
}
