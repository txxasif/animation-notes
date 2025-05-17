// utils/mdToText.ts

import matter from "gray-matter";
import { remark } from "remark";
import strip from "strip-markdown";

/**
 * Converts Markdown content to plain text, removing all formatting
 *
 * @param {string} markdownContent - The markdown content as a string
 * @returns {Promise<string>} The plain text content without any markdown formatting
 */
export async function mdToText(markdownContent: string): Promise<string> {
  try {
    // Remove frontmatter with gray-matter
    const { content } = matter(markdownContent);

    // Process markdown to strip all formatting
    const result = await remark().use(strip).process(content);

    // Return plain text content
    return result.toString().trim();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Error converting markdown to text: ${errorMessage}`);
    throw error;
  }
}
