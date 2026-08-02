"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";

function SerumBottleModel() {
  const groupRef = useRef<THREE.Group>(null);

  // Mouse interactivity: gentle tilt following cursor
  useFrame((state) => {
    if (!groupRef.current) return;
    const { x, y } = state.pointer;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.4, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.2, 0.05);
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} rotation={[0, 0, -0.08]}>
      {/* Glass Bottle Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.85, 2.4, 32]} />
        <meshPhysicalMaterial
          color="#F8F5F1"
          transmission={0.85}
          opacity={1}
          transparent
          roughness={0.1}
          ior={1.4}
          thickness={0.5}
        />
      </mesh>

      {/* Internal Rose Gold Liquid Core */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.72, 0.76, 2.1, 32]} />
        <meshStandardMaterial
          color="#C98F78"
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Rose Gold Metallic Neck & Collar */}
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.35, 0.45, 0.3, 32]} />
        <meshStandardMaterial
          color="#B88968"
          metalness={0.85}
          roughness={0.15}
        />
      </mesh>

      {/* Matte Dropper Cap */}
      <mesh position={[0, 1.7, 0]}>
        <cylinderGeometry args={[0.28, 0.32, 0.4, 32]} />
        <meshStandardMaterial
          color="#171615"
          roughness={0.6}
        />
      </mesh>
    </group>
  );
}

export default function SerumCanvas() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Warm Studio Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFF5EE" />
        <pointLight position={[-5, -2, -2]} intensity={0.8} color="#C98F78" />

        {/* Floating Animation Wrapper */}
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
          <SerumBottleModel />
        </Float>

        {/* Soft Floor Shadow */}
        <ContactShadows
          position={[0, -2.2, 0]}
          opacity={0.35}
          scale={6}
          blur={2.5}
          color="#171615"
        />

        {/* Realistic Lighting Reflections */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}