"use client";

import React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function GestureAnimations() {
  // Motion values for drag
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transformations for rotation and scale based on drag distance
  const rotateZ = useTransform(x, [-200, 200], [-45, 45]);
  const scale = useTransform(y, [-200, 0, 200], [0.8, 1, 1.2]);

  // Smooth spring animation for background color
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const backgroundColor = useTransform(
    springX,
    [-200, 0, 200],
    ["#ef4444", "#3b82f6", "#22c55e"]
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">
        Framer Motion Gesture Animations
      </h1>

      <div className="flex flex-wrap justify-center gap-12 mb-12">
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-medium mb-4">
            Drag with Transformations
          </h2>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 relative">
            <motion.div
              className="w-32 h-32 rounded-lg bg-blue-500 cursor-grab"
              style={{
                x,
                y,
                rotateZ,
                scale,
                backgroundColor,
              }}
              drag
              dragConstraints={{
                left: -200,
                right: 200,
                top: -200,
                bottom: 200,
              }}
              whileDrag={{ cursor: "grabbing" }}
              whileTap={{ boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)" }}
            />
            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              Drag me in any direction
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-12">
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-medium mb-4">Gesture Sequence</h2>
          <div className="space-y-4">
            <motion.div
              className="w-32 h-16 rounded-lg bg-purple-500 flex items-center justify-center text-white font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hover & Tap
            </motion.div>

            <motion.div
              className="w-32 h-16 rounded-lg bg-pink-500 flex items-center justify-center text-white font-medium"
              whileHover={{ y: -5 }}
              whileTap={{ y: 5 }}
            >
              Up & Down
            </motion.div>

            <motion.div
              className="w-32 h-16 rounded-lg bg-yellow-500 flex items-center justify-center text-white font-medium"
              whileHover={{ rotate: 5 }}
              whileTap={{ rotate: -5 }}
            >
              Rotate
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
