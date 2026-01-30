"use client";

import { motion } from "framer-motion";

const features = [
  { label: "Models", desc: "SQL files that define transformations", color: "#3b82f6" },
  { label: "Sources", desc: "Document where raw data lives", color: "#f97316" },
  { label: "ref() & source()", desc: "Declare dependencies, build order automatic", color: "#22c55e" },
  { label: "Tests", desc: "Quality gates before dashboards", color: "#eab308" },
  { label: "Documentation", desc: "Generated from the code itself", color: "#06b6d4" },
  { label: "Semantic models", desc: "Snowflake semantic views for Cortex AI", color: "#8b5cf6" },
  { label: "Incremental models", desc: "Only process new/changed data", color: "#ec4899" },
  { label: "Snapshots", desc: "Type 2 SCD built-in", color: "#a855f7" },
];

export default function Slide23Recap() {
  return (
    <div className="slide" style={{ padding: "2.5rem 4rem" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>What we covered</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.75rem",
      }}>
        {features.map((feature, i) => (
          <motion.div
            key={feature.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.6rem 1rem",
              background: "rgba(0,0,0,0.2)",
              borderRadius: "0.5rem",
              borderLeft: `3px solid ${feature.color}`,
            }}
          >
            <div>
              <span style={{ color: feature.color, fontWeight: 600, fontSize: "0.95rem" }}>
                {feature.label}
              </span>
              <span style={{ color: "#94a3b8", fontSize: "0.85rem", marginLeft: "0.5rem" }}>
                — {feature.desc}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          marginTop: "1.5rem",
          fontSize: "1.1rem",
          color: "#94a3b8",
          textAlign: "center",
        }}
      >
        Start with <span style={{ color: "#f97316" }}>sources</span>, <span style={{ color: "#22c55e" }}>ref()</span>, and <span style={{ color: "#eab308" }}>tests</span>. Add the rest as you scale.
      </motion.p>
    </div>
  );
}
