// Import dependencies
import React, { useRef, useEffect, useState } from 'react';
import { MeshTransmissionMaterial, useGLTF, Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useSpring, animated, easings } from '@react-spring/three';
import * as THREE from 'three';

// Custom hook to detect screen size
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

export default function Model() {
  const { nodes } = useGLTF('/medias/AbstractBall.glb');
  const { viewport } = useThree();
  const torus = useRef();
  const materialRef = useRef();
  const isMobile = useMediaQuery('(max-width: 768px)'); // Detect mobile screens

  // Animation properties with spring
  const [springProps, setSpring] = useSpring(() => ({
    rotationSpeed: 0.005,
    thickness: isMobile ? 0 : 0.08,
    direction: 1,
    scale: [0.7, 0.7, 0.7],
    config: {
      mass: 6,
      tension: 50,
      friction: 100,
      easing: easings.easeInOutSine,
    },
  }));

  // Hover effect (desktop)
  const handleHoverStart = () => {
    setSpring({ rotationSpeed: 0.02, thickness: isMobile ? 0.2 : 0.2, scale: [0.9, 0.9, 0.9] });
  };
  const handleHoverEnd = () => {
    setSpring({ rotationSpeed: 0.007, thickness: isMobile ? 0 : 0.08, scale: [0.8, 0.8, 0.8] });
  };

  // Touch effect (mobile)
  const handleTouch = () => {
    setSpring({ thickness: 0.5, rotationSpeed: 0.03 });
    setTimeout(() => setSpring({ thickness: 0, rotationSpeed: 0.005 }), 1500);
  };

  // Apply rotation and thickness (optimized)
  useFrame(() => {
    if (torus.current && springProps.rotationSpeed.get() > 0) {
      torus.current.rotation.y += springProps.rotationSpeed.get() * springProps.direction.get();
    }
    if (materialRef.current && materialRef.current.thickness !== springProps.thickness.get()) {
      materialRef.current.thickness = springProps.thickness.get();
    }
  });

  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} />

      <group scale={viewport.width / 6}>
        <mesh position={[0, 0, -2]}>
          <planeGeometry args={[20, 20]} />
          <meshBasicMaterial color="white" />
        </mesh>

        <Text
          font="/fonts/Helvetica.ttf"
          position={isMobile ? [-0.45, -0.4, -1] : [0, -0.4, -1]}
          fontSize={isMobile ? 0.2 : 0.15}
          color="black"
          anchorX="center"
          anchorY="middle"
          renderOrder={5} // Increased render order to make sure text is on top
        >
          Software Engineer
        </Text>
        <Text
          font="/fonts/Helvetica.ttf"
          position={isMobile ? [-0.87, -0.65, -1] : [0, -0.6, -1]}
          fontSize={isMobile ? 0.2 : 0.15}
          color="black"
          anchorX="center"
          anchorY="middle"
          renderOrder={5} // Ensure text is rendered on top
        >
          3D Artist
        </Text>

        {isMobile ? (
          <>
            <Text
              font="/fonts/Helvetica.ttf"
              position={[-0.5, 0.6, -1]}
              fontSize={0.6}
              color="black"
              anchorX="center"
              anchorY="middle"
              renderOrder={5}
            >
              Julien
            </Text>
            <Text
              font="/fonts/Helvetica.ttf"
              position={[0, 0, -1]}
              fontSize={0.6}
              color="black"
              anchorX="center"
              anchorY="middle"
              renderOrder={5}
            >
              Cardeillac
            </Text>
          </>
        ) : (
          <Text
            font="/fonts/Helvetica.ttf"
            position={[0, 0, -1]}
            fontSize={0.6}
            color="black"
            anchorX="center"
            anchorY="middle"
            renderOrder={5}
          >
            Julien Cardeillac
          </Text>
        )}

        {/* 3D object with hover and touch effect */}
        <animated.mesh
          ref={torus}
          geometry={nodes.Sphere.geometry}
          material={nodes.Sphere.material}
          renderOrder={2} // Keep it below text
          scale={springProps.scale}
          position={isMobile ? [0.2, 0, 0] : [0, 0, 0]}
          onPointerOver={!isMobile ? handleHoverStart : undefined} // Only apply hover on desktop
          onPointerOut={!isMobile ? handleHoverEnd : undefined}
          onClick={isMobile ? handleTouch : undefined}
          onTouchStart={isMobile ? handleTouch : undefined} // Only apply touch on mobile
        >
          <MeshTransmissionMaterial
            ref={materialRef}
            thickness={springProps.thickness.get()}
            roughness={0.02}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.2}
            metalness={0}
            transparent={true}
            resolution={1024} // Optimized for performance
            samples={4} // Reduced for better performance
            backside={true}
          />
        </animated.mesh>
      </group>
    </>
  );
}