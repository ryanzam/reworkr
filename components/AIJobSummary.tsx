import React from 'react'

interface AIJobSummaryProps {
    summary: {
        professionalDescription: string;
        workPerformed: string[];
        issuesResolved: string[];
        remainingIssues?: string[];
        suggestedUpsell?: string;
        confidence: number;
    } | null;
    loading: boolean;
}

const AIJobSummary = ({ summary, loading }: AIJobSummaryProps) => {
    if (loading) return (
        <div style={{ padding: "24px", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px", animation: "spin 2s linear infinite", display: "inline-block" }}>⚙️</div>
            <div style={{ fontFamily: "monospace", fontSize: "12px", letterSpacing: "0.1em" }}>
                GENERATING REPORT...
            </div>
        </div>
    );

    if (!summary) return null;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{
                padding: "16px",
                background: "rgba(22,163,74,0.08)",
                border: "1px solid rgba(22,163,74,0.2)",
                borderRadius: "12px",
                fontSize: "14px",
                lineHeight: "1.7",
                color: "rgba(255,255,255,0.85)",
            }}>
                {summary.professionalDescription}
            </div>

            {[
                { label: "WORK PERFORMED", items: summary.workPerformed, color: "#86efac" },
                { label: "ISSUES RESOLVED", items: summary.issuesResolved, color: "#6ee7b7" },
                ...(summary.remainingIssues?.length ? [{ label: "REMAINING ISSUES", items: summary.remainingIssues, color: "#fca5a5" }] : []),
            ].map(section => (
                <div key={section.label}>
                    <div style={{ fontSize: "10px", fontFamily: "monospace", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>
                        {section.label}
                    </div>
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                        {section.items?.map((item, i) => (
                            <li key={i} style={{
                                display: "flex", alignItems: "flex-start", gap: "8px",
                                fontSize: "13px", color: "rgba(255,255,255,0.75)",
                            }}>
                                <span style={{ color: section.color, marginTop: "2px", flexShrink: 0 }}>◆</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            {summary.suggestedUpsell && (
                <div style={{
                    padding: "12px 16px",
                    background: "rgba(251,191,36,0.08)",
                    border: "1px solid rgba(251,191,36,0.2)",
                    borderRadius: "10px",
                    fontSize: "13px",
                    color: "#fbbf24",
                }}>
                    💡 {summary.suggestedUpsell}
                </div>
            )}

            <div style={{
                display: "flex", alignItems: "center", gap: "8px",
                fontSize: "11px", fontFamily: "monospace", color: "rgba(255,255,255,0.3)",
            }}>
                CONFIDENCE
                <div style={{ flex: 1, height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{
                        height: "100%", width: `${summary.confidence}%`,
                        background: "linear-gradient(90deg, #16a34a, #22c55e)",
                        borderRadius: "2px",
                    }} />
                </div>
                {summary.confidence}%
            </div>
        </div>
    );
}

export default AIJobSummary