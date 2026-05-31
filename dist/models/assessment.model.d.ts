export interface Quiz {
    readonly kind: "quiz";
    readonly title: string;
    score: number;
    totalQuestions: number;
}
export interface LabAssignment {
    readonly kind: "lab";
    readonly title: string;
    functionalityScore: number;
    codeQualityScore: number;
}
export type AssessmentItem = Quiz | LabAssignment;
export declare function calculateGrade(item: AssessmentItem): number;
//# sourceMappingURL=assessment.model.d.ts.map