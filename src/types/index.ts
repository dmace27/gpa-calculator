export interface ClassItem {
  id: string;            // uuid
  name: string;
  grade: number;         // 0-100
  weightKey: number;     // e.g. "Unweighted" or "AP" or "1.0"
  semester?: number;      // optional: 1..n to group
  year?: number;          // optional

  schoolWeightedGPA?: number;
  schoolUnweightedGPA?: number;
  standardizedWeightedGPA?: number;
  standardizedUnweightedGPA?: number;
}

export interface GradeMappingEntry {
  min: number;           // inclusive
  max: number;           // inclusive
  weightKey: string;     // matches weightKey used in UI/mapping
  gpa: number;
}

export interface GPAResult {
  SchoolWeightedGPA: number;
  schoolUnweightedGPA: number;
  standardizedWeightedGPA: number;
  standardizedUnweightedGPA: number;
  totalClasses: number;
  perClass: { id: string; gpa: number; }[];
}
