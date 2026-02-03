// Slide metadata and configuration
export interface SlideConfig {
  id: number;
  title: string;
  layout?: "default" | "center" | "two-column";
  steps?: number; // Number of animation steps (0 = no animations)
}

export const slides: SlideConfig[] = [
  // Section 1: The Problem & Insight (1-3)
  { id: 1, title: "Introduction to dbt", layout: "center" },
  { id: 2, title: "Why dbt was created" },
  { id: 3, title: "Software engineering practices → Analytics" },

  // Section 2: What is dbt (4)
  { id: 4, title: "What is dbt?" },

  // Section 3: Demo (5)
  { id: 5, title: "Let's see it in action", layout: "center" },

  // Section 4: Getting Started - Basics (6-14)
  { id: 6, title: "Project setup" },
  { id: 7, title: "Starting point: Raw SQL" },
  { id: 8, title: "Step 1: Put your SQL in models/", steps: 1 },
  { id: 9, title: "Step 2: Define your sources", steps: 1 },
  { id: 10, title: "Step 3: Create staging models" },
  { id: 11, title: "Step 4: Use ref() for dependencies", steps: 1 },
  { id: 12, title: "Step 5: Add tests", steps: 1 },
  { id: 13, title: "Step 6: Document your models" },
  { id: 14, title: "How dbt runs" },

  // Section 5: Going Further (15-20)
  { id: 15, title: "Going further", layout: "center" },
  { id: 16, title: "Macros" },
  { id: 17, title: "Custom tests" },
  { id: 18, title: "Semantic models" },
  { id: 19, title: "Incremental models" },
  { id: 20, title: "Snapshots" },

  // Section 6: Wrap-up (21-22)
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
