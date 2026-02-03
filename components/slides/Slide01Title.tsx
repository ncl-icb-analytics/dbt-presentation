"use client";

import { motion } from "framer-motion";

export default function Slide01Title() {
  return (
    <div className="slide slide-center" style={{ position: "relative", overflow: "hidden" }}>
      {/* Subtle gradient background */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at 50% 30%, rgba(59, 130, 246, 0.06) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: "4rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: "1rem",
            color: "#f1f5f9",
          }}
        >
          Introduction to dbt
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: "1.6rem",
            fontWeight: 400,
            color: "#94a3b8",
            marginBottom: "3rem",
          }}
        >
          Bringing software engineering practices to analytics
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p style={{
            fontSize: "1.35rem",
            fontWeight: 500,
            color: "#e2e8f0",
          }}>
            Eddie Davison
          </p>
        </motion.div>

      </div>
    </div>
  );
}
