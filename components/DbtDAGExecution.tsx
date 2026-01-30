"use client";

import { useEffect, useState, useMemo, useCallback, forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";

export interface DbtDAGExecutionHandle {
  execute: () => void;
}

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  dependencies: string[];
  fails?: boolean;
}

interface LogEntry {
  text: string;
  status: "running" | "ok" | "error" | "warn";
  timestamp: number;
}

interface DbtDAGExecutionProps {
  command?: "run" | "build" | "test";
  onComplete?: () => void;
}

// DAG nodes for execution visualization
function generateNodes(): Node[] {
  const nodes: Node[] = [];
  const layers = [
    { prefix: "stg", count: 3, y: 0, labels: ["stg_observation", "stg_person", "stg_medication"] },
    { prefix: "int", count: 4, y: 140, labels: ["int_bp_latest", "int_htn_dx", "int_meds", "int_labs"] },
    { prefix: "fct", count: 3, y: 280, labels: ["fct_htn_register", "fct_polypharmacy", "fct_qof"] },
    { prefix: "rpt", count: 3, y: 420, labels: ["rpt_practice", "rpt_meds_review", "rpt_icb"] },
  ];

  const width = 680;

  layers.forEach((layer, layerIdx) => {
    const spacing = width / (layer.count + 1);
    for (let i = 0; i < layer.count; i++) {
      const id = `${layer.prefix}${i}`;
      const deps: string[] = [];

      if (layerIdx === 1) {
        // int depends on staging
        if (i === 0) deps.push("stg0"); // int_bp_latest <- stg_observation
        if (i === 1) deps.push("stg0", "stg1"); // int_htn_dx <- stg_observation, stg_person
        if (i === 2) deps.push("stg2"); // int_meds <- stg_medication
        if (i === 3) deps.push("stg0", "stg1"); // int_labs <- stg_observation, stg_person
      } else if (layerIdx === 2) {
        // fct depends on int
        if (i === 0) deps.push("int0", "int1"); // fct_htn_register <- int_bp_latest, int_htn_dx
        if (i === 1) deps.push("int2"); // fct_polypharmacy <- int_meds (test fails here!)
        if (i === 2) deps.push("int1", "int3"); // fct_qof <- int_htn_dx, int_labs
      } else if (layerIdx === 3) {
        // rpt depends on fct
        if (i === 0) deps.push("fct0", "fct2"); // rpt_practice <- fct_htn_register, fct_qof (succeeds!)
        if (i === 1) deps.push("fct1"); // rpt_meds_review <- fct_polypharmacy (will skip!)
        if (i === 2) deps.push("fct0", "fct1"); // rpt_icb <- fct_htn_register, fct_polypharmacy (will skip!)
      }

      nodes.push({
        id,
        label: layer.labels[i],
        x: spacing * (i + 1) - 65,
        y: layer.y,
        dependencies: deps,
      });
    }
  });

  return nodes;
}

const nodes = generateNodes();

