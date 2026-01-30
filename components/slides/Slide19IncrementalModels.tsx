"use client";

import { motion } from "framer-motion";
import CodeSlideLayout, { TreeFile } from "../CodeSlideLayout";

const files: TreeFile[] = [
  {
    name: "models",
    type: "folder",
    path: "models",
    children: [
      {
        name: "modelling",
        type: "folder",
        path: "models/modelling",
        children: [
          {
            name: "fct_daily_encounters.sql",
            type: "file",
            path: "models/modelling/fct_daily_encounters.sql",
            lang: "sql",
          },
        ],
      },
    ],
  },
];

const code = `{{ config(
    materialized='incremental',
    unique_key='encounter_id'
) }}

SELECT
    encounter_id,
    patient_id,
    encounter_date,
    discharge_date,
    diagnosis_code
FROM {{ ref('stg_encounters') }}

{% if is_incremental() %}
WHERE encounter_date > (SELECT MAX(encounter_date) FROM {{ this }})
{% endif %}`;

export default function Slide21IncrementalModels() {
  return (
    <div className="slide" style={{ padding: "2rem 4rem" }}>
      <h2 style={{ marginBottom: "0.75rem" }}>Incremental models</h2>
      <p style={{ color: "#94a3b8", marginBottom: "1.5rem", fontSize: "1rem" }}>
        Only process new or changed data. On first run, builds the full table. Subsequent runs append/merge new rows.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <CodeSlideLayout
          files={files}
          activeFile="models/modelling/fct_daily_encounters.sql"
          code={code}
          lang="sql"
          projectName="dbt-analytics"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1rem",
          background: "rgba(34, 197, 94, 0.1)",
          borderRadius: "0.5rem",
          borderLeft: "3px solid #22c55e",
        }}
      >
        <code style={{ color: "#22c55e", fontSize: "0.9rem" }}>is_incremental()</code>
        <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}> — true when table exists and not running with </span>
        <code style={{ color: "#22c55e", fontSize: "0.9rem" }}>--full-refresh</code>
      </motion.div>
    </div>
  );
}
