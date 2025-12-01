
import { getAvailableWeights } from "./grade-weight-mappings";

/**
 * Validate a class name.
 */
export function validateClassName(name: string): string {
   if (!name || name.trim().length === 0) {
      return "Class name cannot be empty.";
   }
   if (name.length > 50) return "Class name is too long.";
      return "";
}

/**
 * Validate grade (0–100).
 */
export function validateGrade(grade: number): string {
   if (isNaN(grade)) 
      return "Grade must be a number.";
   if (grade < 0 || grade > 100) 
      return "Grade must be between 0 and 100.";
   
   
   return "";
}

/**
 * Validate weight from JSON list (1.0, 1.1, 1.2).
 */
export function validateWeight(weight: number): string {
   const valid = getAvailableWeights(); // reads from JSON
   if (!valid.includes(Number(weight))) {
      return `Weight must be one of: ${valid.join(", ")}`;
   }
   return "";
}

/**
 * Validate an entire class entry.
 */
export function validateClassInput(classItem: {
  name: string;
  grade: number;
  weightKey: number;  }) 
{
   const nameError = validateClassName(classItem.name);
   const gradeError = validateGrade(classItem.grade);
   const weightError = validateWeight(classItem.weightKey);

   return {
      nameError,
      gradeError,
      weightError,
      isValid: !nameError && !gradeError && !weightError,
   };
}

/**
 * Validate a whole list of classes (for semester/year).
 * Useful for enabling/disabling the "Calculate" button.
 */
export function validateClassList(classes: {
   name: string;
   grade: number;
   weightKey: number;  }[]) 
   {
   for (const c of classes) {
      const result = validateClassInput(c);
      if (!result.isValid) return false;
   }
   
   return true;
}
