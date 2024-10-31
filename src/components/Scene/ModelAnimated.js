import React, { useRef } from 'react';
import { MeshTransmissionMaterial, useGLTF, Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useSpring, animated, easings } from '@react-spring/three';
import * as THREE from 'three';

export default function Model() {
  const { nodes } = useGLTF('/medias/AbstractBall.glb');
  const { viewport } = useThree();
  const torus = useRef();
  const materialRef = useRef();

  // Animated spring properties with custom easing
  const [springProps, setSpring] = useSpring(() => ({
    rotationSpeed: 0.01,
    thickness: 0.07,
    direction: 1, // 1 for normal rotation, -1 for reversed rotation
    scale: [0.7, 0.7, 0.7],
    config: {
      mass: 2,
      tension: 50,
      friction: 80,
      easing: easings.easeInOutSine, // Apply custom easing
    },
  }));

  // Handle mouse hover to change rotation speed, thickness, and direction
  const handleHoverStart = () => {
    setSpring({ rotationSpeed: 0.02, thickness: 0.2, direction: 1, scale: [0.9, 0.9, 0.9] });
  };

  const handleHoverEnd = () => {
    setSpring({ rotationSpeed: 0.007, thickness: 0.08, direction: 1, scale: [0.8, 0.8, 0.8] });
  };

  const handleClick = () => {
    setSpring({ scale: [1.2, 1.2, 1.2], thickness: 0.2 }); // Expand on tap
    setTimeout(() => {
      setSpring({ scale: [0.7, 0.7, 0.7], thickness: 0.08 }); // Shrink back after 300ms
    }, 1000);
  };

  // Apply animation properties on each frame
  useFrame(() => {
    if (torus.current) {
      // Apply animated rotation speed and direction
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
          position={[0, -0.4, -1]}
          fontSize={0.15}
          color="black"
          anchorX="center"
          anchorY="middle"
          renderOrder={1}
        >
          Software Engineer
        </Text>
        <Text
          font={'Helvetica'}
          position={[0, -0.6, -1]}
          fontSize={0.15}
          color="black"
          anchorX="center"
          anchorY="middle"
          renderOrder={1}
        >
          3D Artist
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
          Julien Cardeillac
        </Text>

        {/* 3D object with hover effect */}
        <animated.mesh
          ref={torus}
          geometry={nodes.Sphere.geometry}
          material={nodes.Sphere.material}
          renderOrder={2}
          scale={springProps.scale} // Directly use springProps.scale
          onPointerOver={handleHoverStart}
          onPointerOut={handleHoverEnd}
          onClick={handleClick}
        >
          <MeshTransmissionMaterial
            ref={materialRef}
            thickness={springProps.thickness.get()} // Use .get() to get the actual value
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