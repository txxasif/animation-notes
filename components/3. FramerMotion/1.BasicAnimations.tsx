"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function BasicAnimations() {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">
        Basic Framer Motion Animations
      </h1>

      <div className="flex flex-wrap justify-center gap-8 mb-12">
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-medium mb-4">Simple Animation</h2>
          <motion.div
            className="w-24 h-24 bg-blue-500 rounded-lg"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 0],
              borderRadius: ["10%", "50%", "10%"],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-lg font-medium mb-4">Hover & Tap</h2>
          <motion.div
            className="w-24 h-24 bg-purple-500 rounded-lg"
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.9 }}
          />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-lg font-medium mb-4">Click to Animate</h2>
          <motion.div
            className="w-24 h-24 bg-green-500 rounded-lg cursor-pointer"
            animate={
              isAnimating
                ? { y: -50, background: "#ec4899" }
                : { y: 0, background: "#22c55e" }
            }
            transition={{ type: "spring" }}
            onClick={() => setIsAnimating(!isAnimating)}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-medium mb-4">Keyframes Animation</h2>
          <motion.div
            className="w-24 h-24 bg-yellow-500 rounded-lg"
            animate={{
              x: [0, 100, -100, 0],
              backgroundColor: ["#eab308", "#ef4444", "#3b82f6", "#eab308"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              times: [0, 0.33, 0.66, 1],
            }}
          />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-lg font-medium mb-4">Drag</h2>
          <motion.div
            className="w-24 h-24 bg-pink-500 rounded-lg cursor-grab"
            drag
            dragConstraints={{
              top: -50,
              left: -50,
              right: 50,
              bottom: 50,
            }}
            whileDrag={{ scale: 1.1, cursor: "grabbing" }}
          />
        </div>
      </div>
    </div>
  );
}
