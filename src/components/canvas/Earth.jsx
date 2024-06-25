import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Stars, Html } from "@react-three/drei";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");
  return (
    <primitive object={earth.scene} scale={3} position-y={0} rotation-y={0} />
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[100, 100, 100]} angle={0.1} penumbra={1} intensity={1} castShadow />
      <Suspense fallback={<Html center>Loading...</Html>}>
        <OrbitControls
          autoRotate
          enableZoom={true}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
        <Earth />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
