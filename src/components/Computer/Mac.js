import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';



export default function Mac() {
  const { scene, animations } = useGLTF('/medias/mac_grass.glb');
  const mac = useRef();
  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);
  const { viewport } = useThree();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
  // Update rotation state based on mouse movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      const mouseX = (event.clientX / innerWidth) * 2 - 1;
      const mouseY = (event.clientY / innerHeight) * 2 - 1;

      setRotation({
        x: mouseY * 0.1, // Adjust sensitivity
        y: mouseX * 0.1,
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