"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useThreeJsStore } from "@/store/threeJsStore";
import { useGsapStore } from "@/store/gsapStore";
import { useFramerMotionStore } from "@/store/framerMotionStore";

export default function Example() {
  const [activeCategory, setActiveCategory] = useState("threejs");

  const threeJsExamples = useThreeJsStore((state) => state.examples);
  const gsapExamples = useGsapStore((state) => state.examples);
  const framerMotionExamples = useFramerMotionStore((state) => state.examples);

  const categories = [
    {
      id: "threejs",
      name: "Three.js",
      icon: "🧊",
      components: Object.values(threeJsExamples).map((example) => ({
        id: example.id,
        name: example.title,
        path: `/examples/threejs/${example.id}`,
        docPath: example.mdPath,
      })),
    },
    {
      id: "gsap",
      name: "GSAP",
      icon: "✨",
      components: Object.values(gsapExamples).map((example) => ({
        id: example.id,
        name: example.title,
        path: `/examples/gsap/${example.id}`,
        docPath: example.mdPath,
      })),
    },
    {
      id: "framer-motion",
      name: "Framer Motion",
      icon: "🔄",
      components: Object.values(framerMotionExamples).map((example) => ({
        id: example.id,
        name: example.title,
        path: `/examples/framer-motion/${example.id}`,
        docPath: "",
      })),
    },
  ];

  const category =
    categories.find((cat) => cat.id === activeCategory) || categories[0];

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Animation Examples
          </h1>
          <p className="text-lg opacity-75">
            Explore interactive examples by category
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-button ${
                activeCategory === cat.id ? "active" : ""
              }`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="text-xl mr-2">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {category.components.map((component) => (
            <Link
              key={component.id}
              href={component.path}
              className="example-card p-6 flex flex-col"
            >
              <h3 className="text-lg font-semibold mb-2">{component.name}</h3>
              <div className="mt-auto flex items-center justify-between">
                <span className="example-link">
                  View example
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {category.components.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg opacity-75">Examples coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
