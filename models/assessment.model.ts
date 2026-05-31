export interface Quiz {
  readonly kind: "quiz"; // The discriminant field
  readonly title: string;
  score: number;
  totalQuestions: number;
}

export interface LabAssignment {
  readonly kind: "lab"; // The discriminant field
  readonly title: string;
  functionalityScore: number;
  codeQualityScore: number;
}

// The Discriminated Union Type
export type AssessmentItem = Quiz | LabAssignment;


export function calculateGrade(item: AssessmentItem): number {
  switch (item.kind) {
    case "quiz":
      // The compiler automatically narrows 'item' to the Quiz interface here
      return (item.score / item.totalQuestions) * 100;

    case "lab":
      // The compiler automatically narrows 'item' to the LabAssignment interface here
      return item.functionalityScore * 0.7 + item.codeQualityScore * 0.3;

    default: {
      // Enforce compile-time exhaustiveness checking
      const _exhaustiveCheck: never = item;
      return _exhaustiveCheck;
    }
  }
}