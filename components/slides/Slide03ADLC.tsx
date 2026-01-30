"use client";

import { motion } from "framer-motion";

const buildPhases = [
  { name: "Plan", desc: "Validate business case, break into small iterations, identify downstream impacts, plan maintenance ownership, get stakeholder alignment before code" },
  { name: "Develop", desc: "Human-readable code as source of truth, consistent style guides, descriptive naming, peer review mandatory, use open standards to avoid lock-in" },
  { name: "Test", desc: "No production asset exists without tests. Unit tests for logic, data tests for quality, integration tests for compatibility. Culture, not just tooling" },
  { name: "Deploy", desc: "Triggered by merge, fully automated, zero downtime, instant rollback. Ship small changes frequently rather than big releases" },
];

const operatePhases = [
  { name: "Operate", desc: "24/7/365 availability, graceful failure recovery, architectural resilience over manual intervention, track operational metrics" },
  { name: "Observe", desc: "Catch errors before users do. Mature incident triage, real-time instrumentation, test in production—staging can't reveal everything" },
  { name: "Discover", desc: "Unified search to find any asset without gatekeepers, interact with data directly, user feedback loops back to planning" },
  { name: "Analyze", desc: "Generate business value. Validate data correctness, trace lineage, respect governance. Insights mature back into Plan → Develop cycle" },
];

export default function Slide03ADLC() {
  return (
    <div className="slide" style={{ padding: "2rem 3rem", height: "100vh", minHeight: "auto", overflow: "hidden" }}>
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: "0.25rem" }}
      >
        The Analytics Development Lifecycle
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "0" }}
      >
        A framework for applying software engineering practices to analytics workflows
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
        }}
      >
        {/* Build row */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            style={{ color: "#8b5cf6", fontSize: "0.75rem", fontWeight: 600, width: "45px" }}
          >
            BUILD
          </motion.span>
          {buildPhases.map((phase, i) => (
            <div key={phase.name} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <motion.div
                initial={{ opacity: 0, y: -30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.2 + i * 0.12,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                style={{
                  background: "rgba(139, 92, 246, 0.2)",
                  border: "1px solid #8b5cf6",
                  borderRadius: "0.5rem",
                  padding: "0.75rem 1rem",
                  textAlign: "center",
                  width: "190px",
                  height: "140px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <div style={{ color: "#c4b5fd", fontWeight: 600, fontSize: "1rem", marginBottom: "0.4rem" }}>{phase.name}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.6rem", lineHeight: 1.5 }}>{phase.desc}</div>
              </motion.div>
              {i < 3 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 + i * 0.12, duration: 0.3 }}
                  style={{ color: "#8b5cf6", fontSize: "1.25rem" }}
                >
                  →
                </motion.span>
              )}
            </div>
          ))}
        </div>

        {/* Curved arrows */}
        <div style={{ display: "flex", justifyContent: "space-between", width: "880px", padding: "0 4rem" }}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.45, duration: 0.4 }}
            style={{ color: "#f97316", fontSize: "1.25rem" }}
          >
            ↑
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            style={{ color: "#8b5cf6", fontSize: "1.25rem" }}
          >
            ↓
          </motion.span>
        </div>

        {/* Operate row */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.35, duration: 0.4 }}
            style={{ color: "#f97316", fontSize: "0.75rem", fontWeight: 600, width: "45px" }}
          >
            RUN
          </motion.span>
          {operatePhases.map((phase, i) => (
            <div key={phase.name} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.85 + (3 - i) * 0.12,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                style={{
                  background: "rgba(249, 115, 22, 0.15)",
                  border: "1px solid #f97316",
                  borderRadius: "0.5rem",
                  padding: "0.75rem 1rem",
                  textAlign: "center",
                  width: "190px",
                  height: "140px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <div style={{ color: "#fdba74", fontWeight: 600, fontSize: "1rem", marginBottom: "0.4rem" }}>{phase.name}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.6rem", lineHeight: 1.5 }}>{phase.desc}</div>
              </motion.div>
              {i < 3 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0 + (2 - i) * 0.12, duration: 0.3 }}
                  style={{ color: "#f97316", fontSize: "1.25rem" }}
                >
                  ←
                </motion.span>
              )}
            </div>
          ))}
        </div>

        {/* Link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.4 }}
          style={{ textAlign: "center", marginTop: "1rem" }}
        >
          <a
            href="https://www.getdbt.com/resources/the-analytics-development-lifecycle"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#f97316",
              fontSize: "0.75rem",
              textDecoration: "none",
            }}
          >
            Read the full ADLC framework →
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
