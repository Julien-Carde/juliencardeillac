import React, { useRef, useEffect } from 'react';
import { MeshTransmissionMaterial, useGLTF, Text } from '@react-three/drei';
import { useFrame, useThree, extend } from '@react-three/fiber';
import * as THREE from 'three';

export default function Model() {
  const { nodes } = useGLTF('/medias/torrus.glb');
  const { viewport } = useThree();
  const torus = useRef(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    if (torus.current) {
      torus.current.rotation.x = scrollRef.current * 0.01;
    }
  });

  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} />

      <group scale={viewport.width / 3.75}>
        <mesh position={[0, 0, -2]}>
          <planeGeometry args={[20, 20]} />
          <meshBasicMaterial color="white" />
        </mesh>

        <Text
          font={'/fonts/tan-pearl.otf'}
          position={[0, 0, -1]}
          fontSize={0.5}
          color="black"
          anchorX="center"
          anchorY="middle"
          renderOrder={1}
        >
          Hello World
        </Text>

        <mesh ref={torus} {...nodes.Torus002} renderOrder={2} scale={(1, 1, 1)}>
          <MeshTransmissionMaterial
            thickness={0.2}
            roughness={0.05}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.02}
            metalness={0}
            transparent={true}
            background={new THREE.Color('white')}
            resolution={512}
            samples={8}
            backside={true}
          />
        </mesh>
      </group>
    </>
  );
}