"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DbtDAGExecution from "../DbtDAGExecution";

type Command = "run" | "build" | "test";

export default function Slide18DbtExecution() {
  const [command, setCommand] = useState<Command>("run");

  return (
    <div className="slide" style={{ padding: "1.5rem 2.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <h2 style={{ margin: 0 }}>How dbt runs</h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {(["run", "build", "test"] as Command[]).map((cmd) => (
            <button
              key={cmd}
              onClick={() => setCommand(cmd)}
              style={{
                padding: "0.4rem 0.75rem",
                background: command === cmd ? "rgba(249, 115, 22, 0.2)" : "rgba(0,0,0,0.2)",
                border: command === cmd ? "1px solid #f97316" : "1px solid #475569",
                borderRadius: "0.375rem",
                color: command === cmd ? "#f97316" : "#94a3b8",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontFamily: "var(--font-mono), monospace",
              }}
            >
              dbt {cmd}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>
        <DbtDAGExecution command={command} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.25rem",
        }}
      >
        <div style={{
          padding: "0.4rem 0.6rem",
          background: "rgba(34, 197, 94, 0.1)",
          border: "1px solid rgba(34, 197, 94, 0.3)",
          borderRadius: "0.375rem",
          fontSize: "0.75rem",
        }}>
          <span style={{ color: "#22c55e", fontWeight: 500 }}>Parallel</span>
          <span style={{ color: "#94a3b8" }}> — Independent models run together</span>
        </div>
        <div style={{
          padding: "0.4rem 0.6rem",
          background: "rgba(239, 68, 68, 0.1)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          borderRadius: "0.375rem",
          fontSize: "0.75rem",
        }}>
          <span style={{ color: "#ef4444", fontWeight: 500 }}>Isolated</span>
          <span style={{ color: "#94a3b8" }}> — Unrelated models still run</span>
        </div>
        <div style={{
          padding: "0.4rem 0.6rem",
          background: "rgba(100, 116, 139, 0.1)",
          border: "1px solid rgba(100, 116, 139, 0.3)",
          borderRadius: "0.375rem",
          fontSize: "0.75rem",
        }}>
          <span style={{ color: "#94a3b8", fontWeight: 500 }}>Smart skip</span>
          <span style={{ color: "#64748b" }}> — Downstream of failures skipped</span>
        </div>
      </motion.div>
    </div>
  );
}
