"use client";
import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/**
 * Custom Geometry in Three.js
 *
 * This file demonstrates how to create custom geometries using:
 * 1. BufferGeometry with manual vertex specification
 * 2. Primitive object usage
 *
 * Key concepts:
 * - BufferGeometry is the core of all geometries in Three.js
 * - Vertices define the points in 3D space
 * - Faces connect these vertices to create surfaces
 * - Custom geometries allow for complete control over object shapes
 */

// Triangle created using bufferAttribute directly in JSX
function BufferAttributeTriangle() {
  // Rotate the triangle for animation
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[-2, 0, 0]}>
      {/* 
        bufferGeometry is the raw way to create geometries
        It requires setting vertex positions manually
      */}
      <bufferGeometry>
        {/* 
          bufferAttribute defines properties for each vertex
          - 'attributes-position' attaches this as the position attribute
          - First argument is the array of coordinates [x1,y1,z1, x2,y2,z2, ...]
          - Second argument is itemSize (3 for xyz coordinates)
          - count is the number of vertices
        */}
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array([0, 1, 0, -1, -1, 0, 1, -1, 0]), 3]}
          count={3}
          itemSize={3}
        />

        {/* 
          We can also add normal vectors for proper lighting
          Normals should point perpendicular to the surface
        */}
        <bufferAttribute
          attach="attributes-normal"
          args={[new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1]), 3]}
          count={3}
          itemSize={3}
        />
      </bufferGeometry>
      <meshStandardMaterial color="orange" side={THREE.DoubleSide} />
    </mesh>
  );
}

// Custom shape using THREE.BufferGeometry outside of JSX
function CustomBufferGeometryTriangle() {
  // Create a reference to the mesh
  const meshRef = useRef<THREE.Mesh>(null);

  // Create a custom geometry object
  const geometry = new THREE.BufferGeometry();

  // Define vertices - three points in 3D space to form a triangle
  const vertices = new Float32Array([
    0,
    1,
    0, // top vertex
    -1,
    -1,
    0, // bottom-left vertex
    1,
    -1,
    0, // bottom-right vertex
  ]);

  // Add the vertices to the geometry as a position attribute
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

  // Calculate normals (direction perpendicular to the face)
  geometry.computeVertexNormals();

  // Material to use for the triangle
  const material = new THREE.MeshStandardMaterial({
    color: "royalblue",
    side: THREE.DoubleSide,
  });

  // Create a mesh from the geometry and material
  const mesh = new THREE.Mesh(geometry, material);

  // Animation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = -clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[2, 0, 0]}>
      {/* 
        The primitive component allows using raw Three.js objects
        inside the react-three-fiber scene
      */}
      <primitive object={mesh} />
    </mesh>
  );
}

// Custom 3D shape using BufferGeometry with indexed faces
function CustomIndexedGeometry() {
  // Create a reference to the mesh
  const meshRef = useRef<THREE.Mesh>(null);

  // Create a custom pyramid with a square base
  const geometry = new THREE.BufferGeometry();

  // Define vertices
  const vertices = new Float32Array([
    // Base vertices (square)
    -1,
    0,
    -1, // 0: bottom-left-back
    1,
    0,
    -1, // 1: bottom-right-back
    1,
    0,
    1, // 2: bottom-right-front
    -1,
    0,
    1, // 3: bottom-left-front

    // Top vertex (pyramid tip)
    0,
    2,
    0, // 4: top
  ]);

  // Define faces using indices (triangles)
  const indices = [
    // Base (two triangles to make a square)
    0,
    1,
    2,
    0,
    2,
    3,

    // Four sides of the pyramid
    0,
    4,
    1, // back-left face
    1,
    4,
    2, // back-right face
    2,
    4,
    3, // front-right face
    3,
    4,
    0, // front-left face
  ];

  // Set positions and indices
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(indices);

  // Calculate normals for proper lighting
  geometry.computeVertexNormals();

  // Animation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <bufferGeometry attach="geometry" {...geometry} />
      <meshStandardMaterial color="lime" side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function CustomGeometry() {
  const [showDescription, setShowDescription] = useState(true);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* Description panel */}
      {showDescription && (
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            zIndex: 10,
            background: "rgba(0,0,0,0.7)",
            padding: 20,
            borderRadius: 5,
            color: "white",
            maxWidth: 400,
          }}
        >
          <h3>Custom Geometry Techniques</h3>
          <p>Three different ways to create custom geometry:</p>

          <h4>Left: BufferAttribute in JSX</h4>
          <p>
            Direct use of bufferAttribute within JSX structure for simple
            shapes.
          </p>

          <h4>Center: Indexed Geometry</h4>
          <p>
            Creating geometry with indexed faces enables more complex shapes
            with fewer vertices.
          </p>

          <h4>Right: THREE.BufferGeometry + primitive</h4>
          <p>
            Creating THREE.BufferGeometry manually and using it with the
            primitive component.
          </p>

          <button onClick={() => setShowDescription(false)}>Close</button>
        </div>
      )}

      {/* Button to show description */}
      {!showDescription && (
        <button
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            zIndex: 10,
          }}
          onClick={() => setShowDescription(true)}
        >
          Show Info
        </button>
      )}

      <Canvas
        style={{ background: "#222" }}
        camera={{ position: [0, 2, 8], fov: 50 }}
      >
        <OrbitControls />

        {/* Add some light */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Grid for reference */}
        <gridHelper args={[10, 10]} />

        {/* Our custom geometry components */}
        <BufferAttributeTriangle />
        <CustomIndexedGeometry />
        <CustomBufferGeometryTriangle />
      </Canvas>
    </div>
  );
}
