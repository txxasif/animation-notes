import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import { formatContent } from "./chat";
import { CodeBlock } from "./CodeBlock";

const AssistantMessage = ({ message }: { message: any }) => {
  return (
    <div className="group">
      <div className="relative max-w-full text-base">
        <div className="text-gray-100 rounded-[12px]">
          <div className="markdown-content no-scrollbar">
            {/* <style jsx global>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              code {
                white-space: pre-wrap;
                overflow-wrap: break-word;
                word-wrap: break-word;
                font-size: 0.9em;
                background-color: rgba(30, 32, 40, 0.5);
                border-radius: 4px;
                padding: 2px 5px;
              }
              pre {
                overflow-x: auto;
                scrollbar-width: none;
                -ms-overflow-style: none;
                border-radius: 8px;
                background-color: rgba(30, 32, 40, 0.8) !important;
                border: 1px solid rgba(100, 116, 139, 0.2);
                margin: 12px 0;
              }
              pre::-webkit-scrollbar {
                display: none;
              }
              blockquote {
                border-left: 4px solid rgba(100, 116, 139, 0.5);
                padding: 0.5rem 1rem;
                color: rgba(226, 232, 240, 0.9);
                background-color: rgba(30, 32, 40, 0.5);
                border-radius: 0 6px 6px 0;
              }
              .hljs {
                background-color: transparent !important;
                padding: 0;
              }
              table {
                border-collapse: separate;
                border-spacing: 0;
                width: 100%;
                border-radius: 8px;
                overflow: hidden;
              }
              th {
                background-color: rgba(51, 65, 85, 0.6) !important;
                color: rgba(226, 232, 240, 0.9) !important;
              }
              td {
                background-color: rgba(30, 32, 40, 0.4);
                color: rgba(226, 232, 240, 0.8) !important;
              }
              tr:nth-child(even) td {
                background-color: rgba(39, 42, 55, 0.5);
              }
            `}</style> */}
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeHighlight, rehypeKatex]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-xl sm:text-[22px] font-semibold mt-5 mb-4 leading-[30px] text-white pb-1 border-b border-gray-500/20">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-lg sm:text-[20px] font-semibold mt-4 mb-3 leading-[28px] text-blue-300">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-base sm:text-[18px] font-medium mt-4 mb-3 leading-[26px] text-gray-200">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <div className="text-sm sm:text-[16px] my-3 leading-[26px] break-words whitespace-pre-wrap text-gray-200">
                    {children}
                  </div>
                ),
                li: ({ children }) => (
                  <li className="text-sm sm:text-[15px] mt-1.5 mb-1.5 leading-[26px] break-words text-gray-200">
                    {children}
                  </li>
                ),
                ul: ({ children }) => (
                  <ul className="my-3 space-y-1 pl-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="my-3 space-y-1 pl-1">{children}</ol>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                  >
                    {children}
                  </a>
                ),
                table: ({ children }) => (
                  <div className="max-w-[calc(100vw-80px)] sm:max-w-[calc(100vw-100px)] md:max-w-full my-5 text-gray-200 no-scrollbar">
                    <div className="overflow-x-auto border border-gray-500/20 rounded-lg no-scrollbar shadow-md">
                      <div className="inline-block min-w-full align-middle">
                        <table className="min-w-full divide-y divide-gray-500/20 table-auto">
                          {children}
                        </table>
                      </div>
                    </div>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="sticky top-0">{children}</thead>
                ),
                tbody: ({ children }) => (
                  <tbody className="divide-y divide-gray-500/20">
                    {children}
                  </tbody>
                ),
                th: ({ children }) => (
                  <th
                    scope="col"
                    className="px-3 py-2.5 text-left text-xs font-medium uppercase tracking-wider sticky top-0 whitespace-nowrap"
                  >
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-3 py-2.5 text-sm align-top whitespace-normal break-words max-w-[250px]">
                    {children}
                  </td>
                ),
                code: ({ node, className, children, ...props }) => {
                  const isCodeBlock = className?.includes("language-");
                  const isInline =
                    node?.position?.start.line === node?.position?.end.line;

                  if (isInline) {
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }

                  const textContent = formatContent(children);
                  return (
                    <CodeBlock
                      className={className || ""}
                      fileType={isCodeBlock ? undefined : "Text"}
                    >
                      {textContent}
                    </CodeBlock>
                  );
                },
              }}
            >
              {message}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AssistantMessage };
