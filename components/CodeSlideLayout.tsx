"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { ShikiMagicMove } from "shiki-magic-move/react";
import type { HighlighterCore } from "shiki";
import { createHighlighter } from "shiki";
import { motion, AnimatePresence } from "framer-motion";
import "shiki-magic-move/dist/style.css";

export interface TreeFile {
  name: string;
  path: string;
  type: "file" | "folder";
  lang?: string;
  children?: TreeFile[];
}

interface CodeSlideLayoutProps {
  files: TreeFile[];
  activeFile: string;
  code: string;
  lang?: string;
  projectName?: string;
  highlightLines?: number[]; // 1-indexed line numbers to highlight
}

function FolderIcon({ open }: { open?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ opacity: 0.7 }}>
      {open ? (
        <path d="M.513 1.513A1.75 1.75 0 0 1 1.75 1h3.5c.55 0 1.07.26 1.4.7l.9 1.2a.25.25 0 0 0 .2.1h6.5A1.75 1.75 0 0 1 16 4.75v8.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25V2.75c0-.464.184-.91.513-1.237ZM1.75 2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25H7.5c-.55 0-1.07-.26-1.4-.7l-.9-1.2a.25.25 0 0 0-.2-.1h-3.5a.25.25 0 0 0-.25.25Z" />
      ) : (
        <path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75Z" />
      )}
    </svg>
  );
}

function FileIcon({ name, lang }: { name: string; lang?: string }) {
  // SQL files - orange database icon
  if (lang === "sql" || name.endsWith(".sql")) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4z" fill="#e38c00" fillOpacity="0.2"/>
        <ellipse cx="12" cy="7" rx="8" ry="4" stroke="#e38c00" strokeWidth="1.5"/>
        <path d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7" stroke="#e38c00" strokeWidth="1.5"/>
        <path d="M4 12c0 2.21 3.58 4 8 4s8-1.79 8-4" stroke="#e38c00" strokeWidth="1.5"/>
      </svg>
    );
  }

  // YAML files - red/pink config icon
  if (lang === "yaml" || name.endsWith(".yml") || name.endsWith(".yaml")) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        <rect x="3" y="3" width="18" height="18" rx="2" fill="#cb171e" fillOpacity="0.15" stroke="#cb171e" strokeWidth="1.5"/>
        <path d="M7 8h4M7 12h10M7 16h6" stroke="#cb171e" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
  }

  // Default file icon
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="#6e7681" fillOpacity="0.15" stroke="#6e7681" strokeWidth="1.5"/>
      <path d="M14 2v6h6" stroke="#6e7681" strokeWidth="1.5"/>
    </svg>
  );
}

function TreeNode({
  node,
  depth,
  activePath,
}: {
  node: TreeFile;
  depth: number;
  activePath: string;
}) {
  const isActive = node.path === activePath;
  const hasActiveChild = activePath.startsWith(node.path + "/");
  const indent = depth * 12;

  if (node.type === "folder") {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="tree-item tree-folder"
          style={{ paddingLeft: `${indent + 8}px` }}
        >
          <FolderIcon open={hasActiveChild || isActive} />
          <span>{node.name}</span>
        </motion.div>
        <AnimatePresence>
          {node.children?.map((child, i) => (
            <motion.div
              key={child.path}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
            >
              <TreeNode
                node={child}
                depth={depth + 1}
                activePath={activePath}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className={`tree-item tree-file ${isActive ? "active" : ""}`}
      style={{ paddingLeft: `${indent + 8}px` }}
    >
      <FileIcon name={node.name} lang={node.lang} />
      <span>{node.name}</span>
    </motion.div>
  );
}

export default function CodeSlideLayout({
  files,
  activeFile,
  code,
  lang = "sql",
  projectName = "dbt-ncl-analytics",
  highlightLines = [],
}: CodeSlideLayoutProps) {
  const [highlighter, setHighlighter] = useState<HighlighterCore | null>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    createHighlighter({
      themes: ["github-dark"],
      langs: ["sql", "yaml", "bash"],
    }).then(setHighlighter);
  }, []);

  // Highlight lines using MutationObserver for reliable timing
  useEffect(() => {
    if (!codeRef.current) return;

    const applyHighlights = () => {
      const lines = codeRef.current?.querySelectorAll(".shiki-magic-move-line");
      if (!lines?.length) return;

      lines.forEach((el, i) => {
        if (highlightLines.includes(i + 1)) {
          el.classList.add("highlighted");
        } else {
          el.classList.remove("highlighted");
        }
      });
    };

    // Apply after a short delay to let ShikiMagicMove render
    const timeoutId = setTimeout(applyHighlights, 100);

    // Also watch for DOM changes to handle animations
    const observer = new MutationObserver(applyHighlights);
    observer.observe(codeRef.current, { childList: true, subtree: true });

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [highlightLines, code]);

  const trimmedCode = useMemo(() => code.trim(), [code]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        width: "100%",
        minHeight: "400px",
        maxHeight: "65vh",
        border: "1px solid var(--border)",
        borderRadius: "0.75rem",
        overflow: "hidden",
      }}
    >
      <div className="code-slide-tree" style={{ border: "none", borderRadius: 0, borderRight: "1px solid var(--border)" }}>
        <div className="code-slide-tree-header">{projectName}</div>
        <div className="code-slide-tree-content">
          {/* Sort: folders first, then files */}
          <AnimatePresence mode="wait">
            {[...files]
              .sort((a, b) => {
                if (a.type === "folder" && b.type !== "folder") return -1;
                if (a.type !== "folder" && b.type === "folder") return 1;
                return 0;
              })
              .map((node, i) => (
                <motion.div
                  key={node.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                >
                  <TreeNode node={node} depth={0} activePath={activeFile} />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="code-slide-viewer" style={{ border: "none", borderRadius: 0 }}>
        <div className="code-filename">{activeFile}</div>
        <div className="code-block-inner" ref={codeRef}>
          {highlighter ? (
            <ShikiMagicMove
              lang={lang}
              theme="github-dark"
              highlighter={highlighter}
              code={trimmedCode}
              options={{
                duration: 500,
                stagger: 2,
                lineNumbers: true,
              }}
            />
          ) : (
            <pre>
              <code>{trimmedCode}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
