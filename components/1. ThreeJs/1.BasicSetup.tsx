"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as Three from "three";

/**
 * Basic Three.js Setup
 *
 * This file demonstrates the fundamental setup of a Three.js scene using React Three Fiber.
 *
 * Key components:
 * - Canvas: The container that sets up the WebGL renderer, scene, and camera
 * - OrbitControls: Allows the user to navigate around the 3D scene
 * - Simple cube: Basic 3D object to demonstrate rendering
 */
export default function BasicSetup() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {/* 
        Canvas is the main container for a Three.js scene in React Three Fiber
        It automatically sets up the WebGL renderer, a scene, and a camera
        
        Props explained:
        - style: Sets the dimensions of the rendering area
        - shadows: Enables shadow mapping (for lighting)
        - camera: Configures the default camera
          - fov: Field of view in degrees
          - position: Initial camera position [x, y, z]
          - near: Near clipping plane - objects closer than this won't render
          - far: Far clipping plane - objects further than this won't render
      */}
      <Canvas
        style={{ background: "#222" }}
        shadows
        camera={{ fov: 75, position: [0, 2, 5], near: 0.1, far: 1000 }}
      >
        {/* 
          OrbitControls from drei allows the user to rotate, pan, and zoom the camera
          This is essential for exploring 3D scenes
        */}
        <OrbitControls />

        {/* 
          Ambient light provides global illumination
          It lights all objects equally from all directions
          intensity: Controls how bright the light is (0 to 1 is typical)
        */}
        <ambientLight intensity={0.3} />

        {/* 
          Directional light simulates sunlight
          It casts parallel light rays in a specific direction
          position: The position of the light source
          intensity: Controls brightness
          castShadow: Enables this light to cast shadows
        */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* 
          A basic mesh combines geometry (shape) and material (appearance)
          position: Where the mesh is located in 3D space [x, y, z]
          castShadow: This object can cast shadows
          receiveShadow: This object can receive shadows from other objects
        */}
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          {/* boxGeometry: Creates a cube shape with specified dimensions [width, height, depth] */}
          <boxGeometry args={[1, 1, 1]} />
          {/* 
            meshStandardMaterial: A physically-based material that reacts to light
            color: The color of the material
            roughness: How rough the surface is (0 = mirror-like, 1 = completely diffuse)
            metalness: How metallic the surface is (0 = non-metallic, 1 = metallic)
          */}
          <meshStandardMaterial
            color="royalblue"
            roughness={0.5}
            metalness={0.2}
          />
        </mesh>

        {/* 
          A ground plane to show shadows and provide perspective
          rotation: Rotates the mesh around specified axes [x, y, z] in radians
        */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow
        >
          {/* planeGeometry: Creates a flat plane with specified dimensions [width, height] */}
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#444" side={Three.DoubleSide} />
        </mesh>
      </Canvas>
    </div>
  );
}
