"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Slide02StoredProcs() {
  const [step, setStep] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (step >= 7) return;
    const delays = [600, 500, 500, 500, 500, 500, 800];
    const timer = setTimeout(() => setStep(s => s + 1), delays[step] || 500);
    return () => clearTimeout(timer);
  }, [step, key]);

  const replay = () => {
    setStep(0);
    setKey(k => k + 1);
  };

  return (
    <div className="slide" style={{ padding: "2rem 3rem", height: "100vh", minHeight: "auto", overflow: "hidden" }}>
      <h2 style={{ marginBottom: "0.25rem" }}>The classic data pipeline</h2>
      <p style={{ color: "#64748b", fontSize: "1.05rem", marginBottom: "0" }}>
        From source data to dashboard — the traditional approach with stored procedures.
      </p>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1.5rem" }}>
        <svg width="1050" height="300" viewBox="0 0 1050 300" style={{ overflow: "visible" }}>
          {/*
            Layout: Sources(40-180) -> Ingestion(260-380) -> Staging(440-560) -> Transform(620-750) -> Marts(810-920) -> Output(970-1030)
            All boxes vertically centered around y=150
          */}

          {/* Connection lines - Sources to Ingestion (converge to center) */}
          <motion.line x1="180" y1="65" x2="260" y2="140"
            stroke="#475569" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: step >= 1 ? 1 : 0, opacity: step >= 1 ? 0.5 : 0 }}
            transition={{ duration: 0.4 }}
          />
          <motion.line x1="180" y1="145" x2="260" y2="150"
            stroke="#475569" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: step >= 1 ? 1 : 0, opacity: step >= 1 ? 0.5 : 0 }}
            transition={{ duration: 0.4 }}
          />
          <motion.line x1="180" y1="225" x2="260" y2="160"
            stroke="#475569" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: step >= 1 ? 1 : 0, opacity: step >= 1 ? 0.5 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Ingestion to Staging */}
          <motion.line x1="380" y1="150" x2="440" y2="150"
            stroke="#475569" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: step >= 2 ? 1 : 0, opacity: step >= 2 ? 0.5 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Staging to Transform (fan out) */}
          <motion.line x1="560" y1="135" x2="620" y2="56"
            stroke="#475569" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: step >= 3 ? 1 : 0, opacity: step >= 3 ? 0.5 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.line x1="560" y1="145" x2="620" y2="116"
            stroke="#475569" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: step >= 3 ? 1 : 0, opacity: step >= 3 ? 0.5 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.line x1="560" y1="155" x2="620" y2="176"
            stroke="#475569" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: step >= 3 ? 1 : 0, opacity: step >= 3 ? 0.5 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.line x1="560" y1="165" x2="620" y2="236"
            stroke="#475569" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: step >= 3 ? 1 : 0, opacity: step >= 3 ? 0.5 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Transform to Marts (converge) */}
          <motion.line x1="750" y1="56" x2="810" y2="130"
            stroke="#475569" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: step >= 4 ? 1 : 0, opacity: step >= 4 ? 0.5 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.line x1="750" y1="116" x2="810" y2="140"
            stroke="#475569" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: step >= 4 ? 1 : 0, opacity: step >= 4 ? 0.5 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.line x1="750" y1="176" x2="810" y2="160"
            stroke="#475569" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: step >= 4 ? 1 : 0, opacity: step >= 4 ? 0.5 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.line x1="750" y1="236" x2="810" y2="170"
            stroke="#475569" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: step >= 4 ? 1 : 0, opacity: step >= 4 ? 0.5 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Marts to Output */}
          <motion.line x1="920" y1="150" x2="970" y2="150"
            stroke="#475569" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: step >= 5 ? 1 : 0, opacity: step >= 5 ? 0.5 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* SOURCES - x: 40-180, centers at y: 65, 145, 225 */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: step >= 0 ? 1 : 0.3 }} transition={{ duration: 0.4 }}>
            <text x="110" y="18" fill="#64748b" fontSize="11" fontWeight="600" letterSpacing="0.08em" textAnchor="middle">SOURCES</text>
            <rect x="40" y="40" width="140" height="50" rx="6" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="110" y="70" fill="#93c5fd" fontSize="12" fontFamily="var(--font-mono)" textAnchor="middle">Fingertips API</text>
            <rect x="40" y="120" width="140" height="50" rx="6" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="110" y="150" fill="#93c5fd" fontSize="12" fontFamily="var(--font-mono)" textAnchor="middle">ONS Data</text>
            <rect x="40" y="200" width="140" height="50" rx="6" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="110" y="230" fill="#93c5fd" fontSize="12" fontFamily="var(--font-mono)" textAnchor="middle">GP Extracts</text>
          </motion.g>

          {/* INGESTION - x: 260-380, center at y: 150 */}
          <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: step >= 1 ? 1 : 0.3, y: step >= 1 ? 0 : 8 }} transition={{ duration: 0.4 }}>
            <text x="320" y="100" fill="#64748b" fontSize="11" fontWeight="600" letterSpacing="0.08em" textAnchor="middle">INGESTION</text>
            <rect x="260" y="115" width="120" height="70" rx="6" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x="320" y="148" fill="#c4b5fd" fontSize="12" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="600">sp_load_*</text>
            <text x="320" y="168" fill="#64748b" fontSize="10" textAnchor="middle">Stored Procs</text>
          </motion.g>

          {/* STAGING - x: 440-560, center at y: 150 */}
          <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: step >= 2 ? 1 : 0.3, y: step >= 2 ? 0 : 8 }} transition={{ duration: 0.4 }}>
            <text x="500" y="100" fill="#64748b" fontSize="11" fontWeight="600" letterSpacing="0.08em" textAnchor="middle">STAGING</text>
            <rect x="440" y="115" width="120" height="70" rx="6" fill="rgba(234, 179, 8, 0.1)" stroke="#eab308" strokeWidth="1.5" />
            <text x="500" y="148" fill="#fde047" fontSize="12" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="500">stg_*</text>
            <text x="500" y="168" fill="#64748b" fontSize="10" textAnchor="middle">Raw Tables</text>
          </motion.g>

          {/* TRANSFORM - x: 620-750, centers at y: 56, 116, 176, 236 */}
          <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: step >= 3 ? 1 : 0.3, y: step >= 3 ? 0 : 8 }} transition={{ duration: 0.4 }}>
            <text x="685" y="18" fill="#64748b" fontSize="11" fontWeight="600" letterSpacing="0.08em" textAnchor="middle">TRANSFORM</text>
            <rect x="620" y="35" width="130" height="42" rx="6" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x="685" y="61" fill="#c4b5fd" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">sp_build_dims</text>
            <rect x="620" y="95" width="130" height="42" rx="6" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x="685" y="121" fill="#c4b5fd" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">sp_build_facts</text>
            <rect x="620" y="155" width="130" height="42" rx="6" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x="685" y="181" fill="#c4b5fd" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">sp_build_pmi</text>
            <rect x="620" y="215" width="130" height="42" rx="6" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x="685" y="241" fill="#c4b5fd" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">sp_calc_agg</text>
          </motion.g>

          {/* MARTS - x: 810-920, center at y: 150 */}
          <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: step >= 4 ? 1 : 0.3, y: step >= 4 ? 0 : 8 }} transition={{ duration: 0.4 }}>
            <text x="865" y="100" fill="#64748b" fontSize="11" fontWeight="600" letterSpacing="0.08em" textAnchor="middle">MARTS</text>
            <rect x="810" y="115" width="110" height="70" rx="6" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="1.5" />
            <text x="865" y="145" fill="#86efac" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">dim_*, fct_*</text>
            <text x="865" y="165" fill="#86efac" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">rpt_*</text>
          </motion.g>

          {/* OUTPUT - x: 970-1040, center at y: 150 (aligned with Marts) */}
          <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: step >= 5 ? 1 : 0.3, y: step >= 5 ? 0 : 8 }} transition={{ duration: 0.4 }}>
            <text x="1005" y="100" fill="#64748b" fontSize="11" fontWeight="600" letterSpacing="0.08em" textAnchor="middle">OUTPUT</text>
            <rect x="970" y="115" width="70" height="70" rx="6" fill="rgba(249, 115, 22, 0.1)" stroke="#f97316" strokeWidth="1.5" />
            <text x="1005" y="155" fill="#fdba74" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">Dashboard</text>
          </motion.g>
        </svg>

        {/* Bottom message */}
        <motion.div
          key={`msg-${key}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: step >= 6 ? 1 : 0, y: step >= 6 ? 0 : 10 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginTop: "0.5rem" }}
        >
          <p style={{ color: "#e2e8f0", fontSize: "1.3rem", fontWeight: 500 }}>
            Clear, logical, familiar SQL. This works well at small scale.
          </p>
        </motion.div>
      </div>

      <button
        onClick={replay}
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
