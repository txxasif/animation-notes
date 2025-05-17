"use client";
import React, { JSX, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

/**
 * Geometry Types in Three.js
 *
 * This file demonstrates the different built-in geometry types available in Three.js
 * and when to use each type of geometry.
 *
 * Key concepts:
 * - Different geometries are suited for different use cases
 * - Three.js provides many built-in geometry primitives
 * - More complex geometries require more vertices and faces, affecting performance
 */
export default function GeometryTypes() {
  // State to track which geometry is selected
  const [selectedGeometry, setSelectedGeometry] = useState("box");

  // List of available geometries with their parameters
  const geometries = {
    box: {
      name: "Box",
      component: (props: JSX.IntrinsicElements["boxGeometry"]) => (
        <boxGeometry args={[1, 1, 1]} {...props} />
      ),
      description:
        "Used for cube and cuboid shapes. Great for architectural elements, basic blocks, and UI elements.",
    },
    sphere: {
      name: "Sphere",
      component: (props: JSX.IntrinsicElements["sphereGeometry"]) => (
        <sphereGeometry args={[0.7, 32, 32]} {...props} />
      ),
      description:
        "Perfect for planets, balls, bubbles. Higher segment counts create smoother surfaces but impact performance.",
    },
    cylinder: {
      name: "Cylinder",
      component: (props: JSX.IntrinsicElements["cylinderGeometry"]) => (
        <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} {...props} />
      ),
      description:
        "Ideal for pipes, columns, tree trunks. The top and bottom radius can differ to create cones.",
    },
    cone: {
      name: "Cone",
      component: (props: JSX.IntrinsicElements["coneGeometry"]) => (
        <coneGeometry args={[0.7, 1.5, 32]} {...props} />
      ),
      description:
        "Good for ice cream cones, rocket tips, or representing directional objects.",
    },
    torus: {
      name: "Torus (Donut)",
      component: (props: JSX.IntrinsicElements["torusGeometry"]) => (
        <torusGeometry args={[0.5, 0.2, 16, 100]} {...props} />
      ),
      description:
        "Perfect for rings, donuts, and circular tubes. Adjust radius and tube radius for different looks.",
    },
    plane: {
      name: "Plane",
      component: (props: JSX.IntrinsicElements["planeGeometry"]) => (
        <planeGeometry args={[1.5, 1.5]} {...props} />
      ),
      description:
        "Used for flat surfaces like floors, walls, or screens. Has only one side by default.",
    },
    dodecahedron: {
      name: "Dodecahedron",
      component: (props: JSX.IntrinsicElements["dodecahedronGeometry"]) => (
        <dodecahedronGeometry args={[0.7]} {...props} />
      ),
      description:
        "12-faced polyhedron. Great for gems, dice, or abstract objects. Good balance of complexity and performance.",
    },
    tetrahedron: {
      name: "Tetrahedron",
      component: (props: JSX.IntrinsicElements["tetrahedronGeometry"]) => (
        <tetrahedronGeometry args={[0.8]} {...props} />
      ),
      description:
        "4-faced polyhedron (pyramid). Simplest 3D shape, great for low-poly style games.",
    },
    octahedron: {
      name: "Octahedron",
      component: (props: JSX.IntrinsicElements["octahedronGeometry"]) => (
        <octahedronGeometry args={[0.7]} {...props} />
      ),
      description:
        "8-faced polyhedron. Used for diamonds, gems, and abstract shapes.",
    },
    icosahedron: {
      name: "Icosahedron",
      component: (props: JSX.IntrinsicElements["icosahedronGeometry"]) => (
        <icosahedronGeometry args={[0.7]} {...props} />
      ),
      description:
        "20-faced polyhedron. Close to a sphere but with fewer vertices. Great for low-poly planets.",
    },
    torusKnot: {
      name: "Torus Knot",
      component: (props: JSX.IntrinsicElements["torusKnotGeometry"]) => (
        <torusKnotGeometry args={[0.5, 0.15, 100, 16]} {...props} />
      ),
      description:
        "Complex shape that winds around itself. Great for showcasing material properties or as decorative elements.",
    },
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* UI for selecting different geometries */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 10,
          background: "rgba(0,0,0,0.7)",
          padding: 10,
          borderRadius: 5,
          color: "white",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <h3>Geometry Types</h3>
        {Object.entries(geometries).map(([key, { name }]) => (
          <div key={key}>
            <label>
              <input
                type="radio"
                checked={selectedGeometry === key}
                onChange={() => setSelectedGeometry(key)}
              />
              {name}
            </label>
          </div>
        ))}
        <div style={{ marginTop: 20 }}>
          <h4>
            {geometries[selectedGeometry as keyof typeof geometries].name}
          </h4>
          <p>
            {
              geometries[selectedGeometry as keyof typeof geometries]
                .description
            }
          </p>
        </div>
      </div>

      <Canvas
        style={{ background: "#222" }}
        camera={{ position: [0, 2, 5], fov: 50 }}
      >
        <OrbitControls />

        {/* Lights */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, 0, 0]} intensity={0.5} color="red" />
        <pointLight position={[0, 0, -5]} intensity={0.5} color="blue" />

        {/* Grid helper */}
        <gridHelper args={[10, 10]} />

        {/* The selected geometry */}
        <mesh rotation={[0, -Math.PI * 0.25, 0]}>
          {/* Dynamically render the selected geometry component */}
          {geometries[selectedGeometry as keyof typeof geometries].component(
            {}
          )}

          {/* 
            meshStandardMaterial:
            - A physically-based material that looks realistic with lighting
            - metalness: How metallic the material appears (0-1)
            - roughness: How rough/smooth the surface is (0-1)
            
            Other popular materials:
            - meshBasicMaterial: Unlit, ignores lights (good for wireframes)
            - meshPhongMaterial: Shiny surfaces with specular highlights
            - meshLambertMaterial: Matte surfaces, no specular highlights
            - meshNormalMaterial: Colors faces based on normal vectors (debugging)
          */}
          <meshStandardMaterial
            color="#f5f5f5"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </Canvas>
    </div>
  );
}
