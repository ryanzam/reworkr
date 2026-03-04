import { Lock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  isLocked: boolean;
  label: string;
  disabled?: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

export function LockedActionButton({ isLocked, lockReason, children, onClick, variant = "primary", loading = false }: any) {
  return (
    <button
      onClick={isLocked ? undefined : onClick}
      disabled={isLocked || loading}
      style={{
        position: "relative",
        width: "100%",
        padding: "14px 24px",
        borderRadius: "12px",
        border: isLocked ? "1px solid rgba(220,38,38,0.3)" : "1px solid rgba(22,163,74,0.4)",
        background: isLocked
          ? "rgba(220,38,38,0.08)"
          : variant === "complete"
            ? "linear-gradient(135deg, #15803d, #166534)"
            : "linear-gradient(135deg, rgba(22,163,74,0.2), rgba(22,163,74,0.1))",
        color: isLocked ? "rgba(252,165,165,0.7)" : "#86efac",
        fontSize: "15px",
        fontFamily: "'DM Mono', monospace",
        fontWeight: "600",
        letterSpacing: "0.05em",
        cursor: isLocked ? "not-allowed" : "pointer",
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        boxShadow: isLocked ? "none" : "0 0 20px rgba(22,163,74,0.15)",
      }}
    >
      {isLocked && (
        <span style={{
          position: "absolute", inset: 0,
          borderRadius: "12px",
          background: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(220,38,38,0.03) 4px, rgba(220,38,38,0.03) 8px)",
        }} />
      )}
      {isLocked ? "🔒" : loading ? "⏳" : ""}
      {loading ? "Processing..." : children}
      {isLocked && lockReason && (
        <span style={{ fontSize: "11px", opacity: 0.7, marginLeft: "4px" }}>— {lockReason}</span>
      )}
    </button>
  );
}