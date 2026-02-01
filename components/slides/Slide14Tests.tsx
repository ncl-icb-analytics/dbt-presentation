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
      <p style={{ color: "#64748b", fontSize: "1.05rem", marginBottom: "0" }}>
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
        <div style={{ marginTop: "1.25rem" }}>
          <p style={{ fontSize: "1.1rem", color: "#94a3b8", marginBottom: "0.9rem" }}>
            <code style={{ color: "#eab308" }}>dbt test</code> runs these assertions. Four built-in generic tests:
          </p>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            {[
              { name: "unique", desc: "No duplicate values" },
              { name: "not_null", desc: "No NULL values" },
              { name: "accepted_values", desc: "Only allowed values" },
              { name: "relationships", desc: "Foreign key exists" },
            ].map((test) => (
              <div
                key={test.name}
                style={{
                  background: "rgba(139, 92, 246, 0.1)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  borderRadius: "0.375rem",
                  padding: "0.5rem 0.75rem",
                  flex: 1,
                }}
              >
                <code style={{ color: "#c4b5fd", fontSize: "1rem" }}>{test.name}</code>
                <div style={{ color: "#64748b", fontSize: "0.85rem", marginTop: "0.25rem" }}>{test.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ color: "#94a3b8", fontSize: "1.05rem", marginBottom: "0.6rem" }}>Additional tests from packages:</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "1.05rem", color: "#64748b" }}>
            <div><span style={{ color: "#f97316" }}>dbt_utils</span>: at_least_one, accepted_range, not_null_proportion, unique_combination_of_columns, sequential_values</div>
            <div><span style={{ color: "#f97316" }}>dbt_expectations</span>: expect_column_values_to_be_between, expect_table_row_count_to_be_between, expect_column_to_exist</div>
            <div><span style={{ color: "#f97316" }}>elementary</span>: volume_anomalies, freshness_anomalies, dimension_anomalies, schema_changes</div>
          </div>
        </div>
      </ClickReveal>
      </div>
    </div>
  );
}
