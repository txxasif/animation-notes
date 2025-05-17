// Documentation content for Three.js examples
export const threeJsDocs: Record<string, string> = {
  "basic-setup": `# Basic Three.js Scene Setup

This example demonstrates how to set up a basic Three.js scene with React Three Fiber.

## Core Concepts

- **Canvas**: The container for your 3D scene
- **Scene**: The 3D space where you place objects
- **Camera**: Defines the viewpoint
- **Mesh**: Combination of geometry and material
- **Lighting**: Essential for materials to be visible

## Code Structure

\`\`\`jsx
<Canvas>
  <ambientLight intensity={0.5} />
  <pointLight position={[10, 10, 10]} />
  <mesh>
    <boxGeometry />
    <meshStandardMaterial color="blue" />
  </mesh>
</Canvas>
\`\`\`

## Key Points

- The Canvas component sets up the Three.js renderer
- Each 3D object is represented by a mesh with geometry and material
- Lights are important for materials to be visible
- Position and rotation are set as props
`,

  "camera-types": `# Camera Types in Three.js

This example demonstrates the different camera types available in Three.js.

## Available Cameras

1. **PerspectiveCamera**: Mimics human vision with perspective
2. **OrthographicCamera**: No perspective, used for 2D-like views
3. **CubeCamera**: Creates renders from 6 directions
4. **ArrayCamera**: Multiple cameras for split-screen effects

## PerspectiveCamera Parameters

- **FOV**: Field of view (in degrees)
- **Aspect**: Width/height ratio
- **Near**: Near clipping plane
- **Far**: Far clipping plane

## OrthographicCamera Parameters

- **Left, Right, Top, Bottom**: Bounds of the view
- **Near, Far**: Clipping planes

## Camera Controls

Three.js offers various camera controls:
- OrbitControls: Orbit around target
- TrackballControls: Similar to orbit but allows roll
- FlyControls: First-person flying
- PointerLockControls: FPS-style controls
`,

  "geometry-types": `# Geometry Types in Three.js

This example explores the various geometry types available in Three.js.

## Basic Geometries

- **BoxGeometry**: Simple cube
- **SphereGeometry**: Sphere with configurable segments
- **PlaneGeometry**: Flat 2D rectangle
- **CircleGeometry**: Flat 2D circle
- **ConeGeometry**: Cone with circular base
- **CylinderGeometry**: Cylinder with circular base

## Advanced Geometries

- **TorusGeometry**: Donut shape
- **TorusKnotGeometry**: Knot-like twisted torus
- **TubeGeometry**: Tube following a path
- **ExtrudeGeometry**: 2D shape extruded into 3D
- **LatheGeometry**: Shape revolved around an axis
- **TextGeometry**: 3D text from font

## Geometry Parameters

Most geometries accept parameters to control their detail:
- **width/height/depth**: Basic dimensions
- **widthSegments/heightSegments**: Controls mesh density
- **radius/radialSegments**: For curved surfaces
`,
};

// Documentation content for GSAP examples
export const gsapDocs: Record<string, string> = {
  animation: `# GSAP Basic Animation

This example demonstrates the fundamentals of animating with GSAP in React.

## Core Concepts

- **Timeline**: For sequencing multiple animations
- **Tweens**: Individual animations (to, from, fromTo)
- **Eases**: Control the rate of change
- **Stagger**: Offset animations in a sequence

## Basic Tween

\`\`\`jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function GsapAnimation() {
  const boxRef = useRef(null);
  
  useEffect(() => {
    // Simple animation
    gsap.to(boxRef.current, {
      x: 200,
      rotation: 360,
      duration: 2,
      ease: "elastic.out(1, 0.3)"
    });
    
    // Cleanup on unmount
    return () => {
      gsap.killTweensOf(boxRef.current);
    };
  }, []);
  
  return <div ref={boxRef} className="box"></div>;
}
\`\`\`

## Common Properties

- **duration**: Length of animation in seconds
- **delay**: Wait before starting
- **ease**: How the animation progresses
- **stagger**: Offset for multiple targets
- **repeat**: Number of times to repeat (-1 for infinite)
- **yoyo**: Reverse the animation on repeat
`,

  scroll: `# GSAP ScrollTrigger

This example demonstrates how to use GSAP's ScrollTrigger plugin for scroll-based animations.

## Setup

First, register the ScrollTrigger plugin:

\`\`\`jsx
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
\`\`\`

## Basic ScrollTrigger

\`\`\`jsx
useEffect(() => {
  gsap.to(".box", {
    x: 500,
    scrollTrigger: {
      trigger: ".box",
      start: "top center", // when top of box hits center of viewport
      end: "bottom center", // when bottom of box hits center of viewport
      scrub: true, // smoothly animates as you scroll
      markers: true // for debugging
    }
  });
  
  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);
\`\`\`

## Key Properties

- **trigger**: Element that triggers the animation
- **start/end**: When to start/end the animation
- **scrub**: Links animation progress to scroll position
- **pin**: Pins an element during the animation
- **toggleActions**: Controls play/pause/restart/etc behavior
- **markers**: Visual indicators for debugging
`,
};

