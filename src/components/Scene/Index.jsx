import { Canvas } from '@react-three/fiber';
import ModelAnimated from './ModelAnimated.js';
import { Environment, Loader, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense, useEffect, useState } from 'react';

export default function Index({ onLoad, onProgress }) {
  const [isLoading, setIsLoading] = useState(true);
  const { progress } = useProgress(); // Track progress at this level too

  // Forward progress updates to parent
  useEffect(() => {
    if (onProgress) {
      onProgress(progress);
    }
  }, [progress, onProgress]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleModelLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  const handleProgress = (progressValue) => {
    // Forward progress from ModelAnimated to parent
    if (onProgress) {
      onProgress(progressValue);
    }
  };

  return (
    <>
      <Canvas
        style={{ 
          background: 'transparent', 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%' 
        }}
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          premultipliedAlpha: false,
          antialias: true,
        }}
        camera={{ position: [0, 0, 5], fov: 50 }}
        onCreated={({ gl }) => {
          // When canvas is created, report some progress
          if (onProgress) onProgress(5);
        }}
      >
        <Suspense fallback={null}>
          <ModelAnimated 
            onLoad={handleModelLoad} 
            onProgress={handleProgress} 
          />
          <ambientLight intensity={0.3} />
          <directionalLight intensity={1.5} position={[5, 5, 5]} />
          <Environment preset="city" background={false} />
        </Suspense>
      </Canvas>
      
      {/* Use drei's Loader to help with progress tracking */}
      <Loader 
        dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`} 
        containerStyles={{display: 'none'}} // Hide it visually but use for tracking
      />
    </>
  );
}