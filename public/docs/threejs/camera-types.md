# Camera Types

This example showcases the different camera types available in Three.js:

- **Perspective Camera**: The default camera that mimics how human eyes see
- **Orthographic Camera**: Creates a view where objects remain the same size regardless of distance
- **Array Camera**: Renders the scene from multiple cameras into specific portions of the viewport
- **Stereo Camera**: Creates stereoscopic 3D effects

The example allows you to switch between these cameras and adjust their parameters
to understand how they affect the scene rendering and perception.

## Key Concepts

- **PerspectiveCamera** - Mimics human vision with perspective distortion
- **OrthographicCamera** - Creates views without perspective distortion
- **Field of View (FOV)** - Controls the visible amount of scene
- **Aspect Ratio** - Width divided by height of the view
- **Near and Far Clipping Planes** - Define the viewable depth range

## Code Example

```jsx
import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function CameraSelector() {
  const [cameraType, setCameraType] = useState("perspective");
  const { camera, size } = useThree();

  // Camera parameters logic
  useEffect(() => {
    if (cameraType === "perspective") {
      camera.fov = 75;
      camera.near = 0.1;
      camera.far = 1000;
      camera.position.set(3, 3, 3);
    } else if (cameraType === "orthographic") {
      camera.left = size.width / -100;
      camera.right = size.width / 100;
      camera.top = size.height / 100;
      camera.bottom = size.height / -100;
      camera.near = 0.1;
      camera.far = 1000;
      camera.position.set(3, 3, 3);
    }
    camera.updateProjectionMatrix();
  }, [cameraType, camera, size]);

  return (
    <div className="camera-controls">
      <button onClick={() => setCameraType("perspective")}>
        Perspective Camera
      </button>
      <button onClick={() => setCameraType("orthographic")}>
        Orthographic Camera
      </button>
    </div>
  );
}
```

## Performance Considerations

Different camera types have varying performance implications, especially when rendering complex scenes.
