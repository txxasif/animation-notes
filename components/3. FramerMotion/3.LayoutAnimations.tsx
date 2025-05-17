"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LayoutAnimations() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isListVisible, setIsListVisible] = useState(true);
  const [items, setItems] = useState([
    { id: "1", color: "bg-blue-500", title: "Card 1" },
    { id: "2", color: "bg-purple-500", title: "Card 2" },
    { id: "3", color: "bg-pink-500", title: "Card 3" },
    { id: "4", color: "bg-yellow-500", title: "Card 4" },
  ]);

  // Toggle layout between grid and list
  const toggleLayout = () => {
    setIsListVisible(!isListVisible);
  };

  // Shuffle the items
  const shuffleItems = () => {
    setItems([...items].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">
        Framer Motion Layout Animations
      </h1>

      <div className="flex gap-4 mb-8">
        <button
          onClick={toggleLayout}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Toggle Layout
        </button>
        <button
          onClick={shuffleItems}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Shuffle
        </button>
      </div>

      <div
        className={`w-full max-w-3xl ${
          isListVisible ? "space-y-4" : "grid grid-cols-2 gap-4"
        }`}
      >
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              layoutId={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`${item.color} rounded-lg p-4 cursor-pointer`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              style={{
                height: isListVisible ? "80px" : "150px",
                width: isListVisible ? "100%" : "auto",
              }}
            >
              <h2 className="text-lg font-medium text-white">{item.title}</h2>
              <p className="text-white/70 text-sm">Click to expand</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={selectedId}
              className={`${
                items.find((item) => item.id === selectedId)?.color
              } rounded-lg p-8 max-w-lg w-full max-h-[80vh] overflow-auto relative`}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="absolute top-4 right-4 text-white p-1 rounded-full bg-white/20 hover:bg-white/30"
                onClick={() => setSelectedId(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>

              <h2 className="text-2xl font-bold text-white mb-4">
                {items.find((item) => item.id === selectedId)?.title}
              </h2>
              <p className="text-white/80">
                This is an expanded view of the card. Framer Motion smoothly
                animates the transition between the grid/list item and this
                modal using layoutId. Click outside or the X button to close.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
