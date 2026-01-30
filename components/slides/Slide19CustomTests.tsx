"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CodeSlideLayout, { TreeFile } from "../CodeSlideLayout";

type Example = "custom" | "elementary";

const customFiles: TreeFile[] = [
  {
    name: "tests",
    type: "folder",
    path: "tests",
    children: [
      {
        name: "generic",
        type: "folder",
        path: "tests/generic",
        children: [
          {
            name: "valid_uk_postcode.sql",
            type: "file",
            path: "tests/generic/valid_uk_postcode.sql",
            lang: "sql",
          },
        ],
      },
    ],
  },
  {
    name: "models",
    type: "folder",
    path: "models",
    children: [
      {
        name: "stg_patients.sql",
        type: "file",
        path: "models/stg_patients.sql",
        lang: "sql",
      },
      {
        name: "_schema.yml",
        type: "file",
        path: "models/_schema.yml",
        lang: "yaml",
      },
    ],
  },
];

const elementaryFiles: TreeFile[] = [
  {
    name: "packages.yml",
    type: "file",
    path: "packages.yml",
    lang: "yaml",
  },
  {
    name: "models",
    type: "folder",
    path: "models",
    children: [
      {
        name: "fct_daily_admissions.sql",
        type: "file",
        path: "models/fct_daily_admissions.sql",
        lang: "sql",
      },
      {
        name: "_schema.yml",
        type: "file",
        path: "models/_schema.yml",
        lang: "yaml",
      },
    ],
  },
];

const customCode: Record<string, { code: string; lang: string }> = {
  "tests/generic/valid_uk_postcode.sql": {
    lang: "sql",
    code: `{% test valid_uk_postcode(model, column_name) %}

SELECT {{ column_name }}
FROM {{ model }}
WHERE {{ column_name }} IS NOT NULL
  -- UK postcode format: 1-2 letters, digit(s), space, digit, 2 letters
  AND NOT REGEXP_LIKE(
    UPPER({{ column_name }}),
    '^[A-Z]{1,2}[0-9][0-9A-Z]? ?[0-9][A-Z]{2}$'
  )

{% endtest %}`,
  },
  "models/_schema.yml": {
    lang: "yaml",
    code: `models:
  - name: stg_patients
    columns:
      - name: postcode
        tests:
          - not_null
          - valid_uk_postcode  # Our custom test`,
  },
};

const elementaryCode: Record<string, { code: string; lang: string }> = {
  "packages.yml": {
    lang: "yaml",
    code: `packages:
  - package: elementary-data/elementary
    version: 0.16.0`,
  },
  "models/_schema.yml": {
    lang: "yaml",
    code: `models:
  - name: fct_daily_admissions
    config:
      elementary:
        timestamp_column: created_at
    tests:
      # Alerts if row count deviates >3 std devs
      # from training period baseline
      - elementary.volume_anomalies:
          time_bucket:
            period: day
            count: 1
          training_period:
            period: day
            count: 60   # ~2 months lookback
          # Compare Monday to Mondays, Tuesday to Tuesdays, etc.
          seasonality: day_of_week
      # Alerts if no new data within expected interval
      - elementary.freshness_anomalies`,
  },
};

export default function Slide19CustomTests() {
  const [example, setExample] = useState<Example>("custom");
  const [customFile, setCustomFile] = useState("tests/generic/valid_uk_postcode.sql");
  const [elementaryFile, setElementaryFile] = useState("packages.yml");

  const files = example === "custom" ? customFiles : elementaryFiles;
  const codeFiles = example === "custom" ? customCode : elementaryCode;
  const activeFile = example === "custom" ? customFile : elementaryFile;
  const setActiveFile = example === "custom" ? setCustomFile : setElementaryFile;
  const currentFile = codeFiles[activeFile];

  return (
    <div className="slide" style={{ padding: "2rem 3rem", height: "100vh", minHeight: "auto", overflow: "hidden" }}>
      <h2 style={{ marginBottom: "0.25rem" }}>Custom tests</h2>
      <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "0" }}>
        {example === "custom"
          ? "Write domain-specific validation. If it returns rows, the test fails."
          : "Statistical anomaly detection with dbt-elementary."}
      </p>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start", paddingTop: "1.5rem" }}>

      <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setExample("custom")}
            style={{
              padding: "0.4rem 0.75rem",
              background: example === "custom" ? "rgba(168, 85, 247, 0.2)" : "rgba(0,0,0,0.2)",
              border: example === "custom" ? "1px solid #a855f7" : "1px solid #475569",
              borderRadius: "0.375rem",
              color: example === "custom" ? "#a855f7" : "#94a3b8",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: 500,
            }}
          >
            Generic test
          </button>
          <button
            onClick={() => setExample("elementary")}
            style={{
              padding: "0.4rem 0.75rem",
              background: example === "elementary" ? "rgba(34, 197, 94, 0.2)" : "rgba(0,0,0,0.2)",
              border: example === "elementary" ? "1px solid #22c55e" : "1px solid #475569",
              borderRadius: "0.375rem",
              color: example === "elementary" ? "#22c55e" : "#94a3b8",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: 500,
            }}
          >
            Anomaly detection
          </button>
        </div>

        <div style={{ width: "1px", height: "1.5rem", background: "#475569" }} />

        <div style={{ display: "flex", gap: "0.5rem" }}>
          {Object.keys(codeFiles).map((file) => (
            <button
              key={file}
              onClick={() => setActiveFile(file)}
              style={{
                padding: "0.4rem 0.75rem",
                background: activeFile === file ? "rgba(100, 116, 139, 0.3)" : "rgba(0,0,0,0.2)",
                border: activeFile === file ? "1px solid #64748b" : "1px solid #475569",
                borderRadius: "0.375rem",
                color: activeFile === file ? "#e2e8f0" : "#94a3b8",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontFamily: "var(--font-mono), monospace",
              }}
            >
              {file.split("/").pop()}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={`${example}-${activeFile}`}
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
        key={example}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 0.75rem",
          background: example === "custom" ? "rgba(168, 85, 247, 0.1)" : "rgba(34, 197, 94, 0.1)",
          borderRadius: "0.375rem",
          borderLeft: example === "custom" ? "3px solid #a855f7" : "3px solid #22c55e",
          fontSize: "0.85rem",
        }}
      >
        {example === "custom" ? (
          <>
            <span style={{ color: "#a855f7", fontWeight: 500 }}>Generic tests</span>
            <span style={{ color: "#94a3b8" }}> — reusable across models, take parameters like column_name</span>
          </>
        ) : (
          <>
            <span style={{ color: "#22c55e", fontWeight: 500 }}>Elementary</span>
            <span style={{ color: "#94a3b8" }}> — observability dashboard, Slack alerts, auto-detects anomalies</span>
          </>
        )}
      </motion.div>
      </div>
    </div>
  );
}
