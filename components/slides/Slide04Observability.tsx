"use client";

import ClickReveal from "../ClickReveal";

export default function Slide04Observability() {
  return (
    <div className="slide">
      <h2 style={{ fontSize: "2.5rem" }}>Challenges at scale</h2>
      <p style={{ fontSize: "1.2rem" }}>Things that become harder as complexity grows</p>

      <ul>
        <ClickReveal step={1}>
          <li style={{ fontSize: "1.2rem" }}>Logging and monitoring across many procedures</li>
        </ClickReveal>
        <ClickReveal step={2}>
          <li style={{ fontSize: "1.2rem" }}>Consistent conventions across contributors</li>
        </ClickReveal>
        <ClickReveal step={3}>
          <li style={{ fontSize: "1.2rem" }}>Tracking what changed and when</li>
        </ClickReveal>
        <ClickReveal step={4}>
          <li style={{ fontSize: "1.2rem" }}>Testing data quality systematically</li>
        </ClickReveal>
      </ul>

      <ClickReveal step={5}>
        <p style={{ marginTop: "2.5rem", fontSize: "1.2rem" }}>
          These challenges exist regardless of which tools you use.
        </p>
      </ClickReveal>
    </div>
  );
}
