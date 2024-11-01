import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

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

export default function Mac() {
  const { scene } = useGLTF('/medias/mac_grass_V2.glb');
  const mac = useRef();
  const { viewport } = useThree();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [rotation, setRotation] = useState({ x: 0, y: Math.PI / 20 });

  const handleMovement = (xFactor, yFactor) => {
    setRotation({
      x: yFactor * (isMobile ? 0.1 : 0.05),  // Increase sensitivity for mobile
      y: xFactor * (isMobile ? 0.1 : 0.05),
    });
  };

  // Function to disable/enable scroll
  const toggleScroll = (disable) => {
    document.body.style.overflow = disable ? 'hidden' : 'auto';
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      const mouseX = (event.clientX / innerWidth) * 2 - 1;
      const mouseY = (event.clientY / innerHeight) * 2 - 1;
      handleMovement(mouseX, mouseY);
    };

    const handleTouchMove = (event) => {
      const { innerWidth, innerHeight } = window;
      const touchX = (event.touches[0].clientX / innerWidth) * 2 - 1;
      const touchY = (event.touches[0].clientY / innerHeight) * 2 - 1;
      handleMovement(touchX, touchY);
    };

    if (isMobile) {
      toggleScroll(true); // Disable scroll on mobile
      window.addEventListener('touchmove', handleTouchMove);
    } else {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      toggleScroll(false); // Re-enable scroll when component unmounts
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isMobile]);

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