const DbtDAGExecution = forwardRef<DbtDAGExecutionHandle, DbtDAGExecutionProps>(function DbtDAGExecution({ command = "run", onComplete }, ref) {
  const [completedNodes, setCompletedNodes] = useState<Set<string>>(new Set());
  const [runningNodes, setRunningNodes] = useState<Set<string>>(new Set());
  const [failedNodes, setFailedNodes] = useState<Set<string>>(new Set());
  const [skippedNodes, setSkippedNodes] = useState<Set<string>>(new Set());
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const nodeWidth = 130;
  const nodeHeight = 40;
  const width = 720;
  const height = 480;

  const edges = useMemo(() => {
    const result: { from: Node; to: Node }[] = [];
    nodes.forEach(node => {
      node.dependencies.forEach(depId => {
        const dep = nodes.find(n => n.id === depId);
        if (dep) result.push({ from: dep, to: node });
      });
    });
    return result;
  }, []);

  const resetAnimation = useCallback(() => {
    setCompletedNodes(new Set());
    setRunningNodes(new Set());
    setFailedNodes(new Set());
    setSkippedNodes(new Set());
    setLogs([]);
    setIsRunning(false);
    setHasRun(false);
  }, []);

  const executeCommand = useCallback(() => {
    setCompletedNodes(new Set());
    setRunningNodes(new Set());
    setFailedNodes(new Set());
    setSkippedNodes(new Set());
    setLogs([]);
    setIsRunning(true);
    setHasRun(true);
    setAnimKey(k => k + 1);
  }, []);

  // Expose execute function via ref
  useImperativeHandle(ref, () => ({
    execute: executeCommand,
  }), [executeCommand]);

  // Reset when command changes
  useEffect(() => {
    resetAnimation();
  }, [command, resetAnimation]);

  useEffect(() => {
    if (!isRunning) return;

    const timeouts: NodeJS.Timeout[] = [];
    const failedSet = new Set<string>();
    const skippedSet = new Set<string>();

    const addLog = (text: string, status: LogEntry["status"], delay: number) => {
      timeouts.push(setTimeout(() => {
        setLogs(prev => [...prev, { text, status, timestamp: Date.now() }]);
      }, delay));
    };

    // Check if a node should be skipped (has a failed dependency)
    const shouldSkip = (node: Node): boolean => {
      return node.dependencies.some(dep => failedSet.has(dep) || skippedSet.has(dep));
    };

    // Calculate execution order (topological sort)
    const executed = new Set<string>();
    const order: string[] = [];
    const canExecute = (node: Node) =>
      node.dependencies.every(dep => executed.has(dep));

    while (order.length < nodes.length) {
      for (const node of nodes) {
        if (!executed.has(node.id) && canExecute(node)) {
          order.push(node.id);
          executed.add(node.id);
        }
      }
    }

    let time = 500;
    let modelNum = 1;
    const total = nodes.length;
    let passedCount = 0;
    let errorCount = 0;
    let skipCount = 0;

    if (command === "test") {
      // dbt test: only run tests, no model execution
      const testFailsOn = "int_meds";
      const noTests = "stg_person"; // This model has no tests

      nodes.forEach((node) => {
        // Skip models without tests
        if (node.label === noTests) return;

        const startTime = time;
        const testFails = node.label === testFailsOn;

        addLog(`Testing ${node.label}...`, "running", startTime);

        const duration = 200 + Math.random() * 200;

        timeouts.push(setTimeout(() => {
          if (testFails) {
            setFailedNodes(prev => new Set([...prev, node.id]));
          } else {
            setCompletedNodes(prev => new Set([...prev, node.id]));
          }
        }, startTime + duration));

        if (testFails) {
          errorCount++;
          addLog(`${node.label}: FAIL (not_null)`, "error", startTime + duration + 50);
        } else {
          passedCount++;
          addLog(`${node.label}: PASS`, "ok", startTime + duration + 50);
        }

        time += duration * 0.6;
      });

      addLog("", "ok", time + 200);
      addLog(`Finished: ${passedCount} passed, ${errorCount} failed`, errorCount > 0 ? "error" : "ok", time + 300);
    } else {
      // dbt run or dbt build: execute models
      let testsPassed = 0;
      let testsFailed = 0;
      const testFailsOn = "int_meds"; // This model's test will fail in dbt build
      const noTests = "stg_person"; // This model has no tests

      order.forEach((nodeId) => {
        const node = nodes.find(n => n.id === nodeId)!;
        const startTime = time;
        const willSkip = shouldSkip(node);

        if (willSkip) {
          skippedSet.add(nodeId);
          skipCount++;

          timeouts.push(setTimeout(() => {
            setSkippedNodes(prev => new Set([...prev, nodeId]));
          }, startTime));

          addLog(`Skipping ${node.label} (upstream failed)`, "warn", startTime);
          time += 150;
          modelNum++;
          return;
        }

        timeouts.push(setTimeout(() => {
          setRunningNodes(prev => new Set([...prev, nodeId]));
        }, startTime));

        addLog(`Running ${modelNum} of ${total}: ${node.label}...`, "running", startTime);

        const duration = 400 + Math.random() * 300;

        // For dbt run: all models succeed
        // For dbt build: model succeeds, but test might fail
        timeouts.push(setTimeout(() => {
          setRunningNodes(prev => {
            const next = new Set(prev);
            next.delete(nodeId);
            return next;
          });
          setCompletedNodes(prev => new Set([...prev, nodeId]));
        }, startTime + duration));

        passedCount++;
        addLog(`${node.label}... OK (${(duration / 1000).toFixed(1)}s)`, "ok", startTime + duration + 50);

        time += duration * 0.7;

        // For dbt build, run tests inline after each model (if model has tests)
        if (command === "build" && node.label !== noTests) {
          const testTime = time + 100;
          const testDuration = 150;
          const testFails = node.label === testFailsOn;

          if (testFails) {
            // Test fails - mark node as failed, add to failedSet for downstream skipping
            testsFailed++;
            addLog(`  testing ${node.label}... FAIL (not_null)`, "error", testTime + testDuration);
            failedSet.add(nodeId);
            timeouts.push(setTimeout(() => {
              setCompletedNodes(prev => {
                const next = new Set(prev);
                next.delete(nodeId);
                return next;
              });
              setFailedNodes(prev => new Set([...prev, nodeId]));
            }, testTime + testDuration));
          } else {
            testsPassed++;
            addLog(`  testing ${node.label}... PASS`, "ok", testTime + testDuration);
          }
          time += testDuration + 50;
        }

        modelNum++;
      });

      addLog("", "ok", time + 200);
      const summary = command === "build"
        ? `Done: ${passedCount} models, ${testsFailed} test failed, ${skipCount} skipped`
        : `Completed: ${passedCount} passed, ${skipCount} skipped`;
      addLog(summary, testsFailed > 0 ? "error" : "ok", time + 300);
    }

    timeouts.push(setTimeout(() => {
      setIsRunning(false);
      onComplete?.();
    }, time + 500));

    return () => timeouts.forEach(t => clearTimeout(t));
  }, [animKey, command, isRunning, onComplete]);

  const getNodeStatus = (node: Node) => {
    if (failedNodes.has(node.id)) return "failed";
    if (skippedNodes.has(node.id)) return "skipped";
    if (completedNodes.has(node.id)) return "complete";
    if (runningNodes.has(node.id)) return "running";
    return "pending";
  };

  const getNodeColor = (status: string) => {
    switch (status) {
      case "complete": return "#22c55e";
      case "running": return "#3b82f6";
      case "failed": return "#ef4444";
      case "skipped": return "#64748b";
      default: return "#334155";
    }
  };

  const getEdgeStatus = (from: Node, to: Node) => {
    const fromFailed = failedNodes.has(from.id);
    const fromSkipped = skippedNodes.has(from.id);
    const fromComplete = completedNodes.has(from.id);
    const toActive = runningNodes.has(to.id) || completedNodes.has(to.id) || failedNodes.has(to.id) || skippedNodes.has(to.id);

    // Grey out edges from failed or skipped nodes
    if (fromFailed || fromSkipped) return "failed";
    if ((fromComplete) && toActive) return "active";
    if (fromComplete) return "ready";
    return "pending";
  };

  return (
    <div style={{ display: "flex", gap: "1rem", height: "700px" }}>
      {/* DAG Visualization */}
      <div style={{
        flex: 1,
        background: "rgba(0,0,0,0.2)",
        borderRadius: "0.75rem",
        padding: "0.75rem",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
      }}>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            style={{ overflow: "visible" }}
          >
            {/* Draw edges */}
            {edges.map(({ from, to }, i) => {
              const status = getEdgeStatus(from, to);
              return (
                <motion.line
                  key={`edge-${i}`}
                  x1={from.x + nodeWidth / 2}
                  y1={from.y + nodeHeight}
                  x2={to.x + nodeWidth / 2}
                  y2={to.y}
                  stroke={status === "active" ? "#22c55e" : status === "ready" ? "#3b82f6" : status === "failed" ? "#64748b" : "#334155"}
                  strokeWidth={1.5}
                  strokeOpacity={status === "pending" ? 0.3 : 0.8}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                />
              );
            })}

            {/* Draw nodes */}
            {nodes.map((node, i) => {
              const status = getNodeStatus(node);
              const fill = getNodeColor(status);

              return (
                <motion.g
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  <motion.rect
                    x={node.x}
                    y={node.y}
                    width={nodeWidth}
                    height={nodeHeight}
                    rx={4}
                    fill={fill}
                    animate={{ fill }}
                    transition={{ duration: 0.3 }}
                  />
                  {status === "running" && (
                    <motion.rect
                      x={node.x}
                      y={node.y}
                      width={nodeWidth}
                      height={nodeHeight}
                      rx={4}
                      fill="none"
                      stroke="#60a5fa"
                      strokeWidth={2}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    />
                  )}
                  <text
                    x={node.x + nodeWidth / 2}
                    y={node.y + nodeHeight / 2 + 3}
                    textAnchor="middle"
                    fill="white"
                    fontSize={9}
                    fontFamily="var(--font-mono), monospace"
                  >
                    {node.label}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Terminal Log */}
      <div style={{
        width: "300px",
        background: "#0d1117",
        borderRadius: "0.75rem",
        border: "1px solid #30363d",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
        <div style={{
          padding: "0.4rem 0.6rem",
          background: "#161b22",
          borderBottom: "1px solid #30363d",
          fontSize: "0.7rem",
          color: "#8b949e",
          fontFamily: "var(--font-mono), monospace",
        }}>
          dbt {command}
        </div>
        <div style={{
          flex: 1,
          padding: "0.5rem",
          overflowY: "auto",
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.7rem",
          lineHeight: 1.6,
        }}>
          {logs.map((log, i) => (
            <div key={i} style={{
              color: log.status === "error" ? "#f85149"
                : log.status === "warn" ? "#d29922"
                : log.status === "ok" ? "#3fb950"
                : "#8b949e",
            }}>
              {log.text}
            </div>
          ))}
          <span style={{ color: "#58a6ff", opacity: 0.6 }}>_</span>
        </div>
      </div>
    </div>
  );
});

export default DbtDAGExecution;
