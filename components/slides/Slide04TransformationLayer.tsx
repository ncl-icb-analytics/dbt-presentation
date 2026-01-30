"use client";

import { useState, useCallback } from "react";
import DAGVisualization from "../DAGVisualization";

export default function Slide04TransformationLayer() {
  const [animKey, setAnimKey] = useState(0);

  const handleReplay = useCallback(() => {
    setAnimKey(k => k + 1);
  }, []);

  return (
    <div className="slide" style={{ padding: "2rem 3rem 3.5rem", display: "flex", flexDirection: "column" }}>
      <h2 style={{ marginBottom: "0.5rem" }}>The transformation layer</h2>
      <p style={{ color: "#64748b", fontSize: "1rem", marginBottom: "1rem" }}>
        All of our work lives here — interconnected, interdependent.
      </p>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}>
          <div style={{
            background: "rgba(0,0,0,0.2)",
            borderRadius: "0.75rem",
            padding: "1rem",
          }}>
            <DAGVisualization key={animKey} mode="complex" animate={true} />
          </div>
          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}>
            <div style={{
              background: "rgba(59, 130, 246, 0.1)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              borderRadius: "0.5rem",
              padding: "1rem 1.25rem",
              minWidth: "180px",
            }}>
              <div style={{ color: "#93c5fd", fontWeight: 600, fontSize: "1rem", marginBottom: "0.25rem" }}>30+ analysts</div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>All contributing to this layer</div>
            </div>
            <div style={{
              background: "rgba(34, 197, 94, 0.1)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              borderRadius: "0.5rem",
              padding: "1rem 1.25rem",
              minWidth: "180px",
            }}>
              <div style={{ color: "#86efac", fontWeight: 600, fontSize: "1rem", marginBottom: "0.25rem" }}>Your work affects others</div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Changes ripple downstream</div>
            </div>
            <div style={{
              background: "rgba(249, 115, 22, 0.1)",
              border: "1px solid rgba(249, 115, 22, 0.3)",
              borderRadius: "0.5rem",
              padding: "1rem 1.25rem",
              minWidth: "180px",
            }}>
              <div style={{ color: "#fdba74", fontWeight: 600, fontSize: "1rem", marginBottom: "0.25rem" }}>We need shared tooling</div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>One framework, one workflow</div>
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
