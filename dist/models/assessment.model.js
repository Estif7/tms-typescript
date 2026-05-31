export function calculateGrade(item) {
    switch (item.kind) {
        case "quiz":
            // The compiler automatically narrows 'item' to the Quiz interface here
            return (item.score / item.totalQuestions) * 100;
        case "lab":
            // The compiler automatically narrows 'item' to the LabAssignment interface here
            return item.functionalityScore * 0.7 + item.codeQualityScore * 0.3;
        default: {
            // Enforce compile-time exhaustiveness checking
            const _exhaustiveCheck = item;
            return _exhaustiveCheck;
        }
    }
}
//# sourceMappingURL=assessment.model.js.map