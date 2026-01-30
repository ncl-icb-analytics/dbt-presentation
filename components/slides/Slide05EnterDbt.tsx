"use client";

import ClickReveal from "../ClickReveal";

export default function Slide07EnterDbt() {
  return (
    <div className="slide">
      <h2>Enter dbt</h2>
      <p>dbt applies software engineering practices to SQL transformations.</p>

      <ul>
        <ClickReveal step={1}>
          <li>
            <strong>Declared dependencies</strong> – <code>ref()</code> tells dbt what
            each model needs
          </li>
        </ClickReveal>
        <ClickReveal step={2}>
          <li>
            <strong>Automatic build order</strong> – dbt works out what runs when
          </li>
        </ClickReveal>
        <ClickReveal step={3}>
          <li>
            <strong>Built-in observability</strong> – Logging, run times, test results
          </li>
        </ClickReveal>
        <ClickReveal step={4}>
          <li>
            <strong>Testing</strong> – Validate data quality on every run
          </li>
        </ClickReveal>
        <ClickReveal step={5}>
          <li>
            <strong>Documentation</strong> – Generated from your code
          </li>
        </ClickReveal>
      </ul>
    </div>
  );
}
