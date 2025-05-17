# Basic GSAP Animation

This example demonstrates basic GSAP animations in React, showcasing the powerful animation capabilities of the GreenSock Animation Platform.

## Key Features

- **Setting up GSAP tweens with React refs**: Learn how to target DOM elements using React refs and animate them with GSAP.
- **Creating sequential animations with timelines**: Understand how to coordinate multiple animations in sequence using GSAP timelines.
- **Various easing functions**: Explore different easing options to create natural and visually pleasing motion.
- **Staggered animations**: Create cascading animations across multiple elements with precise timing control.
- **Animation cleanup**: Properly manage and clean up animations when components unmount to prevent memory leaks.

## Code Example

```jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Animation() {
  // Create refs for elements we want to animate
  const boxRef = useRef(null);
  const circleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Create a timeline for sequenced animations
    const tl = gsap.timeline();

    // Target the box element and animate properties
    tl.to(boxRef.current, {
      x: 200,
      rotation: 360,
      duration: 1,
      ease: "back.out(1.7)",
    })

      // Next animate the circle
      .to(circleRef.current, {
        y: -100,
        scale: 1.5,
        duration: 0.8,
        ease: "bounce.out",
      })

      // Create staggered animation for multiple elements
      .to(".stagger-element", {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        ease: "power3.out",
      });

    // Cleanup function to kill animations when component unmounts
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="animation-container">
      <div ref={boxRef} className="box"></div>
      <div ref={circleRef} className="circle"></div>

      <div className="stagger-container">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="stagger-element"
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            Element {i}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Performance Considerations

- GSAP is optimized for performance, using requestAnimationFrame behind the scenes
- For complex animations, consider using GSAP's timeline features for better organization
- Always clean up animations when components unmount to prevent memory leaks
- Use the GSAP `set()` method for immediate property changes without animation

## Browser Compatibility

GSAP works consistently across all modern browsers and provides graceful degradation for older browsers.
