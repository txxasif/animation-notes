import { create } from "zustand";

// Define the structure for the Framer Motion examples
export interface FramerMotionExample {
  id: string;
  title: string;
  path: string;
  explanation: string;
}

// Define the Framer Motion store structure
interface FramerMotionState {
  examples: Record<string, FramerMotionExample>;
  updateExample: (id: string, example: FramerMotionExample) => void;
}

// Create the Framer Motion store
export const useFramerMotionStore = create<FramerMotionState>((set) => ({
  examples: {
    "basic-animations": {
      id: "basic-animations",
      title: "Basic Animations",
      path: "components/3. FramerMotion/1.BasicAnimations",
      explanation: `
        This example demonstrates the basics of Framer Motion animations:
        
        - Using the motion component for simple animations
        - Defining initial, animate, and exit states
        - Working with transition properties
        - Using variants for coordinated animations
        - Creating keyframes animations
        
        Framer Motion provides a simple, declarative API for creating
        animations in React applications with minimal code.
      `,
    },
    "gesture-animations": {
      id: "gesture-animations",
      title: "Gesture Animations",
      path: "components/3. FramerMotion/2.GestureAnimations",
      explanation: `
        This example showcases gesture-based animations in Framer Motion:
        
        - Creating hover animations with whileHover
        - Implementing tap effects with whileTap
        - Using drag functionality with constraints
        - Handling focus states with whileFocus
        - Combining gestures for rich interactions
        
        Framer Motion's gesture support makes it easy to create interactive
        elements that respond naturally to user input.
      `,
    },
    "layout-animations": {
      id: "layout-animations",
      title: "Layout Animations",
      path: "components/3. FramerMotion/3.LayoutAnimations",
      explanation: `
        This example demonstrates layout animations with Framer Motion:
        
        - Using the layout prop for automatic layout animations
        - Creating shared layout animations with layoutId
        - Implementing AnimatePresence for mount/unmount animations
        - Working with list reordering animations
        - Creating complex layout transitions
        
        Framer Motion's layout animation system makes it simple to create
        smooth transitions when your UI's layout changes.
      `,
    },
    "scroll-animations": {
      id: "scroll-animations",
      title: "Scroll Animations",
      path: "components/3. FramerMotion/4.ScrollAnimations",
      explanation: `
        This example shows scroll-based animations in Framer Motion:
        
        - Using useScroll hook to create scroll-linked animations
        - Implementing scroll-triggered animations
        - Creating parallax effects
        - Building scroll progress indicators
        - Orchestrating complex scroll-based sequences
        
        Framer Motion provides tools to create engaging scroll experiences
        that bring your content to life as users explore your page.
      `,
    },
    "svg-animations": {
      id: "svg-animations",
      title: "SVG Animations",
      path: "components/3. FramerMotion/5.SvgAnimations",
      explanation: `
        This example demonstrates SVG animations with Framer Motion:
        
        - Animating SVG paths with motion.path
        - Creating path drawing animations
        - Implementing path morphing between different shapes
        - Animating SVG properties and attributes
        - Combining SVG animations with gestures
        
        Framer Motion makes it easy to bring SVG illustrations to life
        with smooth, performant animations.
      `,
    },
    "advanced-animations": {
      id: "advanced-animations",
      title: "Advanced Animations",
      path: "components/3. FramerMotion/6.AdvancedAnimations",
      explanation: `
        This example showcases advanced animation techniques with Framer Motion:
        
        - Using MotionValues for fine-grained control
        - Creating custom animation controls
        - Implementing physics-based animations
        - Building animation sequences with useCycle
        - Optimizing animations for performance
        
        These advanced techniques allow for complex, nuanced animations
        that can bring your UI to the next level.
      `,
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
