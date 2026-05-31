import { Temporal } from "@js-temporal/polyfill"; 
import type { Student } from "./models/student.model.js"; 

const student: Student = { 
  id: "STU-001", 
  name: "Hana Tadesse",
  enrollmentDate: Temporal.Now.instant(), 
};

// ❌ TEST 1: Try mutating a readonly property
// student.id = "STU-999";

// ❌ TEST 2: Try unsafe access on an optional property
// console.log(student.gpa.toFixed(2)); 

// ✅ SAFE ACCESS: The compiler expects this
console.log(student.gpa?.toFixed(2) ?? "Not yet graded"); 