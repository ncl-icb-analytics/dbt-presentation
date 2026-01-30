"use client";

import { motion } from "framer-motion";
import CodeSlideLayout, { type TreeFile } from "../CodeSlideLayout";
import ClickReveal from "../ClickReveal";
import { useSlideContext } from "../SlideNavigation";

const filesStep0: TreeFile[] = [
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
        name: "int_blood_pressure_latest.sql",
        path: "models/int_blood_pressure_latest.sql",
        type: "file",
        lang: "sql",
      },
    ],
  },
];

const filesStep1: TreeFile[] = [
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
        name: "int_blood_pressure_latest.sql",
        path: "models/int_blood_pressure_latest.sql",
        type: "file",
        lang: "sql",
      },
    ],
  },
];

const sourcesCode = `version: 2

sources:
  - name: olids
    database: DATA_LAKE
    schema: OLIDS
    tables:
      - name: observation
      - name: person
      - name: medication`;

const modelCode = `{{ config(materialized='table') }}

SELECT
    person_id,
    clinical_effective_date,
    systolic_value,
    diastolic_value
FROM {{ source('olids', 'observation') }}
WHERE concept_code IN ('271649006', '271650006')`;

export default function Slide13Sources() {
  const { currentStep } = useSlideContext();
  const isStep1 = currentStep >= 1;

  return (
    <div className="slide" style={{ padding: "3rem 4rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Step 2: Define your sources</h2>
      <CodeSlideLayout
        files={isStep1 ? filesStep1 : filesStep0}
        activeFile={isStep1 ? "models/int_blood_pressure_latest.sql" : "models/sources/_sources.yml"}
        code={isStep1 ? modelCode : sourcesCode}
        lang={isStep1 ? "sql" : "yaml"}
        highlightLines={isStep1 ? [8] : [3, 4, 5, 6, 7, 8]}
      />
      <ClickReveal step={1}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1rem",
            background: "rgba(59, 130, 246, 0.1)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            borderRadius: "0.5rem",
          }}
        >
          <p style={{ fontSize: "0.95rem", margin: 0 }}>
            <code style={{ color: "#3b82f6" }}>source()</code> documents where raw data lives.
            If the source table moves, update one place.
          </p>
        </motion.div>
      </ClickReveal>
    </div>
  );
}
