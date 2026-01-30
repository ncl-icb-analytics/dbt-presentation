import { notFound } from "next/navigation";
import { getSlide, totalSlides } from "@/lib/slides";
import SlideRenderer from "@/components/SlideRenderer";
import SlideNavigation from "@/components/SlideNavigation";
import ProgressBar from "@/components/ProgressBar";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SlidePage({ params }: PageProps) {
  const { id } = await params;
  const slideId = parseInt(id, 10);

  if (isNaN(slideId) || !getSlide(slideId)) {
    notFound();
  }

  const slide = getSlide(slideId)!;

  return (
    <>
      <ProgressBar current={slideId} total={totalSlides} />
      <SlideNavigation slideId={slideId} totalSteps={slide.steps ?? 0}>
        <SlideRenderer slideId={slideId} />
      </SlideNavigation>
    </>
  );
}

export async function generateStaticParams() {
  const { slides } = await import("@/lib/slides");
  return slides.map((slide) => ({
    id: slide.id.toString(),
  }));
}
