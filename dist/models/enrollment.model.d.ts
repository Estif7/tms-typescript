import { Temporal } from "@js-temporal/polyfill";
export interface EnrollmentRecord {
    readonly studentId: string;
    readonly courseCode: string;
    enrolledAt: Temporal.Instant;
}
export type EnrollmentStatus = {
    readonly status: "PENDING";
    requestedAt: Temporal.Instant;
    studentId: string;
    courseId: string;
} | {
    readonly status: "APPROVED";
    approvedBy: string;
    approvedAt: Temporal.Instant;
} | {
    readonly status: "ACTIVE";
    startDate: Temporal.PlainDate;
    currentGrade?: number;
} | {
    readonly status: "COMPLETED";
    finalGrade: number;
    completedAt: Temporal.Instant;
} | {
    readonly status: "DROPPED";
    reason: string;
    droppedAt: Temporal.Instant;
};
export declare function describeEnrollment(enrollment: EnrollmentStatus): string;
//# sourceMappingURL=enrollment.model.d.ts.map