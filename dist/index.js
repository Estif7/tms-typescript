import { Temporal } from "@js-temporal/polyfill";
import { isStudent, parseStudent } from "./models/student.model.js";
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
//# sourceMappingURL=index.js.map