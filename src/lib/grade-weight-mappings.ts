import mappings from "@/data/gpa-mappings.json";

/**
 * Represents one entry in the GPA mapping JSON.
 */
export interface GPAMappingEntry {
  minGrade: number;
  maxGrade: number;
  weight: number;
  gpaValue: number;
}

/**
 * Cast imported JSON to a typed array.
 */
const gradeMappings: GPAMappingEntry[] = mappings as GPAMappingEntry[];

/**
 * Gets the GPA value for a given numeric grade (0-100) and weight (1.0, 1.1, 1.2).
 *
 * The JSON file directly maps (minGrade-maxGrade, weight) → GPA.
 * We simply look up the matching record.
 *
 * @param grade number between 0 and 100
 * @param weight one of the supported weight multipliers
 */
export function getGPAValue(grade: number, weight: number): number {
  if (isNaN(grade) || isNaN(weight)) {
    throw new Error("Invalid grade or weight: must be numbers.");
  }

  // Clamp grade to allowed range
  const g = Math.max(0, Math.min(grade, 100));

  const entry = gradeMappings.find(
    (item) =>
      g >= item.minGrade &&
      g <= item.maxGrade &&
      Number(weight) === Number(item.weight)
  );

  if (!entry) {
    console.warn("No GPA mapping found for grade/weight:", grade, weight);
    return 0;
  }

  return entry.gpaValue;
}

/**
 * Gets the list of valid weight options from the JSON file.
 * Useful for populating dropdowns.
 */
export function getAvailableWeights(): number[] {
  const uniqueWeights = Array.from(
    new Set(gradeMappings.map((m) => m.weight))
  );
  return uniqueWeights.sort();
}
