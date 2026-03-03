interface SectionCardProps {
    title: string;
    icon: React.ReactNode;
    step: number;
    isLocked?: boolean;
    lockReason?: string;
    isComplete?: boolean;
    children: React.ReactNode;
}

const SectionCard = ({ title, icon, step, isLocked, lockReason, children, isComplete }: SectionCardProps) => {
    return (
        <div style={{
            background: "rgba(255,255,255,0.03)",
            border: isComplete
                ? "1px solid rgba(22,163,74,0.3)"
                : isLocked
                    ? "1px solid rgba(220,38,38,0.15)"
                    : "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            overflow: "hidden",
            transition: "all 0.3s",
        }}>
            <div style={{
                padding: "16px 20px",
                background: isComplete
                    ? "rgba(22,163,74,0.08)"
                    : isLocked
                        ? "rgba(220,38,38,0.04)"
                        : "rgba(255,255,255,0.02)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                display: "flex", alignItems: "center", gap: "12px",
            }}>
                <div style={{
                    width: "28px", height: "28px",
                    borderRadius: "8px",
                    background: isComplete ? "rgba(22,163,74,0.2)" : isLocked ? "rgba(220,38,38,0.1)" : "rgba(255,255,255,0.06)",
                    border: `1px solid ${isComplete ? "rgba(22,163,74,0.4)" : isLocked ? "rgba(220,38,38,0.2)" : "rgba(255,255,255,0.1)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "13px",
                    fontFamily: "monospace",
                    fontWeight: "700",
                    color: isComplete ? "#22c55e" : isLocked ? "#f87171" : "rgba(255,255,255,0.4)",
                }}>
                    {isComplete ? "✓" : step}
                </div>
                <div>
                    <div style={{ fontSize: "14px", fontWeight: "600", color: isLocked ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", gap: "8px" }}>
                        {icon} {title}
                        {isLocked && <span style={{ fontSize: "11px", color: "#f87171" }}>🔒 LOCKED</span>}
                    </div>
                    {isLocked && lockReason && (
                        <div style={{ fontSize: "11px", color: "rgba(248,113,113,0.6)", fontFamily: "monospace", marginTop: "2px" }}>
                            Requires: {lockReason}
                        </div>
                    )}
                </div>
            </div>
            <div style={{ padding: "20px", opacity: isLocked ? 0.5 : 1, transition: "opacity 0.3s" }}>
                {children}
            </div>
        </div>
    );
}

export default SectionCard