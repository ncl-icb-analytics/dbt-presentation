"use client";

import ClickReveal from "../ClickReveal";

export default function Slide04Observability() {
  return (
    <div className="slide">
      <h2>The observability problem</h2>
      <p>When things go wrong, how do you know?</p>

      <ul>
        <ClickReveal step={1}>
          <li>Each procedure would need to log to a common table</li>
        </ClickReveal>
        <ClickReveal step={2}>
          <li>Everyone has to follow the same logging convention</li>
        </ClickReveal>
        <ClickReveal step={3}>
          <li>In practice, people don&apos;t – or they do it inconsistently</li>
        </ClickReveal>
        <ClickReveal step={4}>
          <li>Testing? Usually manual spot checks, if any</li>
        </ClickReveal>
      </ul>

      <ClickReveal step={5}>
        <p style={{ marginTop: "2rem" }}>
          At scale, you need observability and testing baked in – not bolted on.
        </p>
      </ClickReveal>
    </div>
  );
}
