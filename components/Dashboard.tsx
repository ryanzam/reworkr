import { Job, JOB_ICONS, PRIORITY_COLORS } from "@/types";

interface DashboardProps {
    onSelectJob: (job: Job) => void;
}

const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Plumbing Repair",
    customerName: "John Smith",
    address: "123 Main St, Springfield",
    type: "plumbing",
    status: "in-progress",
    scheduledTime: "09:00 AM",
    lat: 40.7128,
    lng: -74.0060,
    geofenceRadius: 50,
    priority: "high",
    description: "Fix leaking kitchen faucet and inspect pipes",
    notes: "Customer requested morning visit",
    beforePhotos: [],
    afterPhotos: [],
  },
  {
    id: "2",
    title: "Electrical Installation",
    customerName: "Jane Doe",
    address: "456 Oak Ave, Springfield",
    type: "electrical",
    status: "pending",
    scheduledTime: "10:30 AM",
    lat: 40.7150,
    lng: -74.0070,
    geofenceRadius: 50,
    priority: "normal",
    description: "Install new outlet and lighting fixtures",
    notes: "Bring extra cable",
    beforePhotos: [],
    afterPhotos: [],
  },
  {
    id: "3",
    title: "Solar Panel Installation",
    customerName: "Bob Johnson",
    address: "789 Pine Rd, Springfield",
    type: "solar",
    status: "pending",
    scheduledTime: "02:00 PM",
    lat: 40.7100,
    lng: -74.0080,
    geofenceRadius: 50,
    priority: "urgent",
    description: "Annual furnace inspection and filter replacement",
    notes: "Key under mat",
    beforePhotos: [],
    afterPhotos: [],
  },
];

const Dashboard = ({ onSelectJob }: DashboardProps) => {
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{
        padding: "24px 20px 20px",
        background: "linear-gradient(180deg, rgba(22,163,74,0.08) 0%, transparent 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ fontSize: "11px", fontFamily: "monospace", letterSpacing: "0.2em", color: "rgba(22,163,74,0.7)", marginBottom: "6px" }}>
          TECHFIX AI · FIELD OPS
        </div>
        <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "700", color: "white", letterSpacing: "-0.02em" }}>
          Today's Schedule
        </h1>
        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginTop: "4px", fontFamily: "monospace" }}>
          {today}
        </div>
      </div>
      
      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", padding: "16px 20px" }}>
        {[
          { label: "TOTAL", value: "3", color: "rgba(255,255,255,0.6)" },
          { label: "PENDING", value: "2", color: "#fbbf24" },
          { label: "ACTIVE", value: "1", color: "#22c55e" },
        ].map(stat => (
          <div key={stat.label} style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "12px",
            padding: "12px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "22px", fontWeight: "800", color: stat.color, fontFamily: "monospace" }}>
              {stat.value}
            </div>
            <div style={{ fontSize: "9px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)", marginTop: "2px" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      
      {/* Job list */}
      <div style={{ padding: "0 20px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", fontFamily: "monospace", marginBottom: "4px" }}>
          ASSIGNED JOBS
        </div>
        {MOCK_JOBS.map((job, i) => {
          const pColors = PRIORITY_COLORS[job.priority as keyof typeof PRIORITY_COLORS];
          return (
            <button
              key={job.id}
              onClick={() => onSelectJob(job)}
              style={{
                width: "100%", textAlign: "left",
                background: "rgba(255,255,255,0.03)",
                border: `1px solid rgba(255,255,255,0.08)`,
                borderLeft: `3px solid ${pColors.border}`,
                borderRadius: "14px",
                padding: "16px",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex", flexDirection: "column", gap: "10px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "22px" }}>{JOB_ICONS[job.type as keyof typeof JOB_ICONS]}</span>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: "600", color: "white", letterSpacing: "-0.01em" }}>
                      {job.title}
                    </div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>
                      {job.customerName}
                    </div>
                  </div>
                </div>
                <div style={{
                  background: pColors.bg,
                  border: `1px solid ${pColors.border}`,
                  borderRadius: "6px",
                  padding: "3px 8px",
                  fontSize: "9px",
                  fontFamily: "monospace",
                  letterSpacing: "0.1em",
                  color: pColors.text,
                }}>
                  {job.priority.toUpperCase()}
                </div>
              </div>
              
              <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>
                <span>🕐 {job.scheduledTime}</span>
                <span>📍 {job.address.split(",")[0]}</span>
                <span>📏 {job.geofenceRadius}m zone</span>
              </div>
              
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: "1.5", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "10px" }}>
                {job.description}
              </div>
              
              {job.status === "in-progress" && (
                <div style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  fontSize: "11px", color: "#22c55e", fontFamily: "monospace",
                }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", animation: "blink 1s infinite", display: "inline-block" }}/>
                  IN PROGRESS
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard