"use client";

import CodeSlideLayout, { type TreeFile } from "../CodeSlideLayout";

const files: TreeFile[] = [
  {
    name: "blood_pressure_latest.sql",
    path: "blood_pressure_latest.sql",
    type: "file",
    lang: "sql",
  },
];

const code = `CREATE TABLE analytics.blood_pressure_latest AS
SELECT
    person_id,
    clinical_effective_date,
    systolic_value,
    diastolic_value,
    CASE WHEN systolic_value >= 140 OR diastolic_value >= 90
         THEN TRUE ELSE FALSE END AS is_hypertensive
FROM DATA_LAKE.OLIDS.observation
WHERE concept_code IN ('271649006', '271650006')
QUALIFY ROW_NUMBER() OVER (
    PARTITION BY person_id ORDER BY clinical_effective_date DESC) = 1`;

export default function Slide11RawSQL() {
  return (
    <div className="slide" style={{ padding: "2rem 3rem", height: "100vh", minHeight: "auto", overflow: "hidden" }}>
      <h2 style={{ marginBottom: "0.25rem" }}>Starting point: Raw SQL</h2>
      <p style={{ color: "#64748b", fontSize: "1.05rem", marginBottom: "0" }}>
        Hardcoded table names, magic numbers, no tests, no docs.
      </p>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start", paddingTop: "1.5rem" }}>
      <CodeSlideLayout
        files={files}
        activeFile="blood_pressure_latest.sql"
        code={code}
        lang="sql"
        projectName="my project"
      />
      </div>
    </div>
  );
}
