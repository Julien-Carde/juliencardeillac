'use client';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import Flower from './Flower'

export default function Index() {
  return (
    <Canvas
      style={{ background: 'transparent' }}
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        outputEncoding: THREE.sRGBEncoding,
        premultipliedAlpha: false,
        antialias: true,
      }}
      camera={{ position: [0, 0, 10], fov: 50,
       }}
    >
      {/* Animated Model Component */}
      <Flower />
      
      {/* Scene Lighting */}
      <ambientLight intensity={1} /> {/* Reduced intensity for ambient light */}
      <directionalLight intensity={1.5} position={[5, 5, 5]} />
      
      {/* Environment Background */}
      <Environment preset="sunset" background={false} />
    </Canvas>
  );
}