"use client";

import { useEffect, useState } from "react";
import { ShikiMagicMove } from "shiki-magic-move/react";
import { useSlideContext } from "./SlideNavigation";
import type { HighlighterCore } from "shiki";
import { createHighlighter } from "shiki";
import "shiki-magic-move/dist/style.css";

interface MagicMoveCodeProps {
  steps: string[];
  lang?: string;
  filename?: string;
}

export default function MagicMoveCode({
  steps,
  lang = "sql",
  filename,
}: MagicMoveCodeProps) {
  const { currentStep } = useSlideContext();
  const [highlighter, setHighlighter] = useState<HighlighterCore | null>(null);

  useEffect(() => {
    createHighlighter({
      themes: ["github-dark"],
      langs: ["sql", "yaml", "bash"],
    }).then(setHighlighter);
  }, []);

  const codeIndex = Math.min(currentStep, steps.length - 1);
  const code = steps[codeIndex];

  if (!highlighter) {
    return (
      <div className="code-wrapper">
        {filename && <div className="code-filename">{filename}</div>}
        <div className="code-block-loading">
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="code-wrapper">
      {filename && <div className="code-filename">{filename}</div>}
      <div className="code-block-inner">
        <ShikiMagicMove
          lang={lang}
          theme="github-dark"
          highlighter={highlighter}
          code={code}
          options={{
            duration: 500,
            stagger: 2,
            lineNumbers: false,
          }}
        />
      </div>
    </div>
  );
}
