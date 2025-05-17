"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AssistantMessage } from "../markdown/AssistantMessage";

interface DocsDisplayProps {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function DocsDisplay({
  title,
  content,
  isOpen,
  onClose,
}: DocsDisplayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full max-w-[70vw] max-h-[85vh] z-50 mx-auto overflow-hidden hide-scrollbar rounded-xl border border-gray-500/30 shadow-2xl"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              background:
                "linear-gradient(145deg, rgba(40, 44, 52, 0.95), rgba(30, 32, 40, 0.95))",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div className="p-4 border-b border-gray-500/20 flex justify-between items-center">
              <h2 className="text-xl font-medium text-white/90 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2.5 text-blue-400"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                {title}
              </h2>

              <button
                className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors duration-200"
                onClick={onClose}
                aria-label="Close documentation"
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
              </button>
            </div>

            <div className="p-5 overflow-auto max-h-[calc(85vh-60px)] hide-scrollbar">
              <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .markdown-content {
                  scrollbar-width: none;
                  -ms-overflow-style: none;
                }
                .markdown-content::-webkit-scrollbar {
                  display: none;
                }
                /* Fix for code blocks appearing as selected */
                .react-syntax-highlighter-line-number,
                .token {
                  background: transparent !important;
                  text-shadow: none !important;
                }
                pre[class*="language-"],
                code[class*="language-"] {
                  text-shadow: none !important;
                }
                .prism-code {
                  background: #1e1e1e !important;
                }
              `}</style>
              <AssistantMessage message={content} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
