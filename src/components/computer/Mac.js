import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function Mac() {
  const { scene, animations } = useGLTF('/medias/mac_grass_V2.glb');
  const mac = useRef();
  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);
  const { viewport } = useThree();

  // Adjusted initial rotation to a more neutral state
  const [rotation, setRotation] = useState({ x: 0, y: Math.PI / 20 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      const mouseX = (event.clientX / innerWidth) * 2 - 1;
      const mouseY = (event.clientY / innerHeight) * 2 - 1;

      // Reduced sensitivity to limit rotation
      setRotation({
        x: mouseY * 0.05, // Lowered sensitivity for up/down rotation
        y: mouseX * 0.05, // Lowered sensitivity for left/right rotation
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Apply rotation on each frame
  useFrame(() => {
    if (mac.current) {
      mac.current.rotation.x = THREE.MathUtils.lerp(mac.current.rotation.x, rotation.x, 0.05);
      mac.current.rotation.y = THREE.MathUtils.lerp(mac.current.rotation.y, rotation.y, 0.05);
    }
  });

  return (
    <group ref={mac} scale={[10, 10, 10]}>
      <primitive object={scene} />
    </group>
  );
}