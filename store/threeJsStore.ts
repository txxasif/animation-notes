import { create } from "zustand";

// Define the structure for the Three.js examples
export interface ThreeJsExample {
  id: string;
  title: string;
  path: string;
  explanation: string; // Keep explanation for fallback
  mdPath: string; // Add mdPath for markdown documentation
}

// Define the Three.js store structure
interface ThreeJsState {
  examples: Record<string, ThreeJsExample>;
  updateExample: (id: string, example: ThreeJsExample) => void;
}

// Create the Three.js store
export const useThreeJsStore = create<ThreeJsState>((set) => ({
  examples: {
    "basic-setup": {
      id: "basic-setup",
      title: "1. Basic Setup",
      path: "components/1. ThreeJs/1.BasicSetup",
      explanation: `This example demonstrates how to set up a basic Three.js scene using React Three Fiber.`,
      mdPath: "/docs/threejs/basic-setup.md",
    },
    "camera-types": {
      id: "camera-types",
      title: "2. Camera Types",
      path: "components/1. ThreeJs/2.CameraTypes",
      explanation: `This example showcases the different camera types available in Three.js.`,
      mdPath: "/docs/threejs/camera-types.md",
    },
    "geometry-types": {
      id: "geometry-types",
      title: "3. Geometry Types",
      path: "components/1. ThreeJs/3.GeometryTypes",
      explanation: `This example displays various geometry primitives available in Three.js.`,
      mdPath: "/docs/threejs/geometry-types.md",
    },
    "lighting-types": {
      id: "lighting-types",
      title: "4. Lighting Types",
      path: "components/1. ThreeJs/4.LightingTypes",
      explanation: `This example demonstrates different lighting types in Three.js.`,
      mdPath: "/docs/threejs/lighting-types.md",
    },
    "custom-geometry": {
      id: "custom-geometry",
      title: "5. Custom Geometry",
      path: "components/1. ThreeJs/5.CustomGeometry",
      explanation: `This example shows how to create custom geometries in Three.js.`,
      mdPath: "/docs/threejs/custom-geometry.md",
    },
    "animation-interactivity": {
      id: "animation-interactivity",
      title: "6. Animation & Interactivity",
      path: "components/1. ThreeJs/6.AnimationAndInteractivity",
      explanation: `This example demonstrates animation and interactivity in Three.js.`,
      mdPath: "/docs/threejs/animation-interactivity.md",
    },
    "performance-optimization": {
      id: "performance-optimization",
      title: "7. Performance Optimization",
      path: "components/1. ThreeJs/7.PerformanceOptimization",
      explanation: `This example covers techniques for optimizing Three.js applications.`,
      mdPath: "/docs/threejs/performance-optimization.md",
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
