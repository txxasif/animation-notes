# Geometry Types

This example displays various geometry primitives available in Three.js:

- **BoxGeometry**: Simple cube
- **SphereGeometry**: Sphere with configurable segments
- **CylinderGeometry**: Cylinder or cone shape
- **TorusGeometry**: Donut shape
- **TorusKnotGeometry**: Complex knot geometry
- **PlaneGeometry**: Flat surface
- **CircleGeometry**: Flat circular surface
- **TetrahedronGeometry**: Pyramid with triangular base

Each geometry can be customized with different materials and parameters
to create diverse visual elements in your 3D scenes.

## Key Concepts

- **Primitive Geometries** - Basic shapes provided by Three.js
- **Geometry Parameters** - Customization options for each shape
- **Vertices and Faces** - Building blocks of 3D geometries
- **Wireframe Rendering** - Visualizing the structure of geometries

## Code Example

```jsx
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

const geometryTypes = [
  { name: "Box", create: () => <boxGeometry args={[1, 1, 1]} /> },
  { name: "Sphere", create: () => <sphereGeometry args={[0.7, 32, 32]} /> },
  {
    name: "Cylinder",
    create: () => <cylinderGeometry args={[0.5, 0.5, 1, 32]} />,
  },
  { name: "Torus", create: () => <torusGeometry args={[0.5, 0.2, 16, 100]} /> },
  {
    name: "TorusKnot",
    create: () => <torusKnotGeometry args={[0.5, 0.15, 100, 16]} />,
  },
  { name: "Plane", create: () => <planeGeometry args={[1, 1, 1]} /> },
  { name: "Circle", create: () => <circleGeometry args={[0.7, 32]} /> },
  {
    name: "Tetrahedron",
    create: () => <tetrahedronGeometry args={[0.7, 0]} />,
  },
];

function GeometryDemo() {
  const [currentGeometry, setCurrentGeometry] = useState(0);
  const [wireframe, setWireframe] = useState(false);

  return (
    <>
      <mesh>
        {geometryTypes[currentGeometry].create()}
        <meshStandardMaterial color="#1e88e5" wireframe={wireframe} />
      </mesh>

      <div className="controls">
        <select
          value={currentGeometry}
          onChange={(e) => setCurrentGeometry(Number(e.target.value))}
        >
          {geometryTypes.map((type, index) => (
            <option key={type.name} value={index}>
              {type.name}
            </option>
          ))}
        </select>
        <label>
          <input
            type="checkbox"
            checked={wireframe}
            onChange={() => setWireframe(!wireframe)}
          />
          Wireframe
        </label>
      </div>
    </>
  );
}
```

## Performance Considerations

Complex geometries with many vertices can impact performance. Consider using LOD (Level of Detail) for complex geometries in performance-sensitive applications.
