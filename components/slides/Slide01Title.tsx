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
            fontSize: "3.25rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: "0.75rem",
            color: "#f1f5f9",
          }}
        >
          dbt: A Framework for SQL Transformations
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: "1.35rem",
            fontWeight: 400,
            color: "#94a3b8",
            marginBottom: "2.5rem",
          }}
        >
          How it works and when it helps
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p style={{
            fontSize: "1.15rem",
            fontWeight: 500,
            color: "#e2e8f0",
          }}>
            Eddie Davison
          </p>
        </motion.div>

        {/* Keyboard navigation hint */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            color: "#475569",
            fontSize: "0.9rem",
          }}
        >
          <span>Press</span>
          <motion.div
            style={{
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <kbd style={{
              padding: "0.4rem 0.7rem",
              background: "rgba(51, 65, 85, 0.5)",
              border: "1px solid #475569",
              borderRadius: "6px",
              fontSize: "0.85rem",
              color: "#94a3b8",
              boxShadow: "0 2px 0 #1e293b",
            }}>
              ←
            </kbd>
            <motion.kbd
              animate={{
                boxShadow: ["0 2px 0 #1e293b", "0 1px 0 #1e293b", "0 2px 0 #1e293b"],
                y: [0, 1, 0],
              }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              style={{
                padding: "0.4rem 0.7rem",
                background: "rgba(59, 130, 246, 0.2)",
                border: "1px solid #3b82f6",
                borderRadius: "6px",
                fontSize: "0.85rem",
                color: "#93c5fd",
                boxShadow: "0 2px 0 #1e293b",
              }}
            >
              →
            </motion.kbd>
          </motion.div>
          <span>to navigate</span>
        </motion.div>
      </div>
    </div>
  );
}
