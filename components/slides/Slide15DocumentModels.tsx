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
        name: "_models.yml",
        path: "models/_models.yml",
        type: "file",
        lang: "yaml",
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

const yamlCode = `version: 2

models:
  - name: int_blood_pressure_latest
    description: >
      Latest blood pressure reading per person.
      Uses NICE NG136 thresholds (140/90 mmHg).
    columns:
      - name: person_id
        description: Unique patient identifier
        tests: [unique, not_null]
      - name: systolic_value
        description: Systolic BP in mmHg
      - name: is_hypertensive
        description: TRUE if BP >= 140/90`;

export default function Slide17DocumentModels() {
  return (
    <div className="slide" style={{ padding: "2rem 3rem", height: "100vh", minHeight: "auto", overflow: "hidden" }}>
      <h2 style={{ marginBottom: "0.25rem" }}>Step 6: Document your models</h2>
      <p style={{ color: "#64748b", fontSize: "1.05rem", marginBottom: "0" }}>
        Descriptions live next to tests. Generate a searchable docs site.
      </p>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start", paddingTop: "1.5rem" }}>
      <CodeSlideLayout
        files={files}
        activeFile="models/_models.yml"
        code={yamlCode}
        lang="yaml"
        highlightLines={[5, 6, 7, 10]}
        projectName="dbt-ncl-analytics"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1rem",
          background: "rgba(0,0,0,0.2)",
          borderRadius: "0.5rem",
          fontSize: "1.15rem",
          color: "#94a3b8",
        }}
      >
        Run <code style={{ color: "#f97316" }}>dbt docs generate</code> then <code style={{ color: "#f97316" }}>dbt docs serve</code> to view.
      </motion.div>
      </div>
    </div>
  );
}
