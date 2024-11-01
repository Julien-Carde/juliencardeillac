'use client';
import { Canvas } from '@react-three/fiber';
import ModelAnimated from './ModelAnimated.js';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect } from 'react';



export default function Index() {

  useEffect(() => {
    // Prevent scrolling
    document.body.style.overflow = 'hidden';

    // Reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  return (
    <Canvas
      style={{ background: 'transparent' }}
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        outputEncoding: THREE.sRGBEncoding,
        premultipliedAlpha: false,
        antialias: true,
      }}
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      {/* Animated Model Component */}
      <ModelAnimated />
      
      {/* Scene Lighting */}
      <ambientLight intensity={0.3} /> {/* Reduced intensity for ambient light */}
      <directionalLight intensity={1.5} position={[5, 5, 5]} />
      
      {/* Environment Background */}
      <Environment preset="city" background={false} />
    </Canvas>
  );
}