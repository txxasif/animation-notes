"use client";
import React, { useState } from "react";
import "katex/dist/katex.min.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { FaCopy, FaCheck } from "react-icons/fa";

import { formatContent } from "./chat";

// Custom styling based on atomDark with professional touches
const customStyle = {
  ...atomDark,
  'pre[class*="language-"]': {
    ...atomDark['pre[class*="language-"]'],
    margin: 0,
    borderRadius: "0 0 0.5rem 0.5rem",
    background: "#282c34",
    fontFamily:
      "'JetBrains Mono', 'Fira Code', 'Roboto Mono', Menlo, Monaco, Consolas, 'Courier New', monospace",
  },
  'code[class*="language-"]': {
    ...atomDark['code[class*="language-"]'],
    fontFamily:
      "'JetBrains Mono', 'Fira Code', 'Roboto Mono', Menlo, Monaco, Consolas, 'Courier New', monospace",
    fontSize: "0.9em",
    lineHeight: 1.6,
  },
};

export const CodeBlock = ({
  className,
  children,
  fileType,
}: {
  className?: string;
  children: React.ReactNode;
  fileType?: string;
}) => {
  const isCodeBlock = className?.includes("language-");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyCode = (content: React.ReactNode) => {
    const formattedContent = formatContent(content);

    navigator.clipboard.writeText(formattedContent).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };
  const match = isCodeBlock ? /language-(\w+)/.exec(className || "") : null;
  const language = match ? match[1] : "";
  const code = formatContent(children);

  // Language display name formatting
  const getLanguageDisplayName = (lang: string) => {
    if (!lang) return "Code";

    // Special cases
    const langMap: Record<string, string> = {
      js: "JavaScript",
      ts: "TypeScript",
      jsx: "React JSX",
      tsx: "React TSX",
      html: "HTML",
      css: "CSS",
      scss: "SCSS",
      py: "Python",
      rb: "Ruby",
      java: "Java",
      go: "Go",
      rs: "Rust",
      cs: "C#",
      cpp: "C++",
      c: "C",
      php: "PHP",
      sh: "Shell",
      bash: "Bash",
      sql: "SQL",
      yaml: "YAML",
      yml: "YAML",
      json: "JSON",
      md: "Markdown",
      dockerfile: "Dockerfile",
    };

    return (
      langMap[lang.toLowerCase()] ||
      lang.charAt(0).toUpperCase() + lang.slice(1)
    );
  };

  const displayName = fileType || getLanguageDisplayName(language);

  return (
    <div className="relative max-w-[calc(100vw-80px)] py-2 md:max-w-full group">
      <div className="shadow-lg rounded-t-md overflow-hidden border border-gray-700/50">
        <div className="px-4 py-3 flex justify-between items-center bg-gradient-to-r from-gray-800 to-gray-900">
          <span className="text-sm font-medium text-gray-200 flex items-center">
            {language && (
              <span className="w-2 h-2 rounded-full bg-blue-400 mr-2.5"></span>
            )}
            {displayName}
          </span>

          <button
            onClick={() => handleCopyCode(children)}
            className="h-8 w-8 flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors duration-200"
            title={isCopied ? "Copied!" : "Copy code"}
          >
            {isCopied ? (
              <FaCheck className="w-[14px] h-[14px]" />
            ) : (
              <FaCopy className="w-[14px] h-[14px]" />
            )}
          </button>
        </div>

        <div className="overflow-hidden">
          {/* @ts-ignore - TypeScript has issues with the SyntaxHighlighter component */}
          <SyntaxHighlighter
            style={customStyle}
            language={language || "text"}
            PreTag="div"
            customStyle={{
              margin: 0,
              padding: "1rem",
              borderRadius: 0,
              width: "100%",
            }}
            wrapLines={true}
            wrapLongLines={true}
            showLineNumbers={
              !!(language && language !== "text" && language !== "markdown")
            }
            lineNumberStyle={{
              minWidth: "2.5em",
              paddingRight: "1em",
              color: "rgba(156, 163, 175, 0.5)",
              textAlign: "right",
              userSelect: "none",
            }}
          >
            {children}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};
