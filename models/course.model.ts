import { Temporal } from "@js-temporal/polyfill"; 

export interface Course { 
  readonly id: string; 
  title: string; 
  capacity: number; 
  startDate?: Temporal.PlainDate; 
}

export type CourseStatus =
  | { readonly status: "DRAFT"; createdBy: string; createdAt: Temporal.Instant }
  | { readonly status: "PUBLISHED"; publishedAt: Temporal.Instant; syllabus: string }
  | { readonly status: "ACTIVE"; enrolledCount: number; startDate: Temporal.PlainDate }
  | { readonly status: "ARCHIVED"; archivedAt: Temporal.Instant; finalEnrollmentCount: number }
  | { readonly status: "CANCELLED"; reason: string; cancelledAt: Temporal.Instant };

export function describeCourse(status: CourseStatus): string {
  switch (status.status) {
    case "DRAFT":
      return `Draft created by ${status.createdBy} at ${status.createdAt.toString()}`;
    case "PUBLISHED":
      return `Published on ${status.publishedAt.toString()}. Syllabus length: ${status.syllabus.length} chars`;
    case "ACTIVE":
      return `Active with ${status.enrolledCount} students since ${status.startDate.toString()}`;
    case "ARCHIVED":
      return `Archived at ${status.archivedAt.toString()} with ${status.finalEnrollmentCount} total completions`;
    case "CANCELLED":
      return `Course cancelled. Reason: ${status.reason}`;
    default: {
      // The ultimate type safety net
      const _exhaustiveCheck: never = status;
      throw new Error(`Unhandled course status: ${JSON.stringify(_exhaustiveCheck)}`);
    }
  }
}