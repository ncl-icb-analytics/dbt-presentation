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
    <div className="slide" style={{ padding: "3rem 4rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Starting point: Raw SQL</h2>
      <CodeSlideLayout
        files={files}
        activeFile="blood_pressure_latest.sql"
        code={code}
        lang="sql"
        projectName="my project"
      />
      <p style={{ marginTop: "1rem", fontSize: "1rem" }}>
        Hardcoded table names, magic numbers, no tests, no docs.
      </p>
    </div>
  );
}
