'use client';
import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, FXAA, ToneMapping, GammaCorrection } from '@react-three/postprocessing';
import { useState, useEffect } from 'react';
import * as THREE from 'three';
import Mac from './Mac.js';
import styles from './Mac.module.css';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);
    const handler = (event) => setMatches(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

export default function Index() {

  const isMobile = useMediaQuery('(max-width: 768px)'); // Adjust width as needed


  return (
    <Canvas
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping, // More realistic tone mapping
        colorSpace: THREE.SRGBColorSpace, // Set color space for true RGB representation
        outputEncoding: THREE.sRGBEncoding,
        antialias: true,
      }}
      style={{ background: 'transparent' }}
      camera={{
        position: isMobile ? [2, 3, 15] : [4, 3, 12],
        fov: 50,
        rotation: [0, 0, 0]
      }}
    >
      {/* Animated Model Component */}
      <Mac />

      {/* Scene Lighting */}
      <ambientLight intensity={3} /> 
      <directionalLight
        intensity={0}
        position={[-5, 5, 5]}
        color="#ffdab9"
        castShadow
      />
          
      {/* <EffectComposer>
      <FXAA /> 

      <DepthOfField focusDistance={0.01} focalLength={0.01} bokehScale={1} height={480} />
        <Bloom
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          intensity={0.1}
        />
      </EffectComposer> */}
      


    </Canvas>
  );
}