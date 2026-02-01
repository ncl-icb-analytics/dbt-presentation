"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export default function Slide03RequirementsGrow() {
  const [animKey, setAnimKey] = useState(0);
  const [explosionStep, setExplosionStep] = useState(0);

  // Explosion animation
  useEffect(() => {
    if (explosionStep >= 4) return;
    const timer = setTimeout(() => setExplosionStep(s => s + 1), 800);
    return () => clearTimeout(timer);
  }, [explosionStep, animKey]);

  const handleReplay = useCallback(() => {
    setAnimKey(k => k + 1);
    setExplosionStep(0);
  }, []);

  const boxW = 135;
  const boxH = 40;
  const procedures = [
    { id: "sp1", label: "sp_load_api", x: 0, y: 70 },
    { id: "sp2", label: "sp_load_ons", x: 0, y: 150 },
    { id: "sp3", label: "sp_load_gp", x: 0, y: 230 },
    { id: "sp4", label: "sp_stage_pop", x: 190, y: 30, step: 1 },
    { id: "sp5", label: "sp_stage_bp", x: 190, y: 100, step: 1 },
    { id: "sp6", label: "sp_stage_gp", x: 190, y: 170, step: 1 },
    { id: "sp7", label: "sp_stage_demo", x: 190, y: 240, step: 1 },
    { id: "sp8", label: "sp_build_dim_geo", x: 390, y: 0, step: 2 },
    { id: "sp9", label: "sp_build_dim_time", x: 390, y: 60, step: 2 },
    { id: "sp10", label: "sp_build_dim_org", x: 390, y: 120, step: 2 },
    { id: "sp11", label: "sp_build_fct_bp", x: 390, y: 180, step: 2 },
    { id: "sp12", label: "sp_build_fct_pmi", x: 390, y: 240, step: 2 },
    { id: "sp13", label: "sp_agg_region", x: 590, y: 50, step: 3 },
    { id: "sp14", label: "sp_agg_national", x: 590, y: 120, step: 3 },
    { id: "sp15", label: "sp_build_rpt", x: 590, y: 190, step: 3 },
  ];

  const connections = [
    { from: "sp1", to: "sp4" }, { from: "sp1", to: "sp5" },
    { from: "sp2", to: "sp4" }, { from: "sp2", to: "sp7" },
    { from: "sp3", to: "sp6" }, { from: "sp3", to: "sp7" },
    { from: "sp4", to: "sp8" }, { from: "sp4", to: "sp10" },
    { from: "sp5", to: "sp11" }, { from: "sp5", to: "sp9" },
    { from: "sp6", to: "sp10" }, { from: "sp6", to: "sp12" },
    { from: "sp7", to: "sp8" }, { from: "sp7", to: "sp11" }, { from: "sp7", to: "sp12" },
    { from: "sp8", to: "sp13" }, { from: "sp9", to: "sp13" }, { from: "sp9", to: "sp14" },
    { from: "sp10", to: "sp14" }, { from: "sp10", to: "sp15" },
    { from: "sp11", to: "sp13" }, { from: "sp11", to: "sp15" },
    { from: "sp12", to: "sp14" }, { from: "sp12", to: "sp15" },
  ];

  const getProc = (id: string) => procedures.find(p => p.id === id);

  return (
    <div className="slide" style={{ padding: "2rem 3rem", height: "100vh", minHeight: "auto", overflow: "hidden" }}>
      <h2 style={{ marginBottom: "0.25rem" }}>Then requirements grow...</h2>
      <p style={{ color: "#64748b", fontSize: "1.05rem", marginBottom: "0" }}>
        More sources, more procedures, more dependencies to track.
      </p>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", width: "100%" }}>
          <svg width="100%" height="320" viewBox="0 0 750 300" preserveAspectRatio="xMidYMid meet" style={{ maxWidth: "900px" }}>
            {connections.map((conn, i) => {
              const from = getProc(conn.from);
              const to = getProc(conn.to);
              if (!from || !to) return null;
              const toStep = to.step || 0;
              const show = explosionStep >= toStep;
              return (
                <motion.line
                  key={`conn-${i}`}
                  x1={from.x + boxW} y1={from.y + boxH / 2}
                  x2={to.x} y2={to.y + boxH / 2}
                  stroke="#8b5cf6"
                  strokeWidth="1.5"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: show ? 0.35 : 0, pathLength: show ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              );
            })}

            {procedures.map((proc) => {
              const show = explosionStep >= (proc.step || 0);
              return (
                <motion.g
                  key={proc.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: show ? 1 : 0.15, scale: show ? 1 : 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <rect
                    x={proc.x} y={proc.y}
                    width={boxW} height={boxH} rx="6"
                    fill="rgba(139, 92, 246, 0.1)"
                    stroke="#8b5cf6"
                    strokeWidth="1.5"
                  />
                  <text
                    x={proc.x + boxW / 2} y={proc.y + boxH / 2 + 4}
                    fill="#c4b5fd"
                    fontSize="11"
                    fontFamily="var(--font-mono)"
                    textAnchor="middle"
                  >
                    {proc.label}
                  </text>
                </motion.g>
              );
            })}
          </svg>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: explosionStep >= 4 ? 1 : 0, y: explosionStep >= 4 ? 0 : 10 }}
            style={{ textAlign: "center" }}
          >
            <p style={{ color: "#e2e8f0", fontSize: "1.35rem", fontWeight: 500, marginBottom: "0.6rem" }}>
              At this scale, things get hard to manage.
            </p>
            <p style={{ color: "#94a3b8", fontSize: "1.2rem" }}>
              Execution order. Error handling. Change tracking. Testing.
            </p>
          </motion.div>
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
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Replay
      </button>
    </div>
  );
}
