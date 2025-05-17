import type { Metadata } from "next";

export const AppConfig = {
  title: "Animation Learning Notebook",
  description: "Interactive notebook for learning animation libraries",
};

// Type cast for Next.js metadata
export const appMetadata: Metadata = {
  title: AppConfig.title,
  description: AppConfig.description,
};
