/**
 * Client-side utility for loading Markdown files
 *
 * This module provides functionality to load Markdown content from files
 * for use in the documentation display.
 */

/**
 * Loads markdown content from the specified file path
 *
 * @param path - The path to the markdown file (relative to public/docs directory)
 * @returns A promise resolving to the markdown content as a string
 */
export async function loadMarkdownContent(path: string): Promise<string> {
  // Guard against server-side execution
  if (typeof window === "undefined") {
    console.log("Running on server, returning placeholder");
    return "Loading content...";
  }

  try {
    console.log(`Starting to load markdown from: ${path}`);

    // Extract the file path from the full path
    // Expected format: /docs/category/filename.md
    const segments = path.split("/");
    // Find where 'docs' appears in the path
    const docsIndex = segments.indexOf("docs");
    // If 'docs' is not in the path, just use the last two segments
    const categoryAndFileName =
      docsIndex >= 0
        ? segments.slice(docsIndex + 1).join("/")
        : segments.slice(Math.max(0, segments.length - 2)).join("/");

    // Construct the API URL to fetch the markdown
    const baseUrl = window.location.origin;
    const apiUrl = `${baseUrl}/api/docs?file=${encodeURIComponent(
      categoryAndFileName
    )}`;

    console.log(`Fetching from API: ${apiUrl}`);

    // Fetch the markdown via our API route
    const response = await fetch(apiUrl, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "text/plain,text/markdown,*/*",
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API response error (${response.status}):`, errorText);
      throw new Error(
        `Failed to load markdown file: ${path} (Status: ${response.status})`
      );
    }

    // Get the markdown content
    const content = await response.text();
    console.log(`Successfully loaded markdown (${content.length} bytes)`);
    return content;
  } catch (error) {
    console.error("Error loading markdown:", error);
    return `# Documentation Unavailable

The markdown content could not be loaded. Please check the console for details.

Error: ${error instanceof Error ? error.message : String(error)}`;
  }
}
