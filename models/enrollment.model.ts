import { Temporal } from "@js-temporal/polyfill"; 

export interface EnrollmentRecord { 
  readonly studentId: string; 
  readonly courseCode: string;
  enrolledAt: Temporal.Instant;
}

export type EnrollmentStatus =
  | { readonly status: "PENDING"; requestedAt: Temporal.Instant; studentId: string; courseId: string }
  | { readonly status: "APPROVED"; approvedBy: string; approvedAt: Temporal.Instant }
  | { readonly status: "ACTIVE"; startDate: Temporal.PlainDate; currentGrade?: number }
  | { readonly status: "COMPLETED"; finalGrade: number; completedAt: Temporal.Instant }
  | { readonly status: "DROPPED"; reason: string; droppedAt: Temporal.Instant };


export function describeEnrollment(enrollment: EnrollmentStatus): string {
  switch (enrollment.status) {
    case "PENDING":
      return `Awaiting approval since ${enrollment.requestedAt.toString()}`;
    case "APPROVED":
      return `Approved by ${enrollment.approvedBy}`;
    case "ACTIVE":
      return enrollment.currentGrade !== undefined
        ? `In progress — grade so far: ${enrollment.currentGrade}`
        : "In progress — not yet graded";
    case "COMPLETED":
      return `Finished with final grade: ${enrollment.finalGrade}%`;
    case "DROPPED":
      return `Dropped: ${enrollment.reason}`;
    default: {
      // If a new status is added to the union type but not handled here,
      // this line will flag a compiler error immediately!
      const _exhaustiveCheck: never = enrollment;
      throw new Error(`Unhandled status: ${JSON.stringify(_exhaustiveCheck)}`);
    }
  }
}