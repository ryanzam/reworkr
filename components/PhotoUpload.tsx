import React, { useRef } from 'react'

const PhotoUpload = ({ label, photos, onAdd, isLocked, maxPhotos = 4 }: any) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (e: any) => {
        const files = Array.from(e.target.files);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target) {
                    onAdd({ id: Date.now() + Math.random(), url: ev.target.result, name: (file as File).name, queued: false });
                }
            };
            reader.readAsDataURL(file as File);
        });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                {photos.map((photo: any) => (
                    <div key={photo.id} style={{
                        aspectRatio: "1",
                        borderRadius: "10px",
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,0.1)",
                        position: "relative",
                    }}>
                        <img src={photo.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        {photo.queued && (
                            <div style={{
                                position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "10px", color: "#fbbf24", fontFamily: "monospace"
                            }}>
                                📡 QUEUED
                            </div>
                        )}
                    </div>
                ))}

                {photos.length < maxPhotos && (
                    <button
                        onClick={() => !isLocked && inputRef.current?.click()}
                        disabled={isLocked}
                        style={{
                            aspectRatio: "1",
                            borderRadius: "10px",
                            border: isLocked ? "1px dashed rgba(220,38,38,0.3)" : "1px dashed rgba(22,163,74,0.4)",
                            background: isLocked ? "rgba(220,38,38,0.04)" : "rgba(22,163,74,0.04)",
                            color: isLocked ? "rgba(252,165,165,0.4)" : "rgba(134,239,172,0.6)",
                            fontSize: "24px",
                            cursor: isLocked ? "not-allowed" : "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexDirection: "column", gap: "4px",
                        }}
                    >
                        📷
                        <span style={{ fontSize: "9px", fontFamily: "monospace" }}>
                            {isLocked ? "LOCKED" : "ADD"}
                        </span>
                    </button>
                )}
            </div>

            <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleFiles} style={{ display: "none" }} capture="environment" />

            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
                {photos.length}/{maxPhotos} photos · {label}
            </div>
        </div>
    );
}

export default PhotoUpload;