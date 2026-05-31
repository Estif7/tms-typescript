import { Temporal } from "@js-temporal/polyfill";
export function describeEnrollment(enrollment) {
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
            const _exhaustiveCheck = enrollment;
            throw new Error(`Unhandled status: ${JSON.stringify(_exhaustiveCheck)}`);
        }
    }
}
//# sourceMappingURL=enrollment.model.js.map