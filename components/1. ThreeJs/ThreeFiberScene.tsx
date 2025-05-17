"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
// function RotatingPlane() {
//   const meshRef = useRef<Mesh>(null);
//   const meshRef2 = useRef<Mesh>(null);

//   useFrame(() => {
//     // if (meshRef.current) {
//     //   meshRef.current.rotation.y += 0.01;
//     //   meshRef.current.rotation.x += 0.01;
//     //   meshRef.current.rotation.z += 0.01;
//     // }
//     // if (meshRef2.current) {
//     //   meshRef2.current.rotation.y += 0.01;
//     //   meshRef2.current.rotation.x += 0.01;
//     //   meshRef2.current.rotation.z += 0.01;
//     // }
//   });

//   return (
//     <>
//       <OrbitControls />
//       <directionalLight intensity={0.5} />
//       <group>
//         <mesh ref={meshRef} position={[0, 0, 0]}>
//           {/* <axesHelper />
//           <gridHelper args={[20, 20]} /> */}

//           <boxGeometry args={[1, 1, 1]} />
//           <meshBasicMaterial color="red" />
//         </mesh>
//         <mesh ref={meshRef2} position={[2, 0, 0]}>
//           <boxGeometry args={[1, 1, 1]} />
//           <meshBasicMaterial
//             color="blue"
//             //    wireframe
//           />
//         </mesh>
//       </group>
//     </>
//   );
// }

// // triangle using primitive
// function Triangle() {
//   const geometry = new THREE.BufferGeometry();
//   const vertices = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]);
//   geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
//   const material = new THREE.MeshBasicMaterial({
//     color: "blue",
//     side: THREE.DoubleSide,
//   });
//   const mesh = new THREE.Mesh(geometry, material);

//   return (
//     <mesh position={[2, 0, 0]}>
//       <primitive object={mesh} />
//     </mesh>
//   );
// }
// function Triangle2() {
//   return (
//     <mesh>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           args={[new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]), 3]}
//           count={3}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <meshBasicMaterial color="red" />
//     </mesh>
//   );
// }
function Light() {
  return (
    <>
      <OrbitControls />
      <directionalLight intensity={1} position={[10, 10, 0]} color="white" />
      {/* <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh> */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh position={[0, -1, 0]} rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="maroon" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}
export default function ThreeFiberScene() {
  return (
    <>
      <Canvas
        camera={{ fov: 15, position: [10, 10, 10], near: 10, far: 100 }}
        style={{ height: "100vh", width: "100vw", backgroundColor: "gray" }}
      >
        {/* <OrbitControls /> */}
        {/* <RotatingPlane />
        <Triangle />
        <Triangle2 /> */}
        <Light />
      </Canvas>
    </>
  );
}
