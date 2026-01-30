import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamic imports for each slide to optimize bundle (bundle-dynamic-imports)
const slideComponents: Record<number, React.ComponentType> = {
  // Section 1: Problem Context (1-4)
  1: dynamic(() => import("./slides/Slide01Title")),
  2: dynamic(() => import("./slides/Slide02StoredProcs")),
  3: dynamic(() => import("./slides/Slide03TransformationLayer")),
  4: dynamic(() => import("./slides/Slide04Observability")),

  // Section 2: Introducing dbt (5-7)
  5: dynamic(() => import("./slides/Slide05EnterDbt")),
  6: dynamic(() => import("./slides/Slide06WhereDbtFits")),
  7: dynamic(() => import("./slides/Slide07InAction")),

  // Section 3: Getting Started - Basics (8-16)
  8: dynamic(() => import("./slides/Slide08ProjectSetup")),
  9: dynamic(() => import("./slides/Slide09RawSQL")),
  10: dynamic(() => import("./slides/Slide10DbtModel")),
  11: dynamic(() => import("./slides/Slide11Sources")),
  12: dynamic(() => import("./slides/Slide12StagingModels")),
  13: dynamic(() => import("./slides/Slide13UseRef")),
  14: dynamic(() => import("./slides/Slide14Tests")),
  15: dynamic(() => import("./slides/Slide15DocumentModels")),
  16: dynamic(() => import("./slides/Slide16DbtExecution")),

  // Section 4: Going Further (17-20)
  17: dynamic(() => import("./slides/Slide17GoingFurther")),
  18: dynamic(() => import("./slides/Slide18SemanticModels")),
  19: dynamic(() => import("./slides/Slide19IncrementalModels")),
  20: dynamic(() => import("./slides/Slide20Snapshots")),

  // Section 5: Wrap-up (21-22)
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
