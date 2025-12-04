"use client";

import { useEffect, useState } from "react";
import { ClassItem } from "@/types";
import { enrichClassGPA } from "@/lib/gpa-calculator";

const STORAGE_KEY = "gpa-classes";

export function useGPA() {
  const [classes, setClasses] = useState<ClassItem[]>([]);

  /**
   * Load from localStorage on mount
   */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);

      // Recalculate GPA for safety
      const enriched = parsed.map((c: ClassItem) => enrichClassGPA(c));

      setClasses(enriched);
    } catch (err) {
      console.error("Failed to parse localStorage data:", err);
    }
  }, []);

  /**
   * Save to localStorage whenever classes change
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(classes));
  }, [classes]);

  /**
   * Add class
   */
  function addClass(newClass: ClassItem) {
    const enriched = enrichClassGPA(newClass);
    setClasses((prev) => [...prev, enriched]);
  }

  /**
   * Delete class
   */
  function deleteClass(id: string) {
    setClasses((prev) => prev.filter((cls) => cls.id !== id));
  }

  /**
   * Edit class
   */
  function editClass(id: string, updatedFields?: Partial<ClassItem>) {
    setClasses((prev) =>
      prev.map((cls) =>
        cls.id === id
          ? enrichClassGPA({
              ...cls,
              ...(updatedFields ?? {}),
            })
          : cls
      )
    );
  }

  /**
   * Clear all
   */
  function clearAll() {
    setClasses([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  return {
    classes,
    addClass,
    deleteClass,
    editClass,
    clearAll,
  };
}
