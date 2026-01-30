"use client";

import { useState, useCallback } from "react";
import DAGVisualization from "../DAGVisualization";

export default function Slide04TransformationLayer() {
  const [animKey, setAnimKey] = useState(0);

  const handleReplay = useCallback(() => {
    setAnimKey(k => k + 1);
  }, []);

  return (
    <div className="slide" style={{ padding: "2rem 3rem", height: "100vh", minHeight: "auto", overflow: "hidden" }}>
      <h2 style={{ marginBottom: "0.25rem" }}>The transformation layer</h2>
      <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "0" }}>
        All our transformations live here — interconnected and interdependent.
      </p>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}>
          <div style={{
            color: "#94a3b8",
            fontSize: "0.85rem",
            marginBottom: "0.5rem",
          }}>
            Each node is a transformation. Lines show dependencies — what must run first.
          </div>
          <div style={{
            background: "rgba(0,0,0,0.2)",
            borderRadius: "0.75rem",
            padding: "1rem",
          }}>
            <DAGVisualization key={animKey} mode="complex" animate={true} />
          </div>
          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}>
            <div style={{
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "0.5rem",
              padding: "1rem 1.25rem",
              width: "280px",
            }}>
              <div style={{ color: "#fca5a5", fontWeight: 600, fontSize: "1rem", marginBottom: "0.25rem" }}>What runs when?</div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Scheduling jobs in the right order is hard</div>
            </div>
            <div style={{
              background: "rgba(251, 191, 36, 0.1)",
              border: "1px solid rgba(251, 191, 36, 0.3)",
              borderRadius: "0.5rem",
              padding: "1rem 1.25rem",
              width: "280px",
            }}>
              <div style={{ color: "#fcd34d", fontWeight: 600, fontSize: "1rem", marginBottom: "0.25rem" }}>Did it work?</div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Errors cascade through downstream nodes</div>
            </div>
            <div style={{
              background: "rgba(249, 115, 22, 0.1)",
              border: "1px solid rgba(249, 115, 22, 0.3)",
              borderRadius: "0.5rem",
              padding: "1rem 1.25rem",
              width: "280px",
            }}>
              <div style={{ color: "#fdba74", fontWeight: 600, fontSize: "1rem", marginBottom: "0.25rem" }}>What will this break?</div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Impact of changes is hard to trace</div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleReplay}
        style={{
          position: "absolute",
          bottom: "5rem",
          right: "2rem",
          background: "#334155",
          border: "1px solid #475569",
          borderRadius: "0.375rem",
          padding: "0.4rem 0.75rem",
          color: "#94a3b8",
          fontSize: "0.8rem",
          cursor: "pointer",
        }}
      >
        Replay
      </button>
    </div>
  );
}
