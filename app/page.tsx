import CompleteView from "@/components/CompleteView";
import Dashboard from "@/components/Dashboard";
import JobView from "@/components/JobView";
import { useState } from "react";

type Job = {
  id: string;
  title: string;
  description: string;
};

type CompleteData = {
    job: any;
    startTime: Date;
    notes: string;
    beforePhotos: string[];
    afterPhotos: string[];
}

export default function Home() {

  const [view, setView] = useState("dashboard"); // dashboard | job | complete
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [completeData, setCompleteData] = useState<CompleteData | null>(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080c12",
      color: "white",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      maxWidth: "480px",
      margin: "0 auto",
      position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500;600;700&display=swap');
        
        @keyframes mapPulse {
          0% { opacity: 0.6; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.4); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes slideDown {
          from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        button:hover:not(:disabled) { opacity: 0.85; }
        textarea:focus { outline: none; border-color: rgba(22,163,74,0.3) !important; }
        * { box-sizing: border-box; }
        
        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>

      {/* Ambient background glow */}
      <div style={{
        position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "600px", height: "300px",
        background: "radial-gradient(ellipse, rgba(22,163,74,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {view === "dashboard" && (
          <Dashboard onSelectJob={(job) => { setSelectedJob(job); setView("job"); }} />
        )}
        {view === "job" && selectedJob && (
          <JobView
            job={selectedJob}
            onBack={() => setView("dashboard")}
            onComplete={(data) => { setCompleteData(data); setView("complete"); }}
          />
        )}
        {view === "complete" && completeData && (
          <CompleteView data={completeData} onBack={() => setView("dashboard")} />
        )}
      </div>
    </div>
  );
}
