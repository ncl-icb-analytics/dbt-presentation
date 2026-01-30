"use client";

import { motion } from "framer-motion";
import CodeSlideLayout, { type TreeFile } from "../CodeSlideLayout";
import { useState } from "react";

const files: TreeFile[] = [
  {
    name: "dbt_project.yml",
    path: "dbt_project.yml",
    type: "file",
    lang: "yaml",
  },
  {
    name: "profiles.yml",
    path: "profiles.yml",
    type: "file",
    lang: "yaml",
  },
];

const dbtProjectCode = `name: 'ncl_analytics'
profile: 'ncl_analytics'

models:
  ncl_analytics:
    staging:
      +schema: staging
    intermediate:
      +schema: intermediate
    marts:
      +schema: marts`;

const profilesCode = `ncl_analytics:
  target: dev  # Default target
  outputs:
    dev:
      type: snowflake
      account: ncl.eu-west-2.aws
      database: DEV_ANALYTICS
      warehouse: TRANSFORM_WH
      # ... auth via env vars

    prod:
      type: snowflake
      account: ncl.eu-west-2.aws
      database: ANALYTICS
      warehouse: TRANSFORM_WH
      # ... auth via env vars

# Run with: dbt run --target prod`;

export default function Slide10ProjectSetup() {
  const [activeFile, setActiveFile] = useState("dbt_project.yml");

  const code = activeFile === "dbt_project.yml" ? dbtProjectCode : profilesCode;

  return (
    <div className="slide" style={{ padding: "2rem 3rem", height: "100vh", minHeight: "auto", overflow: "hidden" }}>
      <h2 style={{ marginBottom: "0.25rem" }}>Project setup</h2>
      <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "0" }}>
        Every dbt project needs two config files: one defines the project, the other connects to your warehouse.
      </p>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start", paddingTop: "1.5rem" }}>
      <div style={{ marginBottom: "1.25rem" }}>
        <div style={{
          display: "flex",
          gap: "0.75rem",
          marginBottom: "1rem",
        }}>
          <button
            onClick={() => setActiveFile("dbt_project.yml")}
            style={{
              padding: "0.5rem 1rem",
              background: activeFile === "dbt_project.yml" ? "rgba(249, 115, 22, 0.2)" : "rgba(0,0,0,0.2)",
              border: activeFile === "dbt_project.yml" ? "1px solid #f97316" : "1px solid #475569",
              borderRadius: "0.375rem",
              color: activeFile === "dbt_project.yml" ? "#f97316" : "#94a3b8",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            dbt_project.yml
          </button>
          <button
            onClick={() => setActiveFile("profiles.yml")}
            style={{
              padding: "0.5rem 1rem",
              background: activeFile === "profiles.yml" ? "rgba(249, 115, 22, 0.2)" : "rgba(0,0,0,0.2)",
              border: activeFile === "profiles.yml" ? "1px solid #f97316" : "1px solid #475569",
              borderRadius: "0.375rem",
              color: activeFile === "profiles.yml" ? "#f97316" : "#94a3b8",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            profiles.yml
          </button>
        </div>

        <CodeSlideLayout
          files={files}
          activeFile={activeFile}
          code={code}
          lang="yaml"
          projectName="ncl-analytics"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          display: "flex",
          gap: "1.5rem",
          fontSize: "0.9rem",
        }}
      >
        <div style={{
          flex: 1,
          padding: "0.75rem 1rem",
          background: "rgba(0,0,0,0.2)",
          borderRadius: "0.5rem",
          borderLeft: "3px solid #f97316",
        }}>
          <strong style={{ color: "#f97316" }}>dbt_project.yml</strong>
          <span style={{ color: "#94a3b8" }}> — Project name, paths, config. Lives in repo root.</span>
        </div>
        <div style={{
          flex: 1,
          padding: "0.75rem 1rem",
          background: "rgba(0,0,0,0.2)",
          borderRadius: "0.5rem",
          borderLeft: "3px solid #3b82f6",
        }}>
          <strong style={{ color: "#3b82f6" }}>profiles.yml</strong>
          <span style={{ color: "#94a3b8" }}> — Connection details. Lives in repo root (credentials via env vars).</span>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
