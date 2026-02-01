"use client";

import { motion } from "framer-motion";

const practices = [
  {
    practice: "Version control",
    before: "SQL scattered across tools, no history",
    after: "Every model in Git — tracked, reviewable, reversible",
    icon: "🔗",
  },
  {
    practice: "Modularity",
    before: "Copy-paste logic, definitions drift apart",
    after: "ref() creates reusable building blocks",
    icon: "🧱",
  },
  {
    practice: "Testing",
    before: "Manual spot checks, hope for the best",
    after: "Tests run on every build, fail before dashboards break",
    icon: "✅",
  },
  {
    practice: "Documentation",
    before: "Tribal knowledge, stale wikis",
    after: "Descriptions live with the code in YAML",
    icon: "📖",
  },
  {
    practice: "Environments",
    before: "Dev in prod, break things for users",
    after: "Separate dev/prod, deploy with confidence",
    icon: "🔀",
  },
  {
    practice: "Code review",
    before: "Changes go live without oversight",
    after: "PRs, peer review, approval gates",
    icon: "👀",
  },
];

export default function Slide03HowDbtHelps() {
  return (
    <div className="slide" style={{ padding: "2rem 3rem", height: "100vh", minHeight: "auto", overflow: "hidden" }}>
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: "0.25rem" }}
      >
        Software engineering practices → Analytics
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{ color: "#64748b", fontSize: "1.05rem", marginBottom: "0" }}
      >
        dbt makes these practices natural for SQL workflows.
      </motion.p>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {practices.map((item, i) => (
            <motion.div
              key={item.practice}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.08 }}
              style={{
                background: "rgba(0,0,0,0.2)",
                borderRadius: "0.6rem",
                padding: "1.25rem",
                borderLeft: "3px solid #f97316",
              }}
            >
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "0.5rem", 
                marginBottom: "0.75rem" 
              }}>
                <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                <span style={{ color: "#f97316", fontWeight: 600, fontSize: "1.15rem" }}>
                  {item.practice}
                </span>
              </div>
              
              <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: "0.5rem",
                fontSize: "1rem",
              }}>
                <div style={{ 
                  display: "flex", 
                  alignItems: "flex-start", 
                  gap: "0.5rem" 
                }}>
                  <span style={{ color: "#ef4444", flexShrink: 0 }}>✗</span>
                  <span style={{ color: "#94a3b8" }}>{item.before}</span>
                </div>
                <div style={{ 
                  display: "flex", 
                  alignItems: "flex-start", 
                  gap: "0.5rem" 
                }}>
                  <span style={{ color: "#22c55e", flexShrink: 0 }}>✓</span>
                  <span style={{ color: "#d1d5db" }}>{item.after}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
