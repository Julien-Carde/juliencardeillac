import { Canvas } from '@react-three/fiber';
import ModelAnimated from './ModelAnimated.js';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect } from 'react';

export default function Index({ onLoad }) {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    onLoad?.();
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [onLoad]);

  return (
    <Canvas
      style={{ background: 'transparent' }}
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        premultipliedAlpha: false,
        antialias: true,
      }}
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      <ModelAnimated />
      <ambientLight intensity={0.3} />
      <directionalLight intensity={1.5} position={[5, 5, 5]} />
      <Environment preset="city" background={false} />
    </Canvas>
  );
}