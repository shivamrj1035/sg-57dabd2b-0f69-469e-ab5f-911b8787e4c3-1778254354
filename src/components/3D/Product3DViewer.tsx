"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface Product3DModelProps {
  imageUrl?: string;
  rotating?: boolean;
}

function Product3DModel({ imageUrl, rotating = true }: Product3DModelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current && rotating) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color={hovered ? "#8b5cf6" : "#6366f1"}
        metalness={0.8}
        roughness={0.2}
        emissive={hovered ? "#ff6b6b" : "#000000"}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

interface Product3DViewerProps {
  imageUrl?: string;
  autoRotate?: boolean;
  className?: string;
}

export function Product3DViewer({ imageUrl, autoRotate = true, className = "" }: Product3DViewerProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Product3DModel imageUrl={imageUrl} rotating={autoRotate} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}