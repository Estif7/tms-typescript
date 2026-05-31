import { Temporal } from "@js-temporal/polyfill";
export function describeCourse(status) {
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
            const _exhaustiveCheck = status;
            throw new Error(`Unhandled course status: ${JSON.stringify(_exhaustiveCheck)}`);
        }
    }
}
//# sourceMappingURL=course.model.js.map