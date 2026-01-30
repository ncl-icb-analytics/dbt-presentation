"use client";

import CodeSlideLayout, { type TreeFile } from "../CodeSlideLayout";
import ClickReveal from "../ClickReveal";
import { useSlideContext } from "../SlideNavigation";

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

const codeStep0 = `models:
  - name: int_blood_pressure_latest`;

const codeStep1 = `models:
  - name: int_blood_pressure_latest
    columns:
      - name: person_id
        tests: [unique, not_null]
      - name: systolic_value
        tests:
          - not_null
          - dbt_utils.accepted_range:
              min_value: 40
              max_value: 300`;

export default function Slide16Tests() {
  const { currentStep } = useSlideContext();
  const isStep1 = currentStep >= 1;

  return (
    <div className="slide" style={{ padding: "2rem 3rem", height: "100vh", minHeight: "auto", overflow: "hidden" }}>
      <h2 style={{ marginBottom: "0.25rem" }}>Step 5: Add tests</h2>
      <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "0" }}>
        Validate data quality on every build. Catch issues before they reach dashboards.
      </p>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start", paddingTop: "1.5rem" }}>
      <CodeSlideLayout
        files={files}
        activeFile="models/_models.yml"
        code={isStep1 ? codeStep1 : codeStep0}
        lang="yaml"
        highlightLines={isStep1 ? [4, 5, 6, 7, 8, 9, 10, 11] : []}
        projectName="dbt-ncl-analytics"
      />
      <ClickReveal step={1}>
        <p style={{ marginTop: "1rem", fontSize: "0.95rem", color: "#94a3b8" }}>
          <code style={{ color: "#eab308" }}>dbt test</code> runs these assertions. Built-in: unique, not_null, accepted_values, relationships.
        </p>
      </ClickReveal>
      </div>
    </div>
  );
}
