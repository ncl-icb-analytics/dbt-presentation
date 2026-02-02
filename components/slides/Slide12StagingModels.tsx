"use client";

import { motion } from "framer-motion";
import CodeSlideLayout, { type TreeFile } from "../CodeSlideLayout";

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
  {
    name: "models",
    path: "models",
    type: "folder",
    children: [
      {
        name: "sources",
        path: "models/sources",
        type: "folder",
        children: [
          {
            name: "_sources.yml",
            path: "models/sources/_sources.yml",
            type: "file",
            lang: "yaml",
          },
        ],
      },
      {
        name: "staging",
        path: "models/staging",
        type: "folder",
        children: [
          {
            name: "stg_olids_observation.sql",
            path: "models/staging/stg_olids_observation.sql",
            type: "file",
            lang: "sql",
          },
        ],
      },
      {
        name: "int_blood_pressure_latest.sql",
        path: "models/int_blood_pressure_latest.sql",
        type: "file",
        lang: "sql",
      },
    ],
  },
];

const stagingCode = `{{ config(materialized='view') }}

SELECT
    id AS observation_id,
    person_id,
    concept_code,
    result_value::number(10,2) AS result_value,
    clinical_effective_date::date AS observation_date
FROM {{ source('olids', 'observation') }}
WHERE person_id IS NOT NULL`;

export default function Slide14StagingModels() {
  return (
    <div className="slide" style={{ padding: "2rem 3rem", height: "100vh", minHeight: "auto", overflow: "hidden" }}>
      <h2 style={{ marginBottom: "0.25rem" }}>Step 3: Create staging models</h2>
      <p style={{ color: "#64748b", fontSize: "1.05rem", marginBottom: "0" }}>
        Thin wrappers over sources. Rename, cast, select only what you need.
      </p>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start", paddingTop: "1.5rem" }}>
      <CodeSlideLayout
        files={files}
        activeFile="models/staging/stg_olids_observation.sql"
        code={stagingCode}
        lang="sql"
        highlightLines={[4, 7, 8, 10]}
        projectName="dbt-ncl-analytics"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          marginTop: "1rem",
          display: "flex",
          gap: "1.5rem",
        }}
      >
        <div style={{
          flex: 1,
          padding: "0.75rem 1rem",
          background: "rgba(0,0,0,0.2)",
          borderRadius: "0.5rem",
          borderLeft: "3px solid #22c55e",
        }}>
          <strong style={{ color: "#22c55e" }}>1:1 with source</strong>
          <span style={{ color: "#94a3b8" }}> — One staging model per source table. No joins here.</span>
        </div>
        <div style={{
          flex: 1,
          padding: "0.75rem 1rem",
          background: "rgba(0,0,0,0.2)",
          borderRadius: "0.5rem",
          borderLeft: "3px solid #f97316",
        }}>
          <strong style={{ color: "#f97316" }}>Naming convention</strong>
          <span style={{ color: "#94a3b8" }}> — <code style={{ color: "#f97316" }}>stg_{'{source}'}_{'{table}'}</code> makes lineage clear.</span>
        </div>
        <div style={{
          flex: 1,
          padding: "0.75rem 1rem",
          background: "rgba(0,0,0,0.2)",
          borderRadius: "0.5rem",
          borderLeft: "3px solid #8b5cf6",
        }}>
          <strong style={{ color: "#8b5cf6" }}>Select only what you need</strong>
          <span style={{ color: "#94a3b8" }}> — Rename, cast. Keep it minimal.</span>
        </div>
        <div style={{
          flex: 1,
          padding: "0.75rem 1rem",
          background: "rgba(0,0,0,0.2)",
          borderRadius: "0.5rem",
          borderLeft: "3px solid #ec4899",
        }}>
          <strong style={{ color: "#ec4899" }}>Clean early</strong>
          <span style={{ color: "#94a3b8" }}> — Filter bad data here so downstream models stay clean.</span>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
