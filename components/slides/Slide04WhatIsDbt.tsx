"use client";

import { motion } from "framer-motion";

export default function Slide04WhatIsDbt() {
  return (
    <div className="slide" style={{ padding: "2rem 3rem", height: "100vh", minHeight: "auto", overflow: "hidden" }}>
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: "0.25rem" }}
      >
        What is dbt?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{ color: "#64748b", fontSize: "1.05rem", marginBottom: "0" }}
      >
        A compiler for SQL transformations. You write SELECT, dbt handles the rest.
      </motion.p>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.5rem" }}>
        {/* Code comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: "1.5rem",
            alignItems: "center",
          }}
        >
          {/* Input */}
          <div>
            <div style={{ 
              color: "#3b82f6", 
              fontSize: "0.9rem", 
              fontWeight: 600, 
              marginBottom: "0.5rem",
              letterSpacing: "0.05em",
            }}>
              YOU WRITE
            </div>
            <div style={{
              background: "rgba(0,0,0,0.3)",
              borderRadius: "0.5rem",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              padding: "1rem",
              fontFamily: "var(--font-mono), monospace",
              fontSize: "1rem",
              lineHeight: 1.6,
            }}>
              <div style={{ color: "#6b7280" }}>-- models/fct_bp_readings.sql</div>
              <br />
              <span style={{ color: "#c084fc" }}>SELECT</span>
              <br />
              {"    "}patient_id,
              <br />
              {"    "}reading_date,
              <br />
              {"    "}systolic,
              <br />
              {"    "}diastolic
              <br />
              <span style={{ color: "#c084fc" }}>FROM</span>{" "}
              <span style={{ color: "#f97316" }}>{"{{ ref('stg_observations') }}"}</span>
              <br />
              <span style={{ color: "#c084fc" }}>WHERE</span> observation_type ={" "}
              <span style={{ color: "#a5d6ff" }}>'blood_pressure'</span>
            </div>
          </div>

          {/* Arrow + dbt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <div style={{ color: "#f97316", fontSize: "1.5rem" }}>→</div>
            <div style={{
              background: "rgba(249, 115, 22, 0.15)",
              border: "2px solid #f97316",
              borderRadius: "0.5rem",
              padding: "0.5rem 1rem",
            }}>
              <span style={{ color: "#f97316", fontWeight: 700, fontSize: "1.5rem" }}>dbt</span>
            </div>
            <div style={{ color: "#f97316", fontSize: "1.5rem" }}>→</div>
          </motion.div>

          {/* Output */}
          <div>
            <div style={{ 
              color: "#22c55e", 
              fontSize: "0.9rem", 
              fontWeight: 600, 
              marginBottom: "0.5rem",
              letterSpacing: "0.05em",
            }}>
              DBT RUNS
            </div>
            <div style={{
              background: "rgba(0,0,0,0.3)",
              borderRadius: "0.5rem",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              padding: "1rem",
              fontFamily: "var(--font-mono), monospace",
              fontSize: "1rem",
              lineHeight: 1.6,
            }}>
              <div style={{ color: "#6b7280" }}>-- What dbt compiles and runs:</div>
              <br />
              <span style={{ color: "#c084fc" }}>CREATE OR REPLACE TABLE</span>
              <br />
              {"  "}<span style={{ color: "#22c55e" }}>analytics.fct_bp_readings</span>{" "}
              <span style={{ color: "#c084fc" }}>AS</span>
              <br />
              <span style={{ color: "#c084fc" }}>SELECT</span>
              <br />
              {"    "}patient_id,
              <br />
              {"    "}reading_date,
              <br />
              {"    "}systolic,
              <br />
              {"    "}diastolic
              <br />
              <span style={{ color: "#c084fc" }}>FROM</span>{" "}
              <span style={{ color: "#22c55e" }}>analytics.stg_observations</span>
              <br />
              <span style={{ color: "#c084fc" }}>WHERE</span> observation_type ={" "}
              <span style={{ color: "#a5d6ff" }}>'blood_pressure'</span>
            </div>
          </div>
        </motion.div>

        {/* Key capabilities - concrete */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
          }}
        >
          {[
            { 
              icon: "📁", 
              title: "Models = SQL files", 
              desc: "One .sql file → one table or view",
              color: "#f97316",
            },
            { 
              icon: "🔗", 
              title: "ref() = dependencies", 
              desc: "dbt builds in the right order",
              color: "#8b5cf6",
            },
            { 
              icon: "✅", 
              title: "Tests run on build", 
              desc: "Catch bad data before dashboards",
              color: "#22c55e",
            },
            { 
              icon: "📖", 
              title: "Docs alongside code", 
              desc: "YAML descriptions, in the repo",
              color: "#3b82f6",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.08 }}
              style={{
                padding: "1rem",
                background: "rgba(0,0,0,0.2)",
                borderRadius: "0.5rem",
                borderLeft: `3px solid ${item.color}`,
              }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{item.icon}</div>
              <div style={{ color: item.color, fontWeight: 600, fontSize: "1.1rem", marginBottom: "0.25rem" }}>
                {item.title}
              </div>
              <div style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.4 }}>
                {item.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
