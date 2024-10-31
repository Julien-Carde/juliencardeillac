'use client';
import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import Mac from './Mac';
import styles from './Mac.module.css'

export default function Index() {

    const [isLoaded, setIsLoaded] = useState(false);


  return (
    <div className={`${styles.canvasContainer} ${isLoaded ? styles.loaded : ''}`}>
    <Canvas
      style={{ background: 'transparent' }}
      camera={{ position: [4, 3, 12],
         fov: 50, 
        rotation: [0, 0, 0]}}
    >
      {/* Animated Model Component */}
      <Mac />
      
      {/* Scene Lighting */}
      <ambientLight intensity={0.6} /> {/* Very subtle ambient light */}
      <directionalLight 
        intensity={1} 
        position={[-5, 5, 5]} 
        color="#ffdab9" 
        castShadow 
      />
      
      {/* Add a subtle light box for ambient glow */}
      
      
      {/* Environment Background */}
    </Canvas>
    </div>
  );
}