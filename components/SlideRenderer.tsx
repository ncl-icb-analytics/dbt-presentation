import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamic imports for each slide to optimize bundle (bundle-dynamic-imports)
const slideComponents: Record<number, React.ComponentType> = {
  // Section 1: The Problem & Insight (1-3)
  1: dynamic(() => import("./slides/Slide01Title")),
  2: dynamic(() => import("./slides/Slide03WhyDbtExists")),
  3: dynamic(() => import("./slides/Slide03HowDbtHelps")),

  // Section 2: What is dbt (4)
  4: dynamic(() => import("./slides/Slide04WhatIsDbt")),

  // Section 3: Demo (5)
  5: dynamic(() => import("./slides/Slide07InAction")),

  // Section 4: Getting Started - Basics (6-14)
  6: dynamic(() => import("./slides/Slide08ProjectSetup")),
  7: dynamic(() => import("./slides/Slide09RawSQL")),
  8: dynamic(() => import("./slides/Slide10DbtModel")),
  9: dynamic(() => import("./slides/Slide11Sources")),
  10: dynamic(() => import("./slides/Slide12StagingModels")),
  11: dynamic(() => import("./slides/Slide13UseRef")),
  12: dynamic(() => import("./slides/Slide14Tests")),
  13: dynamic(() => import("./slides/Slide15DocumentModels")),
  14: dynamic(() => import("./slides/Slide16DbtExecution")),

  // Section 5: Going Further (15-20)
  15: dynamic(() => import("./slides/Slide17GoingFurther")),
  16: dynamic(() => import("./slides/Slide18Macros")),
  17: dynamic(() => import("./slides/Slide19CustomTests")),
  18: dynamic(() => import("./slides/Slide18SemanticModels")),
  19: dynamic(() => import("./slides/Slide19IncrementalModels")),
  20: dynamic(() => import("./slides/Slide20Snapshots")),

  // Section 6: Wrap-up (21-22)
  21: dynamic(() => import("./slides/Slide21Recap")),
  22: dynamic(() => import("./slides/Slide22Questions")),
};

interface SlideRendererProps {
  slideId: number;
}

function SlideLoading() {
  return (
    <div className="slide slide-center">
      <div className="animate-pulse text-muted">Loading...</div>
    </div>
  );
}

export default function SlideRenderer({ slideId }: SlideRendererProps) {
  const SlideComponent = slideComponents[slideId];

  if (!SlideComponent) {
    return (
      <div className="slide slide-center">
        <h1>Slide not found</h1>
      </div>
    );
  }

  return (
    <Suspense fallback={<SlideLoading />}>
      <SlideComponent />
    </Suspense>
  );
}
