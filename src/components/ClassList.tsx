// We'll refactor this component to use a collapsible accordion rather than a table.
import React, { useState } from "react";
import Button from "./ui/Button";
import Card from "./ui/Card";
import { ClassItem } from "@/types";

interface ClassListProps {
  classes: ClassItem[];
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedFields?: Partial<ClassItem>) => void;
}

export default function ClassList({ classes, onDelete, onEdit }: ClassListProps) {
  const [isMainOpen, setIsMainOpen] = useState(true);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  if (classes.length === 0) {
    return (
      <Card className="mt-6 text-center text-gray-600">
        No classes added yet.
      </Card>
    );
  }

  // Group classes by year+semester
  const groups = classes.reduce((acc: Record<string, ClassItem[]>, cls) => {
    const key = `${cls.year ?? "?"} - ${cls.semester ?? "?"}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(cls);
    return acc;
  }, {});

  return (
    <Card className="mt-6 bg-green-50 border-green-200 p-4">
      {/* MAIN DROPDOWN */}
      <button
        className="w-full text-left text-xl font-bold text-green-700 flex justify-between items-center py-2"
        onClick={() => setIsMainOpen(!isMainOpen)}
      >
        <span>List of All Classes</span>
        <span>{isMainOpen ? "▾" : "▸"}</span>
      </button>

      {isMainOpen && (
        <div className="mt-4 space-y-4">
          {Object.entries(groups).map(([groupKey, groupClasses]) => {
            const open = openGroups[groupKey] ?? false;
            return (
              <div key={groupKey} className="border border-green-300 rounded-lg bg-white">
                {/* GROUP HEADER */}
                <button
                  className="w-full text-left px-4 py-3 bg-green-200 font-semibold text-green-900 flex justify-between items-center"
                  onClick={() =>
                    setOpenGroups((prev) => ({ ...prev, [groupKey]: !open }))
                  }
                >
                  <span>{groupKey}</span>
                  <span>{open ? "▾" : "▸"}</span>
                </button>

                {/* GROUP CONTENT */}
                {open && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-green-100 text-green-900">
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
                        {groupClasses.map((cls) => (
                          <tr key={cls.id} className="odd:bg-white even:bg-green-50 border-b">
                            <td className="px-4 py-2 font-medium">{cls.name}</td>
                            <td className="px-4 py-2">{cls.grade}</td>
                            <td className="px-4 py-2">{cls.weightKey?.toString?.()}</td>
                            <td className="px-4 py-2">{cls.schoolWeightedGPA?.toFixed(3)}</td>
                            <td className="px-4 py-2">{cls.schoolUnweightedGPA?.toFixed(3)}</td>
                            <td className="px-4 py-2">{cls.standardizedWeightedGPA?.toFixed(3)}</td>
                            <td className="px-4 py-2">{cls.standardizedUnweightedGPA?.toFixed(3)}</td>
                            <td className="px-4 py-2 whitespace-nowrap space-x-2">
                              <Button variant="secondary" onClick={() => onEdit(cls.id)}>Edit</Button>
                              <Button variant="danger" onClick={() => onDelete(cls.id)}>Delete</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
