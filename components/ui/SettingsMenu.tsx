"use client";

import React, { useState } from "react";
import Link from "next/link";

type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface SettingsMenuProps {
  onShowDocs: () => void;
  category: string;
}

export default function SettingsMenu({
  onShowDocs,
  category,
}: SettingsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>("bottom-right");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };

  const menuPositionClasses = {
    "top-left": "top-16 left-4",
    "top-right": "top-16 right-4",
    "bottom-left": "bottom-16 left-4",
    "bottom-right": "bottom-16 right-4",
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {/* Settings button */}
      <button
        onClick={toggleMenu}
        className="bg-gray-800/80 hover:bg-gray-700/90 text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-105 backdrop-blur-sm border border-gray-700/30"
        aria-label="Settings"
        style={{
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
        }}
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
          className="text-blue-400"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>

      {/* Menu overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Menu */}
      {isOpen && (
        <div
          className={`absolute ${menuPositionClasses[position]} w-64 rounded-xl shadow-2xl z-50 overflow-hidden border border-gray-500/30 backdrop-blur-sm`}
          style={{
            background:
              "linear-gradient(145deg, rgba(40, 44, 52, 0.95), rgba(30, 32, 40, 0.95))",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div className="p-3">
            <Link
              href="/examples"
              className="flex items-center px-4 py-2.5 text-white hover:bg-gray-700/50 rounded-lg transition-colors mb-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-3 text-blue-400"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Back to Examples</span>
            </Link>

            <button
              onClick={() => {
                onShowDocs();
                setIsOpen(false);
              }}
              className="w-full flex items-center px-4 py-2.5 text-white hover:bg-gray-700/50 rounded-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-3 text-blue-400"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              <span>Show Documentation</span>
            </button>
          </div>

          <div className="px-3 py-3 border-t border-gray-500/20">
            <p className="text-xs text-gray-400 mb-3 px-2">Button Position</p>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  "top-left",
                  "top-right",
                  "bottom-left",
                  "bottom-right",
                ] as Position[]
              ).map((pos) => (
                <button
                  key={pos}
                  onClick={() => setPosition(pos)}
                  className={`px-3 py-1.5 text-xs rounded-md ${
                    position === pos
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                  } transition-colors`}
                >
                  {pos
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
