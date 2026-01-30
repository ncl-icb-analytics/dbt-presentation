"use client";

import CodeSlideLayout, { type TreeFile } from "../CodeSlideLayout";
import ClickReveal from "../ClickReveal";
import { useSlideContext } from "../SlideNavigation";

const files: TreeFile[] = [
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
    <div className="slide" style={{ padding: "3rem 4rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Step 5: Add tests</h2>
      <CodeSlideLayout
        files={files}
        activeFile="models/_models.yml"
        code={isStep1 ? codeStep1 : codeStep0}
        lang="yaml"
        highlightLines={isStep1 ? [4, 5, 6, 7, 8, 9, 10, 11] : []}
      />
      <ClickReveal step={1}>
        <p style={{ marginTop: "1rem", fontSize: "1rem" }}>
          <code>dbt test</code> runs these on every build. Catch issues before they reach dashboards.
        </p>
      </ClickReveal>
    </div>
  );
}
