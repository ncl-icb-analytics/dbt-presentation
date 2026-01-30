"use client";

import { motion } from "framer-motion";

const requirements = [
  { name: "Data Scale", q: "How much data can be processed?", desc: "Analytical systems that scale up and down elastically, abstracting away the complexity of processing data sets of any size" },
  { name: "Collaboration Scale", q: "How many users can effectively collaborate?", desc: "Suitable for a single user and scales to arbitrarily many. Design considerations may change, but the fundamental workflow does not" },
  { name: "Accessibility", q: "How many types of users can use this system?", desc: "Brings different personas together to collaborate as peers" },
  { name: "Velocity", q: "How quickly can a user conduct a given unit of analysis?", desc: "Requires some overhead relative to ad-hoc work, but minimises this and injects velocity as requirements scale" },
  { name: "Correctness", q: "What is the likelihood that outputs are correct?", desc: "Not only produces correct results, but contains mechanisms to automatically validate correctness" },
  { name: "Auditability", q: "What changes have occurred to produce a result?", desc: "Artefacts with changes tracked and outputs reproducible at any point in time" },
  { name: "Governance", q: "Are the right people using data per all applicable rules?", desc: "Integrates governance directly and from the outset" },
  { name: "Criticality", q: "Can the business rely on the results?", desc: "Artefacts scale seamlessly from experimental to mission-critical without needing to be re-built" },
  { name: "Reliability", q: "Will the system operate without failure?", desc: "Systems resilient to failure with uptime SLAs that allow the business to depend on them" },
  { name: "Resilience", q: "Do errors result in massive or minimal business impact?", desc: "Errors are inevitable—anticipate them, minimise their impact, and remediate quickly" },
];

export default function Slide02Requirements() {
  return (
    <div className="slide" style={{ padding: "2rem 3rem", height: "100vh", minHeight: "auto", overflow: "hidden" }}>
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: "0.25rem" }}
      >
        Requirements of a Mature Analytics Workflow
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "0" }}
      >
        What characteristics should a mature analytics practice have?
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}
      >
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "1.25rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}>
          {requirements.map((req, i) => (
            <motion.div
              key={req.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              style={{
                background: "rgba(139, 92, 246, 0.1)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "0.5rem",
                padding: "1.25rem",
                minHeight: "150px",
              }}
            >
              <div style={{ color: "#c4b5fd", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                {req.name}
              </div>
              <div style={{ color: "#f97316", fontSize: "0.7rem", marginBottom: "0.4rem", fontStyle: "italic" }}>
                {req.q}
              </div>
              <div style={{ color: "#94a3b8", fontSize: "0.7rem", lineHeight: 1.5 }}>
                {req.desc}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ textAlign: "center", maxWidth: "700px", margin: "2.5rem auto 0" }}
        >
          <div style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6 }}>
            These are ambitious goals. Few organisations achieve all of them—but the pursuit drives real improvement in{" "}
            <span style={{ color: "#c4b5fd" }}>trust</span>,{" "}
            <span style={{ color: "#c4b5fd" }}>velocity</span>, and{" "}
            <span style={{ color: "#c4b5fd" }}>decision quality</span>.
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
