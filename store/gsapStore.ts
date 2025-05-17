import { create } from "zustand";

export interface GsapExample {
  id: string;
  title: string;
  path: string;
  explanation: string;
  mdPath: string;
}
interface GsapState {
  examples: Record<string, GsapExample>;
  updateExample: (id: string, example: GsapExample) => void;
}

export const useGsapStore = create<GsapState>((set) => ({
  examples: {
    animation: {
      id: "animation",
      title: "Basic Animation",
      path: "components/2. Gsap/1.Animation",
      explanation: "This example demonstrates basic GSAP animations in React.",
      mdPath: "/docs/gsap/animation.md",
    },
    scroll: {
      id: "scroll",
      title: "Scroll Animations",
      path: "components/2. Gsap/2.GsapScroll",
      explanation:
        "This example demonstrates scroll-based animations with GSAP ScrollTrigger.",
      mdPath: "/docs/gsap/scroll.md",
    },
    "text-animation": {
      id: "text-animation",
      title: "Text Animation",
      path: "components/gsap/TextAnimation",
      explanation:
        "This example showcases text animation techniques with GSAP.",
      mdPath: "/docs/gsap/text-animation.md",
    },
    "svg-animation": {
      id: "svg-animation",
      title: "SVG Animation",
      path: "components/gsap/SvgAnimation",
      explanation:
        "This example demonstrates SVG animation techniques with GSAP.",
      mdPath: "/docs/gsap/svg-animation.md",
    },
    "interactive-animations": {
      id: "interactive-animations",
      title: "Interactive Animations",
      path: "components/gsap/InteractiveAnimations",
      explanation:
        "This example shows how to create interactive animations with GSAP.",
      mdPath: "/docs/gsap/interactive-animations.md",
    },
  },

  // Action to update an example
  updateExample: (id, example) =>
    set((state) => ({
      examples: {
        ...state.examples,
        [id]: example,
      },
    })),
}));
