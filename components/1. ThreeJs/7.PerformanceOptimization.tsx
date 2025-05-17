"use client";
import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Stats,
  Instances,
  Instance,
  Text,
} from "@react-three/drei";
import * as THREE from "three";

/**
 * Performance Optimization in Three.js
 *
 * This file demonstrates various techniques to optimize Three.js performance:
 * 1. Instancing for repeated geometries
 * 2. Level of Detail (LOD)
 * 3. Object pooling and reuse
 * 4. Frustum culling
 * 5. Performance monitoring
 *
 * Key concepts:
 * - Always minimize draw calls
 * - Reuse geometries and materials whenever possible
 * - Only render what's visible
 * - Use appropriate detail levels based on distance
 */

// Simple box instance for instancing demo
function InstancedBoxes({ count = 1000 }) {
  // Create a single geometry and material to be reused
  const [geometry, material] = useMemo(() => {
    return [
      new THREE.BoxGeometry(0.1, 0.1, 0.1),
      new THREE.MeshStandardMaterial({ color: "#ff0000" }),
    ];
  }, []);

  // Create references for positions and scales
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [positions] = useState(() => {
    // Pre-compute all instance positions
    return Array.from({ length: count }, () => {
      return [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ];
    });
  });

  // Animation
  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    // Update rotation of the entire instanced mesh
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]}>
      {positions.map((position, i) => {
        // Set the position for each instance
        const matrix = new THREE.Matrix4();
        matrix.setPosition(position[0], position[1], position[2]);
        return <group key={i} matrix={matrix} matrixAutoUpdate={false} />;
      })}
    </instancedMesh>
  );
}

// Drei's Instances for more efficient instancing
function DreiInstances({ count = 1000 }) {
  // Create a shared geometry
  const instances = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.1,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    }));
  }, [count]);

  return (
    <Instances limit={count}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial />

      {instances.map((props, i) => (
        <Instance
          key={i}
          position={props.position}
          scale={props.scale}
          color={props.color}
        />
      ))}
    </Instances>
  );
}

// Object pooling example - only show objects in view
function ObjectPool({ count = 500, visibleCount = 50 }) {
  const objects = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
      ] as [number, number, number],
      visible: i < visibleCount,
      id: i,
    }));
  }, [count, visibleCount]);

  const [visibleObjects, setVisibleObjects] = useState(
    objects.slice(0, visibleCount)
  );

  // Rotate the pool of visible objects
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (time % 1 < 0.1) {
      // Every second, rotate the visible objects
      const newIndex = Math.floor(time) % (count - visibleCount);
      setVisibleObjects(objects.slice(newIndex, newIndex + visibleCount));
    }
  });

  return (
    <group>
      {visibleObjects.map((obj) => (
        <mesh key={obj.id} position={obj.position}>
          <octahedronGeometry args={[0.2]} />
          <meshStandardMaterial color={`hsl(${obj.id % 360}, 70%, 50%)`} />
        </mesh>
      ))}
    </group>
  );
}

// Levels of Detail demo
function LevelOfDetailDemo() {
  const groupRef = useRef<THREE.Group>(null);
  const [cameraPosition, setCameraPosition] = useState<
    [number, number, number]
  >([0, 0, 5]);
  const [detail, setDetail] = useState("high");

  // Camera distance affects detail level
  useEffect(() => {
    const distance = Math.sqrt(
      cameraPosition[0] ** 2 + cameraPosition[1] ** 2 + cameraPosition[2] ** 2
    );

    if (distance > 10) {
      setDetail("low");
    } else if (distance > 5) {
      setDetail("medium");
    } else {
      setDetail("high");
    }
  }, [cameraPosition]);

  // Monitor camera position changes
  useFrame(({ camera }) => {
    setCameraPosition([
      camera.position.x,
      camera.position.y,
      camera.position.z,
    ]);
  });

  return (
    <group ref={groupRef}>
      {/* Different detail levels based on camera distance */}
      {detail === "high" && (
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial color="#3f51b5" />
        </mesh>
      )}

      {detail === "medium" && (
        <mesh>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#3f51b5" />
        </mesh>
      )}

      {detail === "low" && (
        <mesh>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color="#3f51b5" />
        </mesh>
      )}

      {/* Display current detail level */}
      <group position={[0, 1.5, 0]}>
        <mesh>
          <planeGeometry args={[1, 0.3]} />
          <meshBasicMaterial color="black" transparent opacity={0.7} />
        </mesh>
        <Text position={[0, 0, 0.01]} fontSize={0.1} color="white">
          {detail}
        </Text>
      </group>
    </group>
  );
}

// User instructions component
function Instructions() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        left: 20,
        background: "rgba(0,0,0,0.7)",
        color: "white",
        padding: 15,
        borderRadius: 5,
        maxWidth: 400,
      }}
    >
      <h3>Performance Optimization Techniques:</h3>
      <ul>
        <li>
          <strong>Instancing:</strong> Using one draw call for many objects
          (left)
        </li>
        <li>
          <strong>Object Pooling:</strong> Only showing objects that matter
          (center)
        </li>
        <li>
          <strong>Level of Detail:</strong> Zoom out to see geometry simplify
          (right)
        </li>
      </ul>
      <p>Check the Stats panel in the top-left for FPS and draw calls</p>
    </div>
  );
}

export default function PerformanceOptimization() {
  const [showAllDemos, setShowAllDemos] = useState(false);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Instructions />

      {/* Performance toggle */}
      <button
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 10,
          padding: "8px 16px",
        }}
        onClick={() => setShowAllDemos(!showAllDemos)}
      >
        {showAllDemos
          ? "Show Fewer Objects"
          : "Show All (May Affect Performance)"}
      </button>

      <Canvas
        style={{ background: "#222" }}
        camera={{ position: [0, 0, 15], fov: 50 }}
        dpr={[1, 2]} // Limit pixel ratio for performance
      >
        <OrbitControls />

        {/* Simple lighting for better performance */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />

        {/* Performance monitoring */}
        <Stats />

        {/* Main scene */}
        <group position={[-5, 0, 0]}>
          <InstancedBoxes count={showAllDemos ? 5000 : 1000} />
        </group>

        <group position={[0, 0, 0]}>
          <ObjectPool
            count={showAllDemos ? 2000 : 500}
            visibleCount={showAllDemos ? 200 : 50}
          />
        </group>

        <group position={[5, 0, 0]}>
          <LevelOfDetailDemo />
        </group>

        {/* Add DreiInstances to actually use it */}
        <group position={[0, -5, 0]}>
          <DreiInstances count={200} />
        </group>
      </Canvas>
    </div>
  );
}
