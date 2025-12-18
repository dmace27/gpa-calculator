"use client";

import { createContext, useContext } from "react";
import { useGPA } from "@/hooks/useGPA";
import { ClassItem } from "@/types";

interface GPAContextType {
  classes: ClassItem[];
  addClass: (c: ClassItem) => void;
  deleteClass: (id: string) => void;
  editClass: (id: string, updated?: Partial<ClassItem>) => void;
  clearAll: () => void;     
}

const GPAContext = createContext<GPAContextType | null>(null);

export function GPAProvider({ children }: { children: React.ReactNode }) {
  const gpa = useGPA();

  return (
    <GPAContext.Provider value={gpa}>
      {children}
    </GPAContext.Provider>
  );
}

export function useGPAContext() {
  const ctx = useContext(GPAContext);
  if (!ctx) {
    throw new Error("useGPAContext must be used inside GPAProvider");
  }
  return ctx;
}
