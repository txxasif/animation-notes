"use client";
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  OrthographicCamera,
} from "@react-three/drei";

/**
 * Camera Types in Three.js
 *
 * This file demonstrates the different types of cameras available in Three.js:
 * - Perspective Camera: Mimics human eye (objects farther away appear smaller)
 * - Orthographic Camera: No perspective distortion (good for 2D/isometric views)
 *
 * Understanding when to use each:
 * - Perspective: For realistic 3D scenes, first-person views, immersive experiences
 * - Orthographic: For technical drawings, isometric games, UI elements in 3D space
 */
export default function CameraTypes() {
  // State to toggle between camera types
  const [cameraType, setCameraType] = useState<"perspective" | "orthographic">(
    "perspective"
  );

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* Camera type selector UI */}
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
        }}
      >
        <h3>Camera Types</h3>
        <div>
          <label>
            <input
              type="radio"
              checked={cameraType === "perspective"}
              onChange={() => setCameraType("perspective")}
            />
            Perspective Camera (mimics human eye)
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              checked={cameraType === "orthographic"}
              onChange={() => setCameraType("orthographic")}
            />
            Orthographic Camera (no perspective distortion)
          </label>
        </div>
      </div>

      <Canvas style={{ background: "#222" }}>
        {/* 
          PerspectiveCamera from drei:
          - fov: Field of view in degrees (how wide the view is)
          - aspect: Aspect ratio of the view (usually matches the Canvas)
          - near: Near clipping plane (objects closer won't render)
          - far: Far clipping plane (objects farther won't render)
          - position: Initial position [x, y, z]
          - makeDefault: Make this the default camera when active
        */}
        {cameraType === "perspective" && (
          <PerspectiveCamera
            makeDefault
            fov={75}
            near={0.1}
            far={1000}
            position={[0, 2, 5]}
          />
        )}

        {/* 
          OrthographicCamera from drei:
          - left, right, top, bottom: Defines the view frustum
          - near, far: Clipping planes
          - zoom: Controls the apparent size of objects
          - position: Initial position [x, y, z]
          - makeDefault: Make this the default camera when active
        */}
        {cameraType === "orthographic" && (
          <OrthographicCamera
            makeDefault
            left={-5}
            right={5}
            top={5}
            bottom={-5}
            near={0.1}
            far={1000}
            zoom={50}
            position={[0, 2, 5]}
          />
        )}

        {/* Scene controls */}
        <OrbitControls />

        {/* Ambient and directional lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Grid to help visualize the 3D space */}
        <gridHelper args={[10, 10, "#666", "#444"]} />

        {/* 3D objects to demonstrate camera differences */}
        <group>
          {/* Center cube for reference */}
          <mesh position={[0, 1, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="hotpink" />
          </mesh>

          {/* Row of cubes to show perspective/orthographic differences */}
          {[-4, -2, 0, 2, 4].map((x) => (
            <mesh key={x} position={[x, 0.5, -3]}>
              <boxGeometry args={[0.8, 0.8, 0.8]} />
              <meshStandardMaterial color="royalblue" />
            </mesh>
          ))}

          {/* Ground plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        </group>
      </Canvas>
    </div>
  );
}
