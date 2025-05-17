# 🎮 Basic 3D Scene: Lighting, Objects, and Math (Three.js with React Three Fiber)

This document breaks down the `BasicSetup` component, explaining how **lighting**, **objects**, and **math** concepts work together in a 3D scene using React Three Fiber (a React renderer for Three.js).

---

## 📦 Scene Overview

This scene renders:

- A **cube** floating above a **ground plane**
- Two types of lights: **Ambient Light** and **Directional Light**
- A **camera** with user control via `OrbitControls`

---

## 💡 Lighting in 3D (and in Physics Terms)

Lighting in 3D graphics simulates real-world light behavior using simplified physics-based models.

### 1. **Ambient Light**

- **Code:**

  ```jsx
  <ambientLight intensity={0.3} />
  ```

- **Physics Analogy:** Ambient light is like scattered light on a cloudy day — **non-directional**, **soft**, and **omnipresent**.
- **Effect:** Uniformly lights all surfaces regardless of orientation or position.
- **Math:** Adds a constant value to all pixel color calculations:

  ```
  color_final = color_base + ambient_light_intensity × color_material
  ```

---

### 2. **Directional Light**

- **Code:**

  ```jsx
  <directionalLight
    position={[5, 5, 5]}
    intensity={1}
    castShadow
    shadow-mapSize-width={1024}
    shadow-mapSize-height={1024}
  />
  ```

- **Physics Analogy:** Simulates **sunlight** — parallel rays from a distant source.
- **Effect:** Casts **shadows** and creates highlights based on surface angles.
- **Math (Phong Reflection Model):**

  ```
  color_final = ambient + diffuse + specular
  ```

  - **Diffuse (Lambertian reflection):**

    ```math
    diffuse = light_intensity × max(dot(N, L), 0)
    ```

    Where:

    - `N` = normal vector at the point
    - `L` = light direction vector

  - **Specular (Shiny spots):**

    ```math
    specular = light_intensity × (max(dot(R, V), 0))^shininess
    ```

    Where:

    - `R` = reflection vector
    - `V` = view direction

---

## 🔲 Object Materials & Lighting Interaction

### **meshStandardMaterial**

- Uses **PBR (Physically-Based Rendering)** for realistic shading.
- Relevant properties:

  - `color`: Base surface color.
  - `roughness`: 0 = smooth mirror, 1 = matte.
  - `metalness`: 0 = non-metal (plastic), 1 = fully metal.

- **Visual math model (BRDF):**

  ```
  Final Color = f(L, V, N, roughness, metalness) × light_color × light_intensity
  ```

  Where `f` is a complex Bidirectional Reflectance Distribution Function.

---

## 🎯 Geometry and Meshes

### Cube

```jsx
<mesh position={[0, 1, 0]} castShadow receiveShadow>
  <boxGeometry args={[1, 1, 1]} />
  <meshStandardMaterial color="royalblue" roughness={0.5} metalness={0.2} />
</mesh>
```

- **Mathematically:** A cube is defined by 6 square faces, each composed of 2 triangles (12 total).
- **Position:** `[0, 1, 0]` — 1 unit above ground to avoid intersection with the plane.
- **Shadows:**
  - `castShadow`: This object can block light and cast a shadow.
  - `receiveShadow`: This object can show shadows cast onto it.

---

### Ground Plane

```jsx
<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
  <planeGeometry args={[10, 10]} />
  <meshStandardMaterial color="#444" side={DoubleSide} />
</mesh>
```

- **Plane Geometry:** Flat surface with 2D shape, used as a "floor."
- **Rotation:**
  - Rotating `-Math.PI / 2` on the X-axis tilts the plane from vertical (YZ) to horizontal (XZ).
  - `Math.PI = 180°` → `Math.PI / 2 = 90°`
- **ReceiveShadow:** Shadows from the cube fall onto the plane.

---

## 📷 Camera and Controls

```jsx
<Canvas camera={{ fov: 75, position: [0, 2, 5], near: 0.1, far: 1000 }}>
```

- **FOV (Field of View):** 75° cone angle — wider gives more perspective distortion.
- **Position:** `[0, 2, 5]` — Eye level view, angled slightly downward.

### OrbitControls

```jsx
<OrbitControls />
```

- Enables mouse-based orbiting, zooming, and panning.
- Mathematically, rotates the camera around the target point using spherical coordinates.

---

## 🧮 Summary of Math Concepts Involved

| Concept           | Description                                                         |
| ----------------- | ------------------------------------------------------------------- |
| Radians           | Rotation units (π radians = 180°)                                   |
| Vectors (L, N, V) | Light, Normal, and View directions                                  |
| Dot Product       | Measures alignment between vectors (used in diffuse/specular)       |
| Reflection Vector | Used to simulate highlights                                         |
| Matrix Transform  | Used internally to apply position, rotation, and scale              |
| Shadow Mapping    | Uses a depth texture from light’s view to determine shadowed pixels |

---

## 🧠 Final Thoughts

This example is a foundation for building more advanced physically-based 3D scenes. By understanding the math and physics behind lights, materials, and transformations, you gain full control over realism and rendering performance.
