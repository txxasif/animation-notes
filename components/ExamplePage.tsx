"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import DocsDisplay from "../components/ui/DocsDisplay";
import SettingsMenu from "../components/ui/SettingsMenu";
import { loadMarkdownContent } from "@/utils/mdxLoader";

interface ExamplePageProps {
  category: string;
  id: string;
  componentPath: string;
  explanation?: string;
  mdPath?: string;
}

const ExamplePage: React.FC<ExamplePageProps> = ({
  category,
  id,
  componentPath,
  explanation,
  mdPath,
}) => {
  const Component = dynamic(() => import(`../${componentPath}`), {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    ),
  });

  const [markdownContent, setMarkdownContent] = useState<string>(
    explanation || ""
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);

  const exampleDocsTitle = `${
    category.charAt(0).toUpperCase() + category.slice(1)
  } Example: ${id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, " ")}`;

  useEffect(() => {
    if (!mdPath) return;

    setIsLoading(true);

    const timer = setTimeout(() => {
      loadMarkdownContent(mdPath)
        .then((content) => {
          setMarkdownContent(content);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(
            "Failed to load documentation. Using fallback content instead."
          );
          setMarkdownContent(explanation || "Documentation unavailable");
          setIsLoading(false);
        });
    }, 100);

    return () => clearTimeout(timer);
  }, [mdPath, explanation]);

  const toggleDocs = () => {
    setIsDocsOpen(!isDocsOpen);
  };

  return (
    <>
      <DocsDisplay
        title={exampleDocsTitle}
        content={isLoading ? "Loading documentation..." : markdownContent}
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

      <SettingsMenu onShowDocs={toggleDocs} category={category} />

      <Component />
    </>
  );
};

export default ExamplePage;
