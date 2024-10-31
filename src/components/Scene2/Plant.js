import React, { useRef, useEffect } from 'react';
import { MeshTransmissionMaterial, useGLTF, Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function Plant() {
  const { nodes } = useGLTF('/medias/plant2.glb');
  const { viewport } = useThree();
  const torus = useRef(null);

  useFrame(() => {
    if (torus.current) {
      torus.current.rotation.y += 0.005;
    }
  });

  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} />

      <group scale={viewport.width / 3.75}>
        <mesh position={[0, 0, -10]}>
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

        <mesh
          ref={torus}
          {...nodes.calatheaLeaves}
          renderOrder={2}
          scale={[5, 5, 5]}
          position={[0, -1.5, 0]}
          rotation={[0, 0, 0]}
        >
          <MeshTransmissionMaterial
            thickness={0.1} // Adjusted thickness for glass depth
            roughness={0.1} // Adds slight roughness for a realistic glass look
            transmission={1} // Full transmission for transparency
            ior={1.5} // Index of refraction for a glass effect
            chromaticAberration={0.05} // Adds subtle color fringing for realism
            metalness={0}
            transparent={true} // Enable transparency for a glass effect
            resolution={512}
            color={new THREE.Color(0x00ff00)} // Sets a translucent green color
            samples={8}
            backside={true}
          />
        </mesh>
      </group>
    </>
  );
}