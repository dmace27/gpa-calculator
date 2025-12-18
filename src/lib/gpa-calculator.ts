import { ClassItem } from "@/types";
import { getGPAValue } from "./grade-weight-mappings";

/** Convert weightKey string → numeric weight multiplier */
export function weightKeyToNumber(weightKey: string): number {
  const n = Number(weightKey);
  return isNaN(n) ? 1.0 : n;
}

/** Round everything to exactly 3 decimals */
export function round3(value: number): number {
  return Number(value.toFixed(3));
}

/* ================= SCHOOL GPA ================= */

export function calculateSchoolWeighted(grade: number, weightKey: string) {
  const weightNum = weightKeyToNumber(weightKey);
  return round3(getGPAValue(grade, weightNum));
}

export function calculateSchoolUnweighted(grade: number) {
  return round3(getGPAValue(grade, 1.0));
}

/* ================= STANDARDIZED GPA ================= */

/** Convert numeric grade → base letter GPA (4.0 scale) */
export function numericToLetterGPA(grade: number): number {
  if (grade >= 91) return 4.0;
  if (grade >= 81) return 3.0;
  if (grade >= 71) return 2.0;
  if (grade >= 61) return 1.0;
  return 0.0;
}

/** Standardized GPA (letter-based, weighted adds +1.0) */
export function calculateStandardizedWeighted(
  grade: number,
  weightKey: string
) {
  const baseGPA = numericToLetterGPA(grade);
  const weightNum = weightKeyToNumber(weightKey);

  const weightedGPA = weightNum > 1.0 ? baseGPA + 1.0 : baseGPA;

  return round3(weightedGPA);
}

/** Standardized unweighted GPA (always letter-based, no boost) */
export function calculateStandardizedUnweighted(grade: number) {
  return round3(numericToLetterGPA(grade));
}

/* ================= CLASS ENRICHMENT ================= */

export function enrichClassGPA(classItem: ClassItem): ClassItem {
  return {
    ...classItem,

    schoolWeightedGPA: calculateSchoolWeighted(
      classItem.grade,
      classItem.weightKey
    ),

    schoolUnweightedGPA: calculateSchoolUnweighted(classItem.grade),

    standardizedWeightedGPA: calculateStandardizedWeighted(
      classItem.grade,
      classItem.weightKey
    ),

    standardizedUnweightedGPA: calculateStandardizedUnweighted(
      classItem.grade
    ),
  };
}

/* ================= GROUP CALCULATIONS ================= */

export function avg(values: number[]): number {
  if (!values.length) return 0;
  return round3(values.reduce((a, b) => a + b, 0) / values.length);
}

export function calculateGroupGPA(classes: ClassItem[]) {
  return {
    schoolWeightedGPA: avg(classes.map((c) => c.schoolWeightedGPA ?? 0)),
    schoolUnweightedGPA: avg(classes.map((c) => c.schoolUnweightedGPA ?? 0)),
    standardizedWeightedGPA: avg(
      classes.map((c) => c.standardizedWeightedGPA ?? 0)
    ),
    standardizedUnweightedGPA: avg(
      classes.map((c) => c.standardizedUnweightedGPA ?? 0)
    ),
    count: classes.length,
  };
}

export function calculateOverallGPA(classes: ClassItem[]) {
  return calculateGroupGPA(classes);
}
