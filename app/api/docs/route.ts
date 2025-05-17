import { NextRequest, NextResponse } from "next/server";

// Make this route use the Edge Runtime
export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    // Get the requested file path from the URL
    const fileParam = request.nextUrl.searchParams.get("file");

    if (!fileParam) {
      return NextResponse.json(
        { error: "No file parameter provided" },
        { status: 400 }
      );
    }

    // Security check for path traversal
    if (fileParam.includes("..")) {
      return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
    }

    try {
      // Build the URL to the file in public/docs
      const baseUrl = request.nextUrl.origin;
      const fileUrl = `${baseUrl}/docs/${fileParam}`;

      console.log(`Loading markdown from: ${fileUrl}`);

      // Fetch the file contents directly
      const response = await fetch(fileUrl);

      if (!response.ok) {
        console.error(
          `Failed to load file: ${fileUrl}, status: ${response.status}`
        );
        return NextResponse.json(
          {
            error: "File not found",
            status: response.status,
            path: fileUrl,
          },
          { status: 404 }
        );
      }

      // Get the file content
      const content = await response.text();

      // Return the content as markdown
      return new NextResponse(content, {
        status: 200,
        headers: {
          "Content-Type": "text/markdown",
          "Cache-Control": "no-cache",
        },
      });
    } catch (error) {
      console.error("Error loading file:", error);
      return NextResponse.json(
        {
          error: "Failed to load file",
          details: error instanceof Error ? error.message : String(error),
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
