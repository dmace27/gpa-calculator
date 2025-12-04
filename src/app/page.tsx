"use client";

import React, { useState } from "react";
import ClassInput from "@/components/ClassInput";
import ClassList from "@/components/ClassList";
import GPADisplay from "@/components/GPADisplay";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { useGPAContext } from "@/context/GPAContext";

import EditClassModal from "@/components/EditClassModal";
import GroupedGPAView from "@/components/GroupedGPAView";


export default function HomePage() {
  const { classes, addClass, deleteClass, editClass } = useGPAContext();

  const [editingId, setEditingId] = useState<string | null>(null);

  const classBeingEdited = classes.find((c) => c.id === editingId) || null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-green-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* HEADER */}
        <Card className="text-center bg-white border-purple-300 shadow">
          <h1 className="text-4xl font-extrabold text-purple-700">
            Central York High School GPA Calculator
          </h1>
          <p className="text-gray-600 mt-2">
            Enter your classes to calculate both school and standardized GPAs.
          </p>

          <div className="mt-4">
            <Link
              href="/gpa-chart"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl shadow transition"
            >
              About GPA Formulas
            </Link>
          </div>
        </Card>

        <ClassInput onAdd={addClass} />

        <GPADisplay classes={classes} />

        <GroupedGPAView classes={classes} />

        <ClassList
          classes={classes}
          onDelete={deleteClass}
          onEdit={(id) => setEditingId(id)}
        />

      </div>

      {/* EDIT MODAL */}
      <EditClassModal
        isOpen={editingId !== null}
        onClose={() => setEditingId(null)}
        classItem={classBeingEdited}
        onSave={editClass}
      />
    </main>
  );
}
