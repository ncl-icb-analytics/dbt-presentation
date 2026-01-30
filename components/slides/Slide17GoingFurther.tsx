"use client";

import { motion } from "framer-motion";

export default function Slide19GoingFurther() {
  return (
    <div className="slide slide-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          fontSize: "3.5rem",
          fontWeight: 700,
          marginBottom: "1.5rem",
        }}
      >
        Going further
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          fontSize: "1.4rem",
          color: "#94a3b8",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        Semantic models, incremental builds, and snapshots
      </motion.p>
    </div>
  );
}
