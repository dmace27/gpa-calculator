import { ClassItem } from "@/types";
import { getGPAValue } from "./grade-weight-mappings";

/** Convert weightKey string → numeric weight multiplier */
export function weightKeyToNumber(weightKey: string): number {
  const n = Number(weightKey);
  return isNaN(n) ? 1.0 : n; // default to 1.0 if not a number
}

/** Round everything to exactly 3 decimals */
export function round3(value: number): number {
  return Number(value.toFixed(3));
}
export function calculateSchoolWeighted(grade: number, weightKey: string) {
  const weightNum = weightKeyToNumber(weightKey);
  return round3(getGPAValue(grade, weightNum));
}

export function calculateSchoolUnweighted(grade: number) {
  return round3(getGPAValue(grade, 1.0));
}

export function calculateStandardizedWeighted(grade: number, weightKey: string) {
  const weightNum = weightKeyToNumber(weightKey);
  const base = weightNum === 1.0 ? 4 : 5;
  return round3((grade / 100) * base);
}

export function calculateStandardizedUnweighted(grade: number) {
  return round3((grade / 100) * 4);
}

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

/**
 * Average helper
 */
export function avg(values: number[]): number {
  if (!values.length) return 0;
  return round3(values.reduce((a, b) => a + b, 0) / values.length);
}

/**
 * Calculate GPA for a semester, year, or entire set
 */
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

/** Overall GPA is just a group GPA of everything */
export function calculateOverallGPA(classes: ClassItem[]) {
  return calculateGroupGPA(classes);
}
