import { Temporal } from "@js-temporal/polyfill";
export function isStudent(value) {
    return (typeof value === "object" &&
        value !== null &&
        "id" in value &&
        "name" in value &&
        typeof value.id === "string" &&
        typeof value.name === "string");
}
export function parseStudent(raw) {
    if (typeof raw !== "object" || raw === null) {
        throw new TypeError(`Expected an object, received ${raw === null ? "null" : typeof raw}`);
    }
    const obj = raw;
    if (typeof obj.id !== "string") {
        throw new TypeError(`Expected id to be a string, received ${typeof obj.id}`);
    }
    if (typeof obj.name !== "string") {
        throw new TypeError(`Expected name to be a string, received ${typeof obj.name}`);
    }
    return {
        id: obj.id,
        name: obj.name,
        enrollmentDate: Temporal.Now.instant(),
    };
}
//# sourceMappingURL=student.model.js.map