export const JobSummarySchema = {
    type: "object",
    properties: {
        professionalDescription: { type: "string" },
        workPerformed: { type: "array", items: { type: "string" } },
        issuesResolved: { type: "array", items: { type: "string" } },
        remainingIssues: { type: "array", items: { type: "string" } },
        suggestedUpsell: { type: "string" },
        confidence: { type: "number" }
    },
    required: ["professionalDescription", "workPerformed", "issuesResolved", "confidence"]
};
