import React, { useRef, useEffect, useState } from 'react';
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

export default function MacAnimated() {
  const { scene } = useGLTF('/medias/mac_grass_V2.glb');
  const mac = useRef();
  const { viewport } = useThree();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [videoTexture, setVideoTexture] = useState(null);

  const [rotation, setRotation] = useState({ x: 0, y: Math.PI / 20 });

  // Load video texture
  useEffect(() => {
    const video = document.createElement('video');
    video.src = '/medias/rotatingCube.mp4'; // Change this to your video path
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true; // Mute to allow autoplay
    video.play();

    const texture = new THREE.VideoTexture(video);
    setVideoTexture(texture);

    return () => {
      video.pause();
      video.src = '';
    };
  }, []);

  const handleMovement = (xFactor, yFactor) => {
    setRotation({
      x: yFactor * (isMobile ? 0.1 : 0.05),
      y: xFactor * (isMobile ? 0.1 : 0.05),
    });
  };

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
      toggleScroll(true);
      window.addEventListener('touchmove', handleTouchMove);
    } else {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      toggleScroll(false);
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
    <>
      <group ref={mac} scale={[10, 10,  10]}>
        <primitive object={scene} />
        {videoTexture && (
          <mesh position={[-0.14, 0.42, .17]} rotation={[-0.1, .432, 0.04]} scale={[0.36, 0.36, 0.32]}>
            <planeGeometry args={[1, 0.75]} />
            <meshBasicMaterial map={videoTexture} toneMapped={false} />
          </mesh>
        )}
      </group>
    </>
  );
}