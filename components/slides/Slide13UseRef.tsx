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

const codeStep0 = `{{ config(materialized='table') }}

SELECT
    person_id,
    clinical_effective_date,
    systolic_value,
    diastolic_value,
    CASE WHEN systolic_value >= 140 OR diastolic_value >= 90
         THEN TRUE ELSE FALSE END AS is_hypertensive
FROM {{ source('olids', 'observation') }}
WHERE concept_code IN ('271649006', '271650006')
QUALIFY ROW_NUMBER() OVER (
    PARTITION BY person_id ORDER BY clinical_effective_date DESC) = 1`;

const codeStep1 = `{{ config(materialized='table') }}

SELECT
    person_id,
    clinical_effective_date,
    systolic_value,
    diastolic_value,
    CASE WHEN systolic_value >= 140 OR diastolic_value >= 90
         THEN TRUE ELSE FALSE END AS is_hypertensive
FROM {{ ref('stg_olids_observation') }}
WHERE concept_code IN ('271649006', '271650006')
QUALIFY ROW_NUMBER() OVER (
    PARTITION BY person_id ORDER BY clinical_effective_date DESC) = 1`;

export default function Slide15UseRef() {
  const { currentStep } = useSlideContext();
  const isStep1 = currentStep >= 1;

  return (
    <div className="slide" style={{ padding: "3rem 4rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Step 4: Use ref() for dependencies</h2>
      <CodeSlideLayout
        files={files}
        activeFile="models/int_blood_pressure_latest.sql"
        code={isStep1 ? codeStep1 : codeStep0}
        lang="sql"
        highlightLines={isStep1 ? [10] : []}
      />
      <ClickReveal step={1}>
        <p style={{ marginTop: "1rem", fontSize: "1rem" }}>
          <code>ref()</code> declares dependencies. dbt builds models in the right order automatically.
        </p>
      </ClickReveal>
    </div>
  );
}
