import React, { useRef, useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function Butterfly() {
  const { scene, animations } = useGLTF('/medias/animated_butterfly.glb');
  const butterfly = useRef();
  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);
  const { viewport } = useThree();
  
  const mousePosition = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });

  const boundaries = useRef({
    left: -viewport.width / 2 + 3,
    right: viewport.width / 2 - 3,
    top: viewport.height / 2 - 3,
    bottom: -viewport.height / 2 + 3,
  });

  // Capture mouse position
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      mousePosition.current = { x, y };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Set initial rotation once
  useEffect(() => {
    if (butterfly.current) {
      butterfly.current.scale.set(1.5, 1.5, 1.5);
    }
  }, []);

  // Smooth position update without rotation in useFrame
  useFrame(() => {
    targetPosition.current.x += (mousePosition.current.x * viewport.width * 0.5 - targetPosition.current.x) * 0.01;
    targetPosition.current.y += (mousePosition.current.y * viewport.height * 0.5 - targetPosition.current.y) * 0.01;

    if (butterfly.current) {
      butterfly.current.position.x = THREE.MathUtils.clamp(
        targetPosition.current.x,
        boundaries.current.left,
        boundaries.current.right
      );
      butterfly.current.position.y = THREE.MathUtils.clamp(
        targetPosition.current.y,
        boundaries.current.bottom,
        boundaries.current.top
      );
    }

    mixer.update(0.01);
  });

  // Apply glass material to butterfly
  useEffect(() => {
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      thickness: 0.1,
      roughness: 0.02,
      transmission: 1,
      ior: 1.5,
      chromaticAberration: 0.2,
      metalness: 0,
      transparent: true,
      opacity: 0.6,
    });

    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = glassMaterial;
      }
    });
  }, [scene]);

  // Start animations on load
  useEffect(() => {
    animations.forEach((clip) => mixer.clipAction(clip).play());
    return () => mixer.stopAllAction();
  }, [animations, mixer]);

  return (
    <group ref={butterfly} scale={viewport.width / 4}
    rotation={[Math.PI/3, Math.PI, 0]}>
      <primitive object={scene} />
    </group>
  );
}