import { ClassItem } from "@/types";
import { getGPAValue } from "./grade-weight-mappings";

/** Round everything to exactly 3 decimals */
export function round3(value: number): number {
  return Number(value.toFixed(3));
}

/** School-weighted GPA (JSON lookup + real weight) */
export function calculateSchoolWeighted(grade: number, weight: number) {
  return round3(getGPAValue(grade, weight));
}

/** School-unweighted GPA (JSON lookup forcing weight = 1.0) */
export function calculateSchoolUnweighted(grade: number) {
  return round3(getGPAValue(grade, 1.0));
}

/** Standardized weighted GPA */
export function calculateStandardizedWeighted(grade: number, weight: number) {
  const base = weight === 1.0 ? 4 : 5;
  return round3((grade / 100) * base);
}

/** Standardized unweighted GPA (always out of 4.0) */
export function calculateStandardizedUnweighted(grade: number) {
  return round3((grade / 100) * 4);
}

/**
 * Enrich a class with all 4 GPA values
 */
export function enrichClassGPA(classItem: ClassItem): ClassItem {
  return {
    ...classItem,

    // school GPAs
    schoolWeightedGPA: calculateSchoolWeighted(
      classItem.grade,
      classItem.weightKey
    ),
    schoolUnweightedGPA: calculateSchoolUnweighted(classItem.grade),

    // standardized GPAs
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
