import React, { useRef, useEffect, useMemo, useState } from 'react';
import { MeshTransmissionMaterial, useGLTF, Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useSpring, animated, easings } from '@react-spring/three';
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

export default function Model() {
  const { nodes } = useGLTF('/medias/AbstractBall.glb');
  const { viewport } = useThree();
  const torus = useRef();
  const materialRef = useRef();
  const isMobile = useMediaQuery('(max-width: 768px)'); // Adjust width as needed

  // Initial spring setup
  const [springProps, setSpring] = useSpring(() => ({
    rotationSpeed: 0.01,
    thickness: isMobile ? 0 : 0.08, // Initial thickness based on mobile/desktop
    direction: 1,
    scale: [0.7, 0.7, 0.7],
    config: {
      mass: 6,
      tension: 50,
      friction: 100,
      easing: easings.easeInOutSine,
    },
  }));

  // Hover effect
  const handleHoverStart = () => {
    setSpring({ rotationSpeed: 0.02, thickness: isMobile ? 0.2 : 0.2, scale: [0.9, 0.9, 0.9] });
  };

  const handleHoverEnd = () => {
    setSpring({ rotationSpeed: 0.007, thickness: isMobile ? 0 : 0.08, scale: [0.8, 0.8, 0.8] });
  };

  // Click effect for mobile to animate thickness change
  const handleClick = () => {
    setSpring({ scale: [1.2, 1.2, 1.2], thickness: 0.5  });
    setTimeout(() => setSpring({ scale: [0.7, 0.7, 0.7], thickness: isMobile ? 0 : 0.08 }), 1500);
  };

  // Apply rotation and thickness from springProps
  useFrame(() => {
    if (torus.current) {
      torus.current.rotation.y += springProps.rotationSpeed.get() * springProps.direction.get();
    }
    if (materialRef.current) {
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
          font={'Helvetica'}
          position={isMobile ? [-0.45, -0.4, -1] : [0, -0.4, -1]}
          fontSize={isMobile ? 0.2 : 0.15}
          color="black"
          anchorX="center"
          anchorY="middle"
          renderOrder={1}
        >
          Software Engineer
        </Text>
        <Text
          font={'Helvetica'}
          position={isMobile ? [-0.87, -0.65, -1] : [0, -0.6, -1]} // Adjust position for mobile
          fontSize={isMobile ? 0.2 : 0.15}
          color="black"
          anchorX="center"
          anchorY="middle"
          renderOrder={1}
        >
          3D Artist
        </Text>

        {isMobile ? (
          <>
            <Text
              font={'Helvetica'}
              position={[-0.5, 0.6, -1]}
              fontSize={0.6}
              color="black"
              anchorX="center"
              anchorY="middle"
              renderOrder={1}
            >
              Julien
            </Text>
            <Text
              font={'Helvetica'}
              position={[0, 0, -1]}
              fontSize={0.6}
              color="black"
              anchorX="center"
              anchorY="middle"
              renderOrder={1}
            >
              Cardeillac
            </Text>
          </>
        ) : (
          <Text
            font={'Helvetica'}
            position={[0, 0, -1]}
            fontSize={0.6}
            color="black"
            anchorX="center"
            anchorY="middle"
            renderOrder={1}
          >
            Julien Cardeillac
          </Text>
        )}

        {/* 3D object with hover effect */}
        <animated.mesh
          ref={torus}
          geometry={nodes.Sphere.geometry}
          material={nodes.Sphere.material}
          renderOrder={2}
          scale={springProps.scale}
          position={isMobile ? [0.2, 0, 0] : [0, 0, 0]}
          onPointerOver={handleHoverStart}
          onPointerOut={handleHoverEnd}
          onClick={handleClick}
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
            background={new THREE.Color('white')}
            resolution={2048}
            samples={8}
            backside={true}
          />
        </animated.mesh>
      </group>
    </>
  );
}