import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamic imports for each slide to optimize bundle (bundle-dynamic-imports)
const slideComponents: Record<number, React.ComponentType> = {
  // Section 1: Context & Framing (1-4)
  1: dynamic(() => import("./slides/Slide01Title")),
  2: dynamic(() => import("./slides/Slide02Requirements")),
  3: dynamic(() => import("./slides/Slide03ADLC")),
  4: dynamic(() => import("./slides/Slide03Roles")),

  // Section 2: The Problem & Solution (5-8)
  5: dynamic(() => import("./slides/Slide04TransformationLayer")),
  6: dynamic(() => import("./slides/Slide04Observability")),
  7: dynamic(() => import("./slides/Slide06WhereDbtFits")),
  8: dynamic(() => import("./slides/Slide05EnterDbt")),

  // Section 3: Demo (9)
  9: dynamic(() => import("./slides/Slide07InAction")),

  // Section 3: Getting Started - Basics (10-18)
  10: dynamic(() => import("./slides/Slide08ProjectSetup")),
  11: dynamic(() => import("./slides/Slide09RawSQL")),
  12: dynamic(() => import("./slides/Slide10DbtModel")),
  13: dynamic(() => import("./slides/Slide11Sources")),
  14: dynamic(() => import("./slides/Slide12StagingModels")),
  15: dynamic(() => import("./slides/Slide13UseRef")),
  16: dynamic(() => import("./slides/Slide14Tests")),
  17: dynamic(() => import("./slides/Slide15DocumentModels")),
  18: dynamic(() => import("./slides/Slide16DbtExecution")),

  // Section 4: Going Further (19-24)
  19: dynamic(() => import("./slides/Slide17GoingFurther")),
  20: dynamic(() => import("./slides/Slide18Macros")),
  21: dynamic(() => import("./slides/Slide19CustomTests")),
  22: dynamic(() => import("./slides/Slide18SemanticModels")),
  23: dynamic(() => import("./slides/Slide19IncrementalModels")),
  24: dynamic(() => import("./slides/Slide20Snapshots")),

  // Section 5: Wrap-up (25-26)
  25: dynamic(() => import("./slides/Slide21Recap")),
  26: dynamic(() => import("./slides/Slide22Questions")),
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
