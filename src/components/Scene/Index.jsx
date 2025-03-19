import { Canvas } from '@react-three/fiber';
import ModelAnimated from './ModelAnimated.js';
import { Environment, Loader } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense, useEffect, useState } from 'react';

export default function Index({ onLoad }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleModelLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  return (
    <>
      {/* {isLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-4 border-t-black rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700">Loading animation</p>
        </div>
      )} */}
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
      >
        <Suspense fallback={null}>
          <ModelAnimated onLoad={handleModelLoad} />
          <ambientLight intensity={0.3} />
          <directionalLight intensity={1.5} position={[5, 5, 5]} />
          <Environment preset="city" background={false} />
        </Suspense>
      </Canvas>
    </>
  );
}