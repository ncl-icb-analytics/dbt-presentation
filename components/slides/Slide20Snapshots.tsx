"use client";

import { motion } from "framer-motion";
import CodeSlideLayout, { TreeFile } from "../CodeSlideLayout";

const files: TreeFile[] = [
  {
    name: "snapshots",
    type: "folder",
    path: "snapshots",
    children: [
      {
        name: "snap_patient_address.sql",
        type: "file",
        path: "snapshots/snap_patient_address.sql",
        lang: "sql",
      },
    ],
  },
];

const code = `{% snapshot snap_patient_address %}

{{ config(
    target_schema='snapshots',
    unique_key='patient_id',
    strategy='timestamp',
    updated_at='modified_date'
) }}

SELECT
    patient_id,
    address_line1,
    city,
    postcode,
    modified_date
FROM {{ source('ehr', 'patient') }}

{% endsnapshot %}`;

export default function Slide22Snapshots() {
  return (
    <div className="slide" style={{ padding: "2rem 4rem" }}>
      <h2 style={{ marginBottom: "0.75rem" }}>Snapshots</h2>
      <p style={{ color: "#94a3b8", marginBottom: "1.5rem", fontSize: "1rem" }}>
        Track how data changes over time. dbt adds <code style={{ color: "#a855f7" }}>dbt_valid_from</code> and <code style={{ color: "#a855f7" }}>dbt_valid_to</code> columns automatically (Type 2 SCD).
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <CodeSlideLayout
          files={files}
          activeFile="snapshots/snap_patient_address.sql"
          code={code}
          lang="sql"
          projectName="dbt-analytics"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          marginTop: "1rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
      >
        <div style={{
          padding: "0.75rem 1rem",
          background: "rgba(168, 85, 247, 0.1)",
          borderRadius: "0.5rem",
          borderLeft: "3px solid #a855f7",
        }}>
          <code style={{ color: "#a855f7", fontSize: "0.9rem" }}>strategy='timestamp'</code>
          <p style={{ color: "#94a3b8", fontSize: "0.85rem", margin: "0.25rem 0 0 0" }}>
            Build truly historical snapshots when source has an <code style={{ color: "#a855f7", fontSize: "0.85rem" }}>updated_at</code> column.
          </p>
        </div>
        <div style={{
          padding: "0.75rem 1rem",
          background: "rgba(168, 85, 247, 0.1)",
          borderRadius: "0.5rem",
          borderLeft: "3px solid #a855f7",
        }}>
          <code style={{ color: "#a855f7", fontSize: "0.9rem" }}>strategy='check'</code>
          <p style={{ color: "#94a3b8", fontSize: "0.85rem", margin: "0.25rem 0 0 0" }}>
            Track cohort changes when no clean date key exists (e.g., population changes, multiple temporal eligibility factors).
          </p>
        </div>
      </motion.div>
    </div>
  );
}
