"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createHighlighter, type HighlighterCore } from "shiki";

const inputCode = `{{ config(materialized='table') }}

SELECT
    patient_id,
    reading_date,
    systolic,
    diastolic
FROM {{ ref('stg_observations') }}
WHERE observation_type = 'blood_pressure'`;

const outputCode = `CREATE OR REPLACE TABLE
  analytics.fct_bp_readings AS
SELECT
    patient_id,
    reading_date,
    systolic,
    diastolic
FROM analytics.stg_observations
WHERE observation_type = 'blood_pressure'`;

export default function Slide04WhatIsDbt() {
  const [inputHtml, setInputHtml] = useState<string>("");
  const [outputHtml, setOutputHtml] = useState<string>("");

  useEffect(() => {
    createHighlighter({
      themes: ["github-dark"],
      langs: ["sql"],
    }).then((h) => {
      setInputHtml(h.codeToHtml(inputCode, { lang: "sql", theme: "github-dark" }));
      setOutputHtml(h.codeToHtml(outputCode, { lang: "sql", theme: "github-dark" }));
    });
  }, []);

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
        A compiler for SQL transformations. You write SELECT statements with dependencies — dbt resolves references, determines build order, and generates the DDL.
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
            alignItems: "stretch",
          }}
        >
          {/* Input */}
          <div className="code-slide-viewer" style={{ gridColumn: "auto" }}>
            <div className="code-filename">models/fct_bp_readings.sql</div>
            <div
              className="code-block-inner"
              style={{ fontSize: "1.2rem" }}
              dangerouslySetInnerHTML={{ __html: inputHtml }}
            />
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
              justifyContent: "center",
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
          <div className="code-slide-viewer" style={{ gridColumn: "auto" }}>
            <div className="code-filename">Compiled & executed</div>
            <div
              className="code-block-inner"
              style={{ fontSize: "1.2rem" }}
              dangerouslySetInnerHTML={{ __html: outputHtml }}
            />
          </div>
        </motion.div>

        {/* Key capabilities */}
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
              icon: "⚙️",
              title: "Materializations",
              desc: "Config controls: table, view, incremental",
              color: "#22c55e",
            },
            {
              icon: "🎯",
              title: "Environments",
              desc: "Same code deploys to dev, test, or prod",
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
