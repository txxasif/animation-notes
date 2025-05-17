# GSAP ScrollTrigger

This example demonstrates scroll-based animations with GSAP's ScrollTrigger plugin, allowing you to create impressive interactions that respond to user scrolling.

## Key Features

- **Scroll-triggered animations**: Learn how to create animations that start, stop, reverse, or scrub based on scroll position.
- **Pinned elements**: Keep elements fixed on the screen during a defined scroll distance.
- **Scrubbing effects**: Link animation progress directly to scroll position for precise control.
- **Timeline synchronization**: Connect complex GSAP timelines to scroll events.
- **Parallax scrolling**: Create depth through elements moving at different speeds.

## Code Example

```jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations() {
  const sectionRefs = useRef([]);
  const headerRef = useRef(null);

  useEffect(() => {
    // Basic scroll trigger animation
    gsap.to(".animated-box", {
      x: 300,
      rotation: 360,
      duration: 1,
      scrollTrigger: {
        trigger: ".animated-box",
        start: "top center", // when the top of the element hits the center of the viewport
        end: "bottom center", // when the bottom of the element hits the center of the viewport
        toggleActions: "play pause reverse reset", // actions on enter, leave, enter back, leave back
        markers: true, // for development purposes
      },
    });

    // Pinned element with scrub
    gsap.to(".pin-box", {
      y: 300,
      scale: 2,
      scrollTrigger: {
        trigger: ".pin-section",
        start: "top top",
        end: "+=500", // 500px after start
        pin: true, // pin the trigger element
        scrub: 1, // smooth scrubbing, takes 1 second to catch up to scrollbar
      },
    });

    // Parallax effect
    gsap.utils.toArray(".parallax-layer").forEach((layer, i) => {
      const depth = i * 0.2;
      gsap.to(layer, {
        y: -(depth * 1000),
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-container",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="scroll-container">
      <div ref={headerRef} className="header">
        Scroll Down
      </div>

      <section className="section">
        <div className="animated-box"></div>
      </section>

      <section className="pin-section">
        <div className="pin-box"></div>
      </section>

      <section className="parallax-container">
        <div className="parallax-layer bg"></div>
        <div className="parallax-layer mid"></div>
        <div className="parallax-layer fg"></div>
      </section>
    </div>
  );
}
```

## ScrollTrigger Configuration Options

- **trigger**: The element that triggers the animation
- **start/end**: When to start/end the animation relative to the trigger and viewport
- **toggleActions**: Controls how animation behaves on enter/leave/enter back/leave back
- **pin**: Fixes an element in place during scroll
- **scrub**: Ties animation progress directly to scroll position
- **markers**: Visual indicators for trigger positions (development only)

## Performance Considerations

- For complex scroll animations, consider disabling them on mobile devices
- Use `will-change` CSS property for better performance on elements that will animate
- Pin sparingly as it can create jerky experiences on some devices
