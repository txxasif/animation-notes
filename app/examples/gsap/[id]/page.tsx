"use client";

import React from "react";
import { useParams } from "next/navigation";
import ExamplePage from "@/components/ExamplePage";
import { useGsapStore } from "@/store/gsapStore";

type ExampleId =
  | "animation"
  | "scroll"
  | "text-animation"
  | "svg-animation"
  | "interactive-animations";

const componentPaths: Record<ExampleId, string> = {
  animation: "components/gsap/Animation",
  scroll: "components/GsapScroll",
  "text-animation": "components/gsap/TextAnimation",
  "svg-animation": "components/gsap/SvgAnimation",
  "interactive-animations": "components/gsap/InteractiveAnimations",
};

export default function GsapExamplePage() {
  const params = useParams();
  const id = params.id as string;

  const examples = useGsapStore((state) => state.examples);

  if (!(id in examples)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold mb-4">Example Not Found</h1>
          <p className="mb-4">The requested GSAP example could not be found.</p>
          <a
            href="/examples"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Examples
          </a>
        </div>
      </div>
    );
  }

  const example = examples[id];

  return (
    <ExamplePage
      category="gsap"
      id={id}
      componentPath={example.path}
      explanation={example.explanation}
      mdPath={example.mdPath}
    />
  );
}
