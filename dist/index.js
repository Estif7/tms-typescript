import { Temporal } from "@js-temporal/polyfill";
import { isStudent, parseStudent } from "./models/student.model.js";
const student = {
    id: "STU-001",
    name: "Hana Tadesse",
    enrollmentDate: Temporal.Now.instant(),
};
// TEST 1: Commented out because readonly prevents mutation
// student.id = "STU-999"; 
// TEST 2: Commented out because it's unsafe without checking for undefined
// console.log(student.gpa.toFixed(2)); 
// SAFE ACCESS: The compiler loves this!
console.log(student.gpa?.toFixed(2) ?? "Not yet graded\n");
// --- Part A: Testing Type Guards ---
function processStudent(raw) {
    if (isStudent(raw)) {
        // Inside this block, 'raw' is automatically narrowed down to the Student type!
        const gpaDisplay = raw.gpa?.toFixed(2) ?? "Not yet graded";
        console.log(`Student ${raw.name} GPA: ${gpaDisplay}`);
    }
    else {
        console.error("Invalid student data received via guard check");
    }
}
console.log("--- Running Guard Tests ---");
processStudent({ id: "STU-001", name: "Hana", gpa: 3.7 }); // Should print student info
processStudent(42); // Should print invalid data warning cleanly
// --- Part B: Testing Parse Exceptions ---
console.log("\n--- Running Parser Tests ---");
try {
    const validParsed = parseStudent({ id: "STU-002", name: "Dawit" });
    console.log("Successfully parsed:", validParsed);
    // This one will fail intentionally to test our descriptive type errors
    parseStudent({ id: 99, name: "Makeda" });
}
catch (error) {
    if (error instanceof TypeError) {
        console.error("Caught expected parsing exception:", error.message);
    }
}
import { calculateGrade } from "./models/assessment.model.js";
console.log("--- Running Discriminated Union Tests ---");
const testQuiz = {
    kind: "quiz",
    title: "TypeScript Basics Quiz",
    score: 8,
    totalQuestions: 10,
};
const testLab = {
    kind: "lab",
    title: "TMS Domain Models Lab",
    functionalityScore: 85,
    codeQualityScore: 90,
};
console.log(`Quiz Grade: ${calculateGrade(testQuiz)}%`); // Expected: 80%
console.log(`Lab Grade: ${calculateGrade(testLab)}%`); // Expected: 86.5%
import { describeEnrollment } from "./models/enrollment.model.js";
console.log("--- Running Exercise 5: Enrollment Status Tests ---");
const pendingEnrollment = {
    status: "PENDING",
    requestedAt: Temporal.Now.instant(),
    studentId: "STU-001",
    courseId: "CRS-101",
};
const activeEnrollment = {
    status: "ACTIVE",
    startDate: Temporal.Now.plainDateISO(),
};
console.log(describeEnrollment(pendingEnrollment));
console.log(describeEnrollment(activeEnrollment));
import { describeCourse } from "./models/course.model.js";
console.log("--- Running Exercise 5 Part B: Course Status Tests ---");
const webDev = {
    status: "ACTIVE",
    enrolledCount: 28,
    startDate: Temporal.PlainDate.from("2026-09-01"),
};
console.log(describeCourse(webDev));
import { renderResponse } from "./models/api-response.model.js";
console.log("--- Running Exercise 6: Generic API Response Tests ---");
// Test Case 1: API Response wrapping a single Student entity
const studentRes = {
    status: "success",
    data: {
        id: "STU-001",
        name: "Dawit Bekele",
        enrollmentDate: Temporal.Now.instant(),
        gpa: 3.4,
    },
    fetchedAt: Temporal.Now.instant(),
};
// Test Case 2: API Response wrapping an array of Course entities
const courseListRes = {
    status: "success",
    data: [
        {
            id: "CRS-101",
            title: "Web Development Fundamentals",
            capacity: 30,
            startDate: Temporal.PlainDate.from("2026-09-01"),
        },
    ],
    fetchedAt: Temporal.Now.instant(),
};
// Render both using the exact same generic engine function
console.log(renderResponse(studentRes, (s) => `${s.name} GPA: ${s.gpa ?? "N/A"}`));
console.log(renderResponse(courseListRes, (courses) => courses.map((c) => c.title).join(", ")));
//# sourceMappingURL=index.js.map