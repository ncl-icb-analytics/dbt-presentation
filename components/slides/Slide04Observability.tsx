"use client";

import ClickReveal from "../ClickReveal";

export default function Slide04Observability() {
  return (
    <div className="slide">
      <h2>Challenges at scale</h2>
      <p>Things that become harder as complexity grows</p>

      <ul>
        <ClickReveal step={1}>
          <li>Logging and monitoring across many procedures</li>
        </ClickReveal>
        <ClickReveal step={2}>
          <li>Consistent conventions across contributors</li>
        </ClickReveal>
        <ClickReveal step={3}>
          <li>Tracking what changed and when</li>
        </ClickReveal>
        <ClickReveal step={4}>
          <li>Testing data quality systematically</li>
        </ClickReveal>
      </ul>

      <ClickReveal step={5}>
        <p style={{ marginTop: "2rem" }}>
          These challenges exist regardless of which tools you use.
        </p>
      </ClickReveal>
    </div>
  );
}
