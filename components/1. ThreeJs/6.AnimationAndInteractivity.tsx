"use client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/**
 * Animation and Interactivity in Three.js
 *
 * This file demonstrates various animation techniques and interactivity:
 * 1. useFrame for animation
 * 2. Event handling (click, hover)
 * 3. Animated materials
 *
 * Key concepts:
 * - useFrame provides a way to run code on every frame
 * - Event handling allows for interactive 3D objects
 * - Animation can be applied to position, rotation, scale, and materials
 */

// A cube that rotates and changes color on interaction
function AnimatedCube(props: {
  position: [number, number, number];
  color?: string;
}) {
  // Reference to the mesh
  const mesh = useRef<THREE.Mesh>(null);

  // State for color and hover/active state
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  // Animation using useFrame hook
  useFrame((state, delta) => {
    if (!mesh.current) return;

    // Rotate the cube at different speeds based on interaction state
    mesh.current.rotation.x += delta * (active ? 2 : 0.5);
    mesh.current.rotation.y += delta * (active ? 1 : 0.2);

    // Pulse the scale if hovered
    if (hovered) {
      const pulse = Math.sin(state.clock.elapsedTime * 10) * 0.05 + 1;
      mesh.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <mesh
      ref={mesh}
      position={props.position}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={
          hovered ? "#ff9500" : active ? "#ff0000" : props.color || "#1e88e5"
        }
        metalness={active ? 0.8 : 0.2}
        roughness={active ? 0.1 : 0.8}
      />
    </mesh>
  );
}

// A sphere with animated dynamic texture (wave pattern)
function AnimatedSphere() {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);

  // Simple wave shader for the sphere
  const uniforms = {
    time: { value: 0 },
    color1: { value: new THREE.Color("#ff0000") },
    color2: { value: new THREE.Color("#0000ff") },
  };

  // Animation using useFrame
  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uniforms.time.value = clock.elapsedTime;
    }

    if (mesh.current) {
      // Wobble the sphere
      mesh.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 0.5;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0.5, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      {/* Custom shader material for animated effect */}
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          uniform vec3 color1;
          uniform vec3 color2;
          varying vec2 vUv;
          
          void main() {
            float wave = sin(vUv.x * 10.0 + time * 2.0) * 0.5 + 0.5;
            vec3 color = mix(color1, color2, wave);
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}

// An interactive ring that responds to pointer events
function InteractiveRing() {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;

    // Gentle floating motion
    ringRef.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.1 + 0.5;
    ringRef.current.rotation.y = clock.elapsedTime * 0.2;
  });

  // Create ring segments
  const segments = 8;
  const radius = 2;

  const handleSegmentHover = (index: number | null) => {
    setHoveredSegment(index);
  };

  return (
    <group ref={ringRef} position={[0, 0.5, 0]}>
      {Array.from({ length: segments }).map((_, i) => {
        const angle = (i / segments) * Math.PI * 2;
        const nextAngle = ((i + 1) / segments) * Math.PI * 2;

        const isHovered = hoveredSegment === i;

        // Calculate positions
        const x1 = Math.cos(angle) * radius;
        const z1 = Math.sin(angle) * radius;
        const x2 = Math.cos(nextAngle) * radius;
        const z2 = Math.sin(nextAngle) * radius;

        return (
          <group key={i}>
            <mesh
              position={[(x1 + x2) / 2, isHovered ? 0.1 : 0, (z1 + z2) / 2]}
              rotation={[0, -angle - Math.PI / segments, 0]}
              onPointerOver={() => handleSegmentHover(i)}
              onPointerOut={() => handleSegmentHover(null)}
              onClick={() => alert(`Clicked segment ${i + 1}`)}
            >
              <boxGeometry
                args={[
                  0.4,
                  isHovered ? 0.3 : 0.2,
                  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(z2 - z1, 2)),
                ]}
              />
              <meshStandardMaterial
                color={isHovered ? "#ff9500" : `hsl(${i * 45}, 70%, 50%)`}
                emissive={isHovered ? "#ff9500" : undefined}
                emissiveIntensity={isHovered ? 0.5 : 0}
              />
            </mesh>
          </group>
        );
      })}
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
      <h3>Interactive Elements:</h3>
      <ul>
        <li>
          <strong>Small Cubes:</strong> Hover to pulse, click to change color
          and speed
        </li>
        <li>
          <strong>Center Sphere:</strong> Watch the animated shader pattern
        </li>
        <li>
          <strong>Outer Ring:</strong> Hover over segments to raise them, click
          for an alert
        </li>
      </ul>
      <p>
        Use orbit controls to navigate the scene (drag to rotate, scroll to
        zoom)
      </p>
    </div>
  );
}

export default function AnimationAndInteractivity() {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Instructions />

      <Canvas
        style={{ background: "#222" }}
        camera={{ position: [0, 3, 8], fov: 50 }}
      >
        <OrbitControls />

        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#ff9000" />

        {/* Grid for reference */}
        <gridHelper args={[20, 20, "#666", "#444"]} />

        {/* Our animated and interactive objects */}
        <AnimatedSphere />
        <InteractiveRing />

        {/* Multiple animated cubes */}
        {[
          [-3, 0.5, -3],
          [3, 0.5, -3],
          [-3, 0.5, 3],
          [3, 0.5, 3],
        ].map((position, index) => (
          <AnimatedCube
            key={index}
            position={position as [number, number, number]}
            color={`hsl(${index * 90}, 70%, 50%)`}
          />
        ))}
      </Canvas>
    </div>
  );
}
