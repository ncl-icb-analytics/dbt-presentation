"use client";

import { motion } from "framer-motion";

export default function Slide03Roles() {
  return (
    <div className="slide" style={{ padding: "1.5rem 2rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      {/* Header - shorter */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: "1.8rem", marginBottom: "1.8rem", textAlign: "center", fontWeight: 600 }}
      >
        Where{" "}
        <span style={{ color: "#a855f7" }}>data engineers</span>,{" "}
        <span style={{ color: "#f97316" }}>analytics engineers</span>, and{" "}
        <span style={{ color: "#22c55e" }}>data analysts</span>{" "}
        <span style={{ color: "#94a3b8", fontWeight: 400 }}>collaborate.</span>
      </motion.h2>

      {/* Main flow */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
        {/* Raw Data - Data Engineers domain */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: "rgba(168, 85, 247, 0.1)",
            border: "1px solid rgba(168, 85, 247, 0.3)",
            borderRadius: "0.5rem",
            padding: "1.25rem",
            width: "180px",
          }}
        >
          <div style={{ color: "#a855f7", fontSize: "1.1rem", fontWeight: 600, marginBottom: "1.2rem" }}>
            Raw Data Sources
          </div>
          {["EPR Systems", "SUS+ Data", "Reference Data", "CSV Extracts", "HL7 Feeds"].map((source, i) => (
            <motion.div
              key={source}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              style={{
                padding: "0.4rem 0.6rem",
                marginBottom: "0.35rem",
                background: "rgba(168, 85, 247, 0.15)",
                borderRadius: "0.3rem",
                fontSize: "0.9rem",
                color: "#d8b4fe",
                fontFamily: "monospace",
              }}
            >
              {source}
            </motion.div>
          ))}
        </motion.div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          style={{ color: "#64748b", fontSize: "2rem" }}
        >
          →
        </motion.div>

        {/* Collaborative zone - just dbt, bigger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            background: "linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(34, 197, 94, 0.08) 100%)",
            border: "2px dashed rgba(249, 115, 22, 0.4)",
            borderRadius: "0.75rem",
            padding: "1.5rem",
            paddingTop: "2.5rem",
            position: "relative",
          }}
        >
          {/* Collaboration label */}
          <div style={{
            position: "absolute",
            top: "0.6rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}>
            <span style={{ color: "#f97316", fontSize: "0.65rem" }}>●</span>
            <span style={{ color: "#22c55e", fontSize: "0.65rem" }}>●</span>
            <span style={{ color: "#94a3b8", fontSize: "0.9rem", fontWeight: 500 }}>Collaborate in dbt</span>
          </div>

          {/* dbt transformation - bigger */}
          <div style={{
            background: "rgba(249, 115, 22, 0.1)",
            border: "1px solid rgba(249, 115, 22, 0.3)",
            borderRadius: "0.5rem",
            padding: "1.25rem",
            width: "280px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "3rem", fontWeight: 700, color: "#f97316", marginBottom: "0.25rem", letterSpacing: "-2px" }}>
              dbt
            </div>
            <div style={{ color: "#94a3b8", fontSize: "1rem", marginBottom: "1.2rem" }}>
              Transformation Layer
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem 1rem", textAlign: "left" }}>
              {[
                { label: "Modular SQL", color: "#f97316" },
                { label: "Testing", color: "#22c55e" },
                { label: "Documentation", color: "#3b82f6" },
                { label: "Lineage", color: "#eab308" },
                { label: "Version Control", color: "#a855f7" },
                { label: "Observability", color: "#c084fc" },
              ].map(({ label, color }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color }} />
                  <span style={{ color: "#cbd5e1", fontSize: "0.85rem" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          style={{ color: "#64748b", fontSize: "2rem" }}
        >
          →
        </motion.div>

        {/* Analytics Ready - simple output */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: "160px",
          }}
        >
          <div style={{ color: "#22c55e", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.35rem" }}>
            Analytics Ready
          </div>
          {["Population Health", "Waiting Lists", "RTT Metrics", "Activity Dashboards", "Quality Indicators"].map((output, i) => (
            <motion.div
              key={output}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.05 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span style={{ color: "#22c55e", fontSize: "1rem" }}>✓</span>
              <span style={{ color: "#86efac", fontSize: "0.75rem" }}>{output}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Role labels - continuous gradient line */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1.5rem" }}
      >
        <div style={{
          width: "600px",
          height: "4px",
          background: "linear-gradient(90deg, #a855f7 0%, #a855f7 25%, #f97316 50%, #22c55e 75%, #22c55e 100%)",
          borderRadius: "2px",
          marginBottom: "0.75rem",
        }} />
        <div style={{ display: "flex", justifyContent: "space-between", width: "600px" }}>
          <div style={{ textAlign: "center", flex: 1 }}>
            <span style={{ color: "#a855f7", fontSize: "1rem", fontWeight: 600 }}>Data Engineers</span>
            <div style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "0.3rem" }}>Ingest & infrastructure</div>
          </div>
          <div style={{ textAlign: "center", flex: 1 }}>
            <span style={{ color: "#f97316", fontSize: "1rem", fontWeight: 600 }}>Analytics Engineers</span>
            <div style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "0.3rem" }}>Build foundational layer</div>
          </div>
          <div style={{ textAlign: "center", flex: 1 }}>
            <span style={{ color: "#22c55e", fontSize: "1rem", fontWeight: 600 }}>Data Analysts</span>
            <div style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "0.3rem" }}>Business logic & user-facing analytics</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
