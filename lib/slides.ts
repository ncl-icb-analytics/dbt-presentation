// Slide metadata and configuration
export interface SlideConfig {
  id: number;
  title: string;
  layout?: "default" | "center" | "two-column";
  steps?: number; // Number of animation steps (0 = no animations)
}

export const slides: SlideConfig[] = [
  // Section 1: Problem Context (1-4)
  { id: 1, title: "From SQL Scripts to Data Pipelines with dbt", layout: "center" },
  { id: 2, title: "Stored procedures: The traditional approach" },
  { id: 3, title: "The transformation layer", steps: 1 },
  { id: 4, title: "The observability problem", steps: 5 },

  // Section 2: Introducing dbt (5-7)
  { id: 5, title: "Enter dbt", steps: 5 },
  { id: 6, title: "Where dbt fits" },
  { id: 7, title: "Let's see it in action", layout: "center" },

  // Section 3: Getting Started - Basics (8-16)
  { id: 8, title: "Project setup" },
  { id: 9, title: "Starting point: Raw SQL" },
  { id: 10, title: "Step 1: Put your SQL in models/", steps: 1 },
  { id: 11, title: "Step 2: Define your sources", steps: 1 },
  { id: 12, title: "Step 3: Create staging models" },
  { id: 13, title: "Step 4: Use ref() for dependencies", steps: 1 },
  { id: 14, title: "Step 5: Add tests", steps: 1 },
  { id: 15, title: "Step 6: Document your models" },
  { id: 16, title: "How dbt runs" },

  // Section 4: Going Further (17-20)
  { id: 17, title: "Going further", layout: "center" },
  { id: 18, title: "Semantic models" },
  { id: 19, title: "Incremental models" },
  { id: 20, title: "Snapshots" },

  // Section 5: Wrap-up (21-22)
  { id: 21, title: "What we covered" },
  { id: 22, title: "Questions?", layout: "center" },
];

export const totalSlides = slides.length;

export function getSlide(id: number): SlideConfig | undefined {
  return slides.find((s) => s.id === id);
}

export function getNextSlideId(currentId: number): number | null {
  const idx = slides.findIndex((s) => s.id === currentId);
  if (idx === -1 || idx === slides.length - 1) return null;
  return slides[idx + 1].id;
}

export function getPrevSlideId(currentId: number): number | null {
  const idx = slides.findIndex((s) => s.id === currentId);
  if (idx <= 0) return null;
  return slides[idx - 1].id;
}
