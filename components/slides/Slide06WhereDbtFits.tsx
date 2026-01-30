"use client";

import { motion } from "framer-motion";

export default function Slide08WhereDbtFits() {
  return (
    <div className="slide" style={{ padding: "2.5rem 3rem" }}>
      <h2 style={{ marginBottom: "2rem" }}>Where dbt fits</h2>

      {/* ELT Pipeline visualization */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
        gap: "0",
        marginBottom: "2rem",
      }}>
        {/* E+L - Extract & Load */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: "rgba(100, 116, 139, 0.2)",
            border: "1px solid #475569",
            borderRadius: "0.75rem 0 0 0.75rem",
            padding: "1.5rem 2rem",
            textAlign: "center",
            minWidth: "280px",
          }}
        >
          <div style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#64748b",
            marginBottom: "0.5rem",
          }}>E + L</div>
          <div style={{ fontSize: "1rem", color: "#94a3b8", marginBottom: "0.75rem" }}>Extract & Load</div>
          <div style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6, marginBottom: "0.75rem" }}>
            Azure Data Factory, APIs, SSIS<br />
            Into Snowflake as raw tables
          </div>
          <div style={{
            fontSize: "0.8rem",
            color: "#94a3b8",
            background: "rgba(100, 116, 139, 0.3)",
            padding: "0.4rem 0.75rem",
            borderRadius: "0.25rem",
            display: "inline-block",
          }}>
            Data Engineering
          </div>
        </motion.div>

        {/* T - Transform (highlighted) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            background: "linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(249, 115, 22, 0.05))",
            border: "2px solid #f97316",
            borderRadius: "0 0.75rem 0.75rem 0",
            padding: "1.5rem 2.5rem",
            textAlign: "center",
            minWidth: "280px",
            position: "relative",
          }}
        >
          <div style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#f97316",
            marginBottom: "0.5rem",
          }}>T</div>
          <div style={{ fontSize: "1rem", color: "#fb923c", marginBottom: "0.75rem" }}>Transform</div>
          <div style={{
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "#f97316",
            padding: "0.5rem 1rem",
            background: "rgba(249, 115, 22, 0.1)",
            borderRadius: "0.5rem",
            marginBottom: "0.75rem",
          }}>
            dbt
          </div>
          <div style={{
            fontSize: "0.8rem",
            color: "#fb923c",
            background: "rgba(249, 115, 22, 0.15)",
            padding: "0.4rem 0.75rem",
            borderRadius: "0.25rem",
            display: "inline-block",
          }}>
            Analysts + Analytics Engineers
          </div>
        </motion.div>
      </div>

      {/* Collaborative framing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          gap: "1.5rem",
          padding: "1.25rem 1.5rem",
          background: "rgba(0,0,0,0.2)",
          borderRadius: "0.75rem",
          marginBottom: "1.25rem",
        }}
      >
        <div style={{
          flex: 1,
          maxWidth: "280px",
          padding: "1rem",
          background: "rgba(59, 130, 246, 0.1)",
          borderRadius: "0.5rem",
          border: "1px solid rgba(59, 130, 246, 0.3)",
        }}>
          <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#3b82f6", marginBottom: "0.4rem" }}>
            You already know SQL
          </div>
          <div style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.5 }}>
            dbt models are just SELECT statements. No new language to learn.
          </div>
        </div>

        <div style={{
          flex: 1,
          maxWidth: "280px",
          padding: "1rem",
          background: "rgba(249, 115, 22, 0.1)",
          borderRadius: "0.5rem",
          border: "1px solid rgba(249, 115, 22, 0.3)",
        }}>
          <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#f97316", marginBottom: "0.4rem" }}>
            dbt is a framework
          </div>
          <div style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.5 }}>
            It wraps your SQL with testing, versioning, documentation, and dependency management.
          </div>
        </div>

        <div style={{
          flex: 1,
          maxWidth: "280px",
          padding: "1rem",
          background: "rgba(34, 197, 94, 0.1)",
          borderRadius: "0.5rem",
          border: "1px solid rgba(34, 197, 94, 0.3)",
        }}>
          <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#22c55e", marginBottom: "0.4rem" }}>
            We collaborate
          </div>
          <div style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.5 }}>
            Analysts and analytics engineers build together in the same framework.
          </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        style={{
          textAlign: "center",
          fontSize: "1rem",
          color: "#64748b",
        }}
      >
        A framework that enables a more mature analytics practice.
      </motion.p>
    </div>
  );
}
