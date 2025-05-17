"use client";
import Image from "next/image";
import { gsap } from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function Animation() {
  const Image1 = useRef<HTMLImageElement>(null);
  const Image2 = useRef<HTMLImageElement>(null);
  const viewPort = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!Image1.current || !Image2.current || !viewPort.current) return;

    gsap.to(Image1.current, {
      x: "-45vw",
      duration: 100,
      scrollTrigger: {
        trigger: viewPort.current,
        start: "top 80%",
        scrub: 1,
      },
    });
    gsap.to(Image2.current, {
      x: "45vw",
      scrollTrigger: {
        trigger: viewPort.current,
        start: "top 80%",
        scrub: 1,
      },
    });
  }, []);

  return (
    <div
      ref={viewPort}
      className="relative flex gap-4 justify-center items-center w-full h-screen overflow-x-hidden"
    >
      <div>Hi My Name is Asif</div>
      <Image
        ref={Image1}
        className="w-[25vw] h-[75vh] object-cover absolute left-1/2 -translate-x-1/2"
        src="/images/1.jpg"
        alt="scroll-animation"
        width={1000}
        height={1000}
      />
      <Image
        ref={Image2}
        className="w-[25vw] h-[75vh] object-cover absolute left-1/2 -translate-x-1/2"
        src="/images/2.jpg"
        alt="scroll-animation"
        width={1000}
        height={1000}
      />
    </div>
  );
}
function AnimationPage() {
  return (
    <div>
      <div className="h-screen"></div>
      <Animation />
      <Animation />
      <Animation />
    </div>
  );
}
export default AnimationPage;
