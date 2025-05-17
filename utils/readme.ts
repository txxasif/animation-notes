// Simple utility to provide README content as a string

// Hardcoded README content
export const readmeContent = `# Animation Learning Notebook

An interactive notebook application for learning and experimenting with modern web animation libraries including Three.js, GSAP, and Framer Motion.

## Features

- Interactive examples for Three.js, GSAP, and Framer Motion
- Code editor with live preview
- Detailed explanations
- Save and organize your animation experiments
- Dark and light mode support

## Libraries

1. **Three.js** - 3D graphics library
2. **GSAP** - Animation library 
3. **Framer Motion** - React animation library`;

// Simple getter function
export function getReadmeContent(): string {
  return readmeContent;
}
