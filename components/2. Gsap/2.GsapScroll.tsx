"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GsapScroll() {
  const firstElement = useRef(null);
  const secondElement = useRef(null);
  const square = useRef(null);
  const triangle = useRef(null);

  useEffect(() => {
    gsap.to(triangle.current, {
      scrollTrigger: {
        trigger: triangle.current,
        start: "top 50%",
        end: "top 30%",
        markers: true,
      },
      ease: "bounce.out",

      x: 100,
      yPercent: -100,
    });
  }, []);

  return (
    <div>
      <div ref={firstElement} className="relative h-[100dvh] w-full bg-red-500">
        {/* triangle */}
        <div
          ref={triangle}
          className="absolute bottom-0 left-0 w-10 h-10 bg-blue-500"
        ></div>
      </div>
      <div ref={secondElement} className="h-[100dvh] w-full bg-blue-500">
        {/* square */}
        <div ref={square} className="w-10 h-10 bg-white"></div>
      </div>
    </div>
  );
}
