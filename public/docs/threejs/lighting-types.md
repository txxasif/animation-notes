# Lighting Types

This example demonstrates different lighting types in Three.js:

- **AmbientLight**: Soft light that illuminates all objects equally
- **DirectionalLight**: Sun-like light with parallel rays
- **PointLight**: Light that emanates from a single point in all directions
- **SpotLight**: Light that projects in a cone shape
- **HemisphereLight**: Light that simulates sky and ground reflection
- **RectAreaLight**: Light that shines uniformly across a rectangular area

The example shows how each light type affects the appearance of objects,
shadows, and the overall mood of the scene.

## Key Concepts

- **Light Types** - Different kinds of light sources with unique characteristics
- **Light Properties** - Intensity, color, position, and direction of lights
- **Shadows** - How lights cast shadows in the scene
- **Performance Impact** - How lights affect rendering performance

## Code Example

```jsx
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { OrbitControls } from "@react-three/drei";

function LightDemo() {
  const [activeLightType, setActiveLightType] = useState("ambient");
  const [intensity, setIntensity] = useState(1);

  return (
    <Canvas shadows>
      <OrbitControls />

      <mesh receiveShadow castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>

      {activeLightType === "ambient" && (
        <ambientLight intensity={intensity} color="#ffffff" />
      )}

      {activeLightType === "directional" && (
        <directionalLight
          intensity={intensity}
          position={[5, 5, 5]}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
      )}

      {/* More light types would be conditionally rendered here */}

      <Controls
        lightType={activeLightType}
        setLightType={setActiveLightType}
        intensity={intensity}
        setIntensity={setIntensity}
      />
    </Canvas>
  );
}
```

## Browser Compatibility

All modern browsers with WebGL support can render these lighting effects, though performance may vary.

## Performance Considerations

- Different light types have varying performance costs
- Shadows significantly increase rendering costs
- Use the minimum number of lights necessary
- Consider baking lighting into textures for static scenes