// Documentation content for Framer Motion examples
export const framerMotionDocs: Record<string, string> = {
  "basic-animations": `# Basic Animations with Framer Motion

This example covers the fundamentals of animating with Framer Motion.

## Core Concepts

- **motion components**: Drop-in replacements for HTML elements
- **animate prop**: Define target animation states
- **transition prop**: Control how animations play
- **variants**: Define named animation states

## Simple Animation

\`\`\`jsx
import { motion } from 'framer-motion';

function BasicAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="box"
    />
  );
}
\`\`\`

## Common Properties

- **initial**: Starting state
- **animate**: Target state
- **exit**: State when removed
- **transition**: How the animation progresses
- **whileHover/whileTap**: States for interactions
- **drag**: Enable dragging
`,

  "gesture-animations": `# Gesture Animations with Framer Motion

This example demonstrates how to use Framer Motion's gesture animations to create interactive elements.

## Core Concepts

- **whileHover**: Animation while mouse is hovering
- **whileTap**: Animation while element is pressed
- **whileDrag**: Animation while dragging
- **drag**: Enable dragging functionality
- **dragConstraints**: Limit drag area
- **useMotionValue**: Create values that drive animations
- **useTransform**: Transform one motion value to another

## Basic Gestures

\`\`\`jsx
<motion.div
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  transition={{ type: "spring", stiffness: 400, damping: 10 }}
/>
\`\`\`

## Motion Values

\`\`\`jsx
const x = useMotionValue(0);
const scale = useTransform(x, [-100, 0, 100], [0.5, 1, 1.5]);

return (
  <motion.div
    drag="x"
    style={{ x, scale }}
    dragConstraints={{ left: -100, right: 100 }}
  />
);
\`\`\`

## Custom Gestures

You can combine gesture animations with custom state changes:

\`\`\`jsx
function MyComponent() {
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      onTapStart={() => setIsPressed(true)}
      onTap={() => console.log("Tapped!")}
      onTapEnd={() => setIsPressed(false)}
    />
  );
}
\`\`\`
`,

  "layout-animations": `# Layout Animations with Framer Motion

This example demonstrates how to animate layout changes with Framer Motion.

## Core Concepts

- **layout prop**: Automatically animate layout changes
- **layoutId**: Shared element transitions between states 
- **AnimatePresence**: Handle animations when elements are added/removed
- **SharedLayout**: Group multiple layoutId elements

## Layout Animation

The simplest way to animate layout changes is with the layout prop:

\`\`\`jsx
function LayoutAnimation() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      style={{ 
        width: isExpanded ? 300 : 100,
        height: isExpanded ? 300 : 100 
      }}
    />
  );
}
\`\`\`

## Shared Element Transitions

For more complex transitions between elements:

\`\`\`jsx
function SharedElementTransition() {
  const [selected, setSelected] = useState(null);
  
  return (
    <>
      {items.map(item => (
        <motion.div 
          layoutId={item.id}
          onClick={() => setSelected(item.id)}
        />
      ))}
      
      <AnimatePresence>
        {selected && (
          <motion.div layoutId={selected}>
            {/* Expanded view of the selected item */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
\`\`\`

## List Reordering

\`\`\`jsx
function ListReordering() {
  const [items, setItems] = useState([1, 2, 3, 4]);
  
  const shuffle = () => setItems([...items].sort(() => Math.random() - 0.5));
  
  return (
    <>
      <button onClick={shuffle}>Shuffle</button>
      <ul>
        {items.map(item => (
          <motion.li
            key={item}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </>
  );
}
\`\`\`
`,
};

// Get documentation for a specific example
export function getExampleDoc(category: string, id: string): string {
  if (category === "threejs") {
    return threeJsDocs[id] || "Documentation not available for this example.";
  } else if (category === "gsap") {
    return gsapDocs[id] || "Documentation not available for this example.";
  } else if (category === "framer-motion") {
    return (
      framerMotionDocs[id] || "Documentation not available for this example."
    );
  }

  return "Documentation not available for this category.";
}
