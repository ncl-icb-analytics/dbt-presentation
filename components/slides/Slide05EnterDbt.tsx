"use client";

import ClickReveal from "../ClickReveal";

export default function Slide07EnterDbt() {
  return (
    <div className="slide">
      <h2 style={{ fontSize: "2.5rem" }}>What dbt offers</h2>
      <p style={{ fontSize: "1.2rem" }}>Capabilities available when using dbt for transformations</p>

      <ul>
        <ClickReveal step={1}>
          <li>
            <li style={{ fontSize: "1.2rem" }}><strong>Declared dependencies</strong> – <code>ref()</code> tells dbt what
            each model needs</li>
          </li>
        </ClickReveal>
        <ClickReveal step={2}>
          <li>
            <li style={{ fontSize: "1.2rem" }}><strong>Automatic build order</strong> – dbt works out what runs when</li>
          </li>
        </ClickReveal>
        <ClickReveal step={3}>
          <li>
            <li style={{ fontSize: "1.2rem" }}><strong>Built-in observability</strong> – Logging, run times, test results</li>
          </li>
        </ClickReveal>
        <ClickReveal step={4}>
          <li>
            <li style={{ fontSize: "1.2rem" }}><strong>Testing</strong> – Validate data quality on every run</li>
          </li>
        </ClickReveal>
        <ClickReveal step={5}>
          <li>
            <li style={{ fontSize: "1.2rem" }}><strong>Documentation</strong> – Generated from your code</li>
          </li>
        </ClickReveal>
      </ul>
    </div>
  );
}
