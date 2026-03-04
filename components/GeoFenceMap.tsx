import { MapContainer, TileLayer, Circle, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png' });

export function GeofenceMap({ job, userPos, isInside, distance }: { job: any, userPos: { lat: number; lng: number } | null, isInside: boolean, distance: number | null }) {
    const centerX = 200, centerY = 150;
    const mapScale = 0.8; // pixels per meter factor
    const radiusPx = Math.min(job.geofenceRadius * mapScale, 90);

    // User dot position (offset from center)
    const userOffsetPx = distance ? Math.min(distance * mapScale, 160) : 0;
    const userX = isInside ? centerX + (userOffsetPx * 0.3) : centerX + userOffsetPx * 0.7;
    const userY = isInside ? centerY - (userOffsetPx * 0.1) : centerY - userOffsetPx * 0.5;

    return (
        <div style={{
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            overflow: "hidden",
            position: "relative",
        }}>
            {/* Map grid background */}
            <svg width="100%" viewBox="0 0 400 300" style={{ display: "block" }}>
                <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                    </pattern>
                    <radialGradient id="mapGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(20,30,50,0.9)" />
                        <stop offset="100%" stopColor="rgba(10,15,30,0.95)" />
                    </radialGradient>
                    <radialGradient id="glowGreen" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(22,163,74,0.3)" />
                        <stop offset="100%" stopColor="rgba(22,163,74,0)" />
                    </radialGradient>
                    <radialGradient id="glowRed" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(220,38,38,0.3)" />
                        <stop offset="100%" stopColor="rgba(220,38,38,0)" />
                    </radialGradient>
                </defs>

                {/* Background */}
                <rect width="400" height="300" fill="url(#mapGrad)" />
                <rect width="400" height="300" fill="url(#grid)" />

                {/* Simulated streets */}
                {[
                    "M 0 100 L 400 100", "M 0 200 L 400 200",
                    "M 100 0 L 100 300", "M 250 0 L 250 300",
                    "M 350 0 L 350 300", "M 0 50 L 200 50",
                    "M 150 150 L 400 250"
                ].map((d, i) => (
                    <path key={i} d={d} stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" />
                ))}
                {[
                    "M 0 100 L 400 100", "M 0 200 L 400 200",
                    "M 100 0 L 100 300", "M 250 0 L 250 300",
                ].map((d, i) => (
                    <path key={`c${i}`} d={d} stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                ))}

                {/* Glow behind geofence */}
                <circle cx={centerX} cy={centerY} r={radiusPx + 40} fill={isInside ? "url(#glowGreen)" : "url(#glowRed)"} opacity="0.6" />

                {/* Geofence circle */}
                <circle
                    cx={centerX} cy={centerY} r={radiusPx}
                    fill={isInside ? "rgba(22,163,74,0.1)" : "rgba(220,38,38,0.08)"}
                    stroke={isInside ? "#16a34a" : "#dc2626"}
                    strokeWidth="2"
                    strokeDasharray={isInside ? "0" : "6 3"}
                />

                {/* Pulse ring */}
                <circle
                    cx={centerX} cy={centerY} r={radiusPx}
                    fill="none"
                    stroke={isInside ? "#22c55e" : "#ef4444"}
                    strokeWidth="1"
                    opacity="0.4"
                    style={{ animation: "mapPulse 2s ease-out infinite" }}
                />

                {/* Job pin */}
                <g transform={`translate(${centerX},${centerY})`}>
                    <circle r="8" fill={isInside ? "#16a34a" : "#dc2626"} />
                    <circle r="4" fill="white" />
                    <line x1="0" y1="-8" x2="0" y2="-20" stroke={isInside ? "#16a34a" : "#dc2626"} strokeWidth="2" />
                    <polygon points="-6,-20 6,-20 0,-32" fill={isInside ? "#16a34a" : "#dc2626"} />
                    <circle cx="0" cy="-26" r="3" fill="white" />
                </g>

                {/* User position dot */}
                {userPos && (
                    <g transform={`translate(${userX},${userY})`}>
                        <circle r="12" fill="rgba(59,130,246,0.2)" style={{ animation: "mapPulse 1.5s ease-out infinite" }} />
                        <circle r="7" fill="#3b82f6" stroke="white" strokeWidth="2" />
                        <circle r="3" fill="white" />
                    </g>
                )}

                {/* Distance line */}
                {!isInside && userPos && (
                    <line
                        x1={centerX} y1={centerY}
                        x2={userX} y2={userY}
                        stroke="rgba(250,204,21,0.4)" strokeWidth="1" strokeDasharray="4 3"
                    />
                )}

                {/* Compass */}
                <g transform="translate(370,25)">
                    <circle r="14" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.1)" />
                    <text x="0" y="5" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace">N</text>
                    <line x1="0" y1="-8" x2="0" y2="-12" stroke="#ef4444" strokeWidth="1.5" />
                    <line x1="0" y1="8" x2="0" y2="12" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                </g>
            </svg>

            {/* Distance badge overlay */}
            <div style={{
                position: "absolute", bottom: "12px", left: "12px",
                background: isInside ? "rgba(22,163,74,0.9)" : "rgba(220,38,38,0.9)",
                backdropFilter: "blur(8px)",
                border: `1px solid ${isInside ? "#16a34a" : "#dc2626"}`,
                borderRadius: "20px",
                padding: "4px 12px",
                fontSize: "12px",
                fontFamily: "monospace",
                fontWeight: "700",
                color: "white",
                letterSpacing: "0.05em",
            }}>
                {isInside ? `✓ Inside job zone` : `⚠ ${distance}m away`}
            </div>

            {/* Map attribution */}
            <div style={{
                position: "absolute", bottom: "12px", right: "12px",
                fontSize: "10px", color: "rgba(255,255,255,0.2)", fontFamily: "monospace"
            }}>
                SIM MAP
            </div>
        </div>
    );
}