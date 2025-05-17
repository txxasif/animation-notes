"use client";
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

/**
 * Lighting Types in Three.js
 *
 * This file demonstrates the different types of lights available in Three.js
 * and when to use each type.
 *
 * Key lighting concepts:
 * - Different light types create different moods and effects
 * - Proper lighting is crucial for realistic 3D scenes
 * - Multiple lights are often used together for balanced illumination
 * - Shadows add realism but affect performance
 */
export default function LightingTypes() {
  // State to track which light type is selected
  const [selectedLight, setSelectedLight] = useState("ambient");
  // State to toggle shadows on/off
  const [shadowsEnabled, setShadowsEnabled] = useState(true);
  // State to control light intensity
  const [intensity, setIntensity] = useState(1);

  // List of available light types with descriptions
  const lightTypes = {
    ambient: {
      name: "Ambient Light",
      description:
        "Illuminates all objects equally from all directions. No shadows. Use for base illumination or to brighten shadows.",
      component: () => <ambientLight intensity={intensity} />,
    },
    directional: {
      name: "Directional Light",
      description:
        "Parallel rays in a single direction, like the sun. Casts sharp shadows. Good for outdoor scenes.",
      component: () => (
        <directionalLight
          position={[5, 5, 5]}
          intensity={intensity}
          castShadow={shadowsEnabled}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
      ),
    },
    point: {
      name: "Point Light",
      description:
        "Emits light in all directions from a single point, like a light bulb. Good for lamps, fires, etc.",
      component: () => (
        <pointLight
          position={[0, 2, 0]}
          intensity={intensity}
          castShadow={shadowsEnabled}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.1}
          shadow-camera-far={30}
        />
      ),
    },
    spot: {
      name: "Spot Light",
      description:
        "Cone of light from a point, like a flashlight. Use for dramatic lighting, street lamps, etc.",
      component: () => (
        <spotLight
          position={[5, 5, 0]}
          angle={Math.PI / 6}
          penumbra={0.2}
          intensity={intensity}
          castShadow={shadowsEnabled}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          target-position={[0, 0, 0]}
        />
      ),
    },
    hemisphere: {
      name: "Hemisphere Light",
      description:
        "Gradient light from sky to ground. No shadows. Excellent for outdoor scenes with natural light.",
      component: () => (
        <hemisphereLight
          color="#ffffff"
          groundColor="#444444"
          intensity={intensity}
        />
      ),
    },
    rect: {
      name: "Rect Area Light",
      description:
        "Light emitted from a rectangular area, like a TV screen or window. Soft shadows. Perfect for indoor scenes.",
      component: () => (
        // RectAreaLight isn't directly available in react-three-fiber
        // This is represented here for completeness
        <group>
          <ambientLight intensity={intensity * 0.2} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={intensity * 0.7}
            castShadow={shadowsEnabled}
          />
          <mesh position={[3, 3, 3]} rotation={[0, -Math.PI / 4, 0]}>
            <planeGeometry args={[3, 3]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      ),
    },
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* UI for selecting different light types */}
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
          maxWidth: 300,
        }}
      >
        <h3>Lighting Types</h3>
        {Object.entries(lightTypes).map(([key, { name }]) => (
          <div key={key}>
            <label>
              <input
                type="radio"
                checked={selectedLight === key}
                onChange={() => setSelectedLight(key)}
              />
              {name}
            </label>
          </div>
        ))}

        <div style={{ marginTop: 10 }}>
          <label>
            <input
              type="checkbox"
              checked={shadowsEnabled}
              onChange={() => setShadowsEnabled(!shadowsEnabled)}
            />
            Enable Shadows
          </label>
        </div>

        <div style={{ marginTop: 10 }}>
          <label>
            Intensity: {intensity.toFixed(1)}
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={intensity}
              onChange={(e) => setIntensity(parseFloat(e.target.value))}
              style={{ width: "100%" }}
            />
          </label>
        </div>

        <div style={{ marginTop: 20 }}>
          <h4>{lightTypes[selectedLight as keyof typeof lightTypes].name}</h4>
          <p>
            {lightTypes[selectedLight as keyof typeof lightTypes].description}
          </p>
        </div>
      </div>

      <Canvas
        style={{ background: "#111" }}
        camera={{ position: [0, 3, 8], fov: 50 }}
        shadows={shadowsEnabled}
      >
        <OrbitControls />

        {/* The selected light type */}
        {lightTypes[selectedLight as keyof typeof lightTypes].component()}

        {/* Scene objects to demonstrate lighting */}
        <group>
          {/* Center sphere */}
          <mesh position={[0, 1, 0]} castShadow receiveShadow>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color="#f5f5f5"
              metalness={0.2}
              roughness={0.1}
            />
          </mesh>

          {/* Small cubes surrounding the sphere */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i / 6) * Math.PI * 2;
            const x = Math.cos(angle) * 3;
            const z = Math.sin(angle) * 3;
            return (
              <mesh key={i} position={[x, 0.5, z]} castShadow receiveShadow>
                <boxGeometry args={[0.7, 0.7, 0.7]} />
                <meshStandardMaterial
                  color={`hsl(${i * 60}, 70%, 50%)`}
                  roughness={0.7}
                />
              </mesh>
            );
          })}

          {/* Ground plane */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.001, 0]}
            receiveShadow
          >
            <planeGeometry args={[15, 15]} />
            <meshStandardMaterial color="#444" />
          </mesh>

          {/* Tall cylinder */}
          <mesh position={[-3, 2, -3]} castShadow receiveShadow>
            <cylinderGeometry args={[0.5, 0.5, 4, 32]} />
            <meshStandardMaterial color="#3370d4" roughness={0.6} />
          </mesh>

          {/* Angled plane */}
          <mesh
            position={[3, 1.5, -2]}
            rotation={[Math.PI / 6, 0, Math.PI / 3]}
            castShadow
            receiveShadow
          >
            <planeGeometry args={[3, 2]} />
            <meshStandardMaterial color="#d46833" side={2} roughness={0.8} />
          </mesh>
        </group>
      </Canvas>
    </div>
  );
}
