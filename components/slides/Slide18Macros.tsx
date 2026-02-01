"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CodeSlideLayout, { TreeFile } from "../CodeSlideLayout";

const files: TreeFile[] = [
  {
    name: "macros",
    type: "folder",
    path: "macros",
    children: [
      {
        name: "dates.sql",
        type: "file",
        path: "macros/dates.sql",
        lang: "sql",
      },
      {
        name: "clinical.sql",
        type: "file",
        path: "macros/clinical.sql",
        lang: "sql",
      },
    ],
  },
  {
    name: "models",
    type: "folder",
    path: "models",
    children: [
      {
        name: "fct_qof_register.sql",
        type: "file",
        path: "models/fct_qof_register.sql",
        lang: "sql",
      },
    ],
  },
];

const codeFiles: Record<string, { code: string; lang: string }> = {
  "macros/dates.sql": {
    lang: "sql",
    code: `{% macro fy_start() %}
  DATE_FROM_PARTS(
    IFF(MONTH(CURRENT_DATE) >= 4, YEAR(CURRENT_DATE), YEAR(CURRENT_DATE) - 1),
    4, 1)
{% endmacro %}

{% macro fy_end() %}
  DATE_FROM_PARTS(
    IFF(MONTH(CURRENT_DATE) >= 4, YEAR(CURRENT_DATE) + 1, YEAR(CURRENT_DATE)),
    3, 31)
{% endmacro %}`,
  },
  "macros/clinical.sql": {
    lang: "sql",
    code: `{% macro bmi(weight_kg, height_m) %}
  ({{ weight_kg }} / NULLIF({{ height_m }} * {{ height_m }}, 0))::numeric(4,1)
{% endmacro %}

{% macro fructosamine_to_hba1c(fructosamine) %}
  -- Approximate conversion: HbA1c = (fructosamine + 15.2) / 32.5
  (({{ fructosamine }} + 15.2) / 32.5)::numeric(4,1)
{% endmacro %}`,
  },
  "models/fct_qof_register.sql": {
    lang: "sql",
    code: `SELECT
    patient_id,
    {{ bmi('weight_kg', 'height_m') }} as bmi,
    {{ fructosamine_to_hba1c('fructosamine_value') }} as hba1c_est
FROM {{ ref('stg_observations') }}
WHERE observation_date >= {{ fy_start() }}
  AND observation_date <= {{ fy_end() }}`,
  },
};

export default function Slide18Macros() {
  const [activeFile, setActiveFile] = useState("macros/dates.sql");
  const currentFile = codeFiles[activeFile];

  return (
    <div className="slide" style={{ padding: "2rem 3rem", height: "100vh", minHeight: "auto", overflow: "hidden" }}>
      <h2 style={{ marginBottom: "0.25rem" }}>Macros</h2>
      <p style={{ color: "#64748b", fontSize: "1.05rem", marginBottom: "0" }}>
        Reusable Jinja functions. Define once, use everywhere.
      </p>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start", paddingTop: "1.5rem" }}>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        {Object.keys(codeFiles).map((file) => (
          <button
            key={file}
            onClick={() => setActiveFile(file)}
            style={{
              padding: "0.4rem 0.75rem",
              background: activeFile === file ? "rgba(249, 115, 22, 0.2)" : "rgba(0,0,0,0.2)",
              border: activeFile === file ? "1px solid #f97316" : "1px solid #475569",
              borderRadius: "0.375rem",
              color: activeFile === file ? "#f97316" : "#94a3b8",
              cursor: "pointer",
              fontSize: "1rem",
              fontFamily: "var(--font-mono), monospace",
            }}
          >
            {file.split("/").pop()}
          </button>
        ))}
      </div>

      <motion.div
        key={activeFile}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CodeSlideLayout
          files={files}
          activeFile={activeFile}
          code={currentFile.code}
          lang={currentFile.lang}
          projectName="dbt-analytics"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          marginTop: "1rem",
          display: "flex",
          gap: "1rem",
        }}
      >
        <div style={{
          padding: "0.5rem 0.75rem",
          background: "rgba(249, 115, 22, 0.1)",
          borderRadius: "0.375rem",
          borderLeft: "3px solid #f97316",
          fontSize: "1.05rem",
        }}>
          <code style={{ color: "#f97316" }}>dbt_utils</code>
          <span style={{ color: "#94a3b8" }}> — 50+ common macros</span>
        </div>
        <div style={{
          padding: "0.5rem 0.75rem",
          background: "rgba(59, 130, 246, 0.1)",
          borderRadius: "0.375rem",
          borderLeft: "3px solid #3b82f6",
          fontSize: "1.05rem",
        }}>
          <code style={{ color: "#3b82f6" }}>dbt_expectations</code>
          <span style={{ color: "#94a3b8" }}> — Great Expectations in dbt</span>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
