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
  const { classes, addClass, deleteClass, editClass, clearAll } = useGPAContext();

  const [editingId, setEditingId] = useState<string | null>(null);

  const classBeingEdited = classes.find((c) => c.id === editingId) || null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-green-100 py-1 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <ClassInput onAdd={addClass} />

        <GPADisplay classes={classes} />

        <GroupedGPAView classes={classes} />

        <ClassList
          classes={classes}
          onDelete={deleteClass}
          onEdit={(id) => setEditingId(id)}
          onClearAll={clearAll}
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
