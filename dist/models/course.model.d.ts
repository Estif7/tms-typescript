import { Temporal } from "@js-temporal/polyfill";
export interface Course {
    readonly id: string;
    title: string;
    capacity: number;
    startDate?: Temporal.PlainDate;
}
export type CourseStatus = {
    readonly status: "DRAFT";
    createdBy: string;
    createdAt: Temporal.Instant;
} | {
    readonly status: "PUBLISHED";
    publishedAt: Temporal.Instant;
    syllabus: string;
} | {
    readonly status: "ACTIVE";
    enrolledCount: number;
    startDate: Temporal.PlainDate;
} | {
    readonly status: "ARCHIVED";
    archivedAt: Temporal.Instant;
    finalEnrollmentCount: number;
} | {
    readonly status: "CANCELLED";
    reason: string;
    cancelledAt: Temporal.Instant;
};
export declare function describeCourse(status: CourseStatus): string;
//# sourceMappingURL=course.model.d.ts.map