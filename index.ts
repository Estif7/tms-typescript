import { Temporal } from "@js-temporal/polyfill";
import type { Student } from "./models/student.model.js";
import { isStudent, parseStudent } from "./models/student.model.js";

const student: Student = {
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
function processStudent(raw: unknown) {
  if (isStudent(raw)) {
    // Inside this block, 'raw' is automatically narrowed down to the Student type!
    const gpaDisplay = (raw as Student).gpa?.toFixed(2) ?? "Not yet graded";
    console.log(`Student ${raw.name} GPA: ${gpaDisplay}`);
  } else {
    console.error("Invalid student data received via guard check");
  }
}

console.log("--- Running Guard Tests ---");
processStudent({ id: "STU-001", name: "Hana", gpa: 3.7 }); // Should print student info
processStudent(42);                                       // Should print invalid data warning cleanly

// --- Part B: Testing Parse Exceptions ---
console.log("\n--- Running Parser Tests ---");
try {
  const validParsed = parseStudent({ id: "STU-002", name: "Dawit" });
  console.log("Successfully parsed:", validParsed);

  // This one will fail intentionally to test our descriptive type errors
  parseStudent({ id: 99, name: "Makeda" }); 
} catch (error) {
  if (error instanceof TypeError) {
    console.error("Caught expected parsing exception:", error.message);
  }
}



import { calculateGrade } from "./models/assessment.model.js";
import type { AssessmentItem } from "./models/assessment.model.js";

console.log("--- Running Discriminated Union Tests ---");

const testQuiz: AssessmentItem = {
  kind: "quiz",
  title: "TypeScript Basics Quiz",
  score: 8,
  totalQuestions: 10,
};

const testLab: AssessmentItem = {
  kind: "lab",
  title: "TMS Domain Models Lab",
  functionalityScore: 85,
  codeQualityScore: 90,
};

console.log(`Quiz Grade: ${calculateGrade(testQuiz)}%`); // Expected: 80%
console.log(`Lab Grade: ${calculateGrade(testLab)}%`);   // Expected: 86.5%



import { describeEnrollment } from "./models/enrollment.model.js";
import type { EnrollmentStatus } from "./models/enrollment.model.js";

console.log("--- Running Exercise 5: Enrollment Status Tests ---");

const pendingEnrollment: EnrollmentStatus = {
  status: "PENDING",
  requestedAt: Temporal.Now.instant(),
  studentId: "STU-001",
  courseId: "CRS-101",
};

const activeEnrollment: EnrollmentStatus = {
  status: "ACTIVE",
  startDate: Temporal.Now.plainDateISO(),
};

console.log(describeEnrollment(pendingEnrollment));
console.log(describeEnrollment(activeEnrollment));



import { describeCourse } from "./models/course.model.js";
import type { CourseStatus } from "./models/course.model.js";

console.log("--- Running Exercise 5 Part B: Course Status Tests ---");

const webDev: CourseStatus = {
  status: "ACTIVE",
  enrolledCount: 28,
  startDate: Temporal.PlainDate.from("2026-09-01"),
};

console.log(describeCourse(webDev));




import { renderResponse } from "./models/api-response.model.js";
import type { ApiResponse } from "./models/api-response.model.js";
import type { Course } from "./models/course.model.js";

console.log("--- Running Exercise 6: Generic API Response Tests ---");

// Test Case 1: API Response wrapping a single Student entity
const studentRes: ApiResponse<Student> = {
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
const courseListRes: ApiResponse<Course[]> = {
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




console.log("\n--- Running Exercise 7: Temporal Timestamp Tests ---");

// 1. Record the exact global moment an enrollment occurs (UTC)
const approvedAt: Temporal.Instant = Temporal.Now.instant();
console.log(`Approved at (UTC):       ${approvedAt.toString()}`);

// 2. Display the exact same moment across different wall-clock timezones
const addisTime = approvedAt.toZonedDateTimeISO("Africa/Addis_Ababa");
const londonTime = approvedAt.toZonedDateTimeISO("Europe/London");

console.log(`Addis Ababa Wall Time:   ${addisTime.toPlainTime().toString()}`);
console.log(`London Wall Time:        ${londonTime.toPlainTime().toString()}`);

// 3. Calculate exact day counts until a course starts (Date-Only, no time drift)
const courseStart = Temporal.PlainDate.from("2026-09-01");
const today = Temporal.Now.plainDateISO();

const daysUntilStart = today.until(courseStart).total({ unit: "days" });
console.log(`${Math.floor(daysUntilStart)} days until course starts`);

// 4. Determine assignment deadline duration remaining
const deadline = Temporal.PlainDate.from("2026-12-15");
const remainingDuration = today.until(deadline);
console.log(`${remainingDuration.total({ unit: "days" })} days until assignment is due`);