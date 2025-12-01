"use client";

import { useEffect, useState } from "react";
import { ClassItem } from "@/types";
import { enrichClassGPA } from "@/lib/gpa-calculator";

const STORAGE_KEY = "gpa-classes";

/**
 * useGPA Hook
 * - Manages all class CRUD
 * - Auto-enriches GPA values using mapping
 * - Persists to localStorage
 */
export function useGPA() {
  const [classes, setClasses] = useState<ClassItem[]>([]);

  /**
   * Load from LocalStorage on first render
   */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const enriched = parsed.map((c: ClassItem) => enrichClassGPA(c));
          setClasses(enriched);
        }
      }
    } catch (err) {
      console.error("Error loading GPA data:", err);
    }
  }, []);

  /**
   * Save to LocalStorage whenever classes change
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(classes));
  }, [classes]);

  /**
   * Add a new class
   * (We expect a full ClassItem object, including ID + name + grade + weightKey)
   */
  function addClass(newClass: ClassItem) {
    const enriched = enrichClassGPA(newClass);
    setClasses((prev) => [...prev, enriched]);
  }

  /**
   * Delete by ID
   */
  function deleteClass(id: string) {
    setClasses((prev) => prev.filter((cls) => cls.id !== id));
  }

  /**
   * Edit an existing class
   * (We merge fields, then recalc GPA)
   */
  function editClass(id: string, updatedFields: Partial<ClassItem>) {
    setClasses((prev) =>
      prev.map((cls) =>
        cls.id === id
          ? enrichClassGPA({ ...cls, ...updatedFields })
          : cls
      )
    );
  }

  /**
   * Clear all data (reset)
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
