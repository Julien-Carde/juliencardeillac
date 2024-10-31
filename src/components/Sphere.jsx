import React, { useRef } from 'react';
import { MeshTransmissionMaterial, Environment } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';

export default function Sphere() {
    const sphereRef = useRef();
    const { viewport } = useThree();

    // Rotating animation for the sphere
    useFrame(() => {
        if (sphereRef.current) {
            sphereRef.current.rotation.y += 0.01;
        }
    });

    // Controls for adjusting material properties
    const materialProps = useControls({
        thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
        roughness: { value: 0.05, min: 0, max: 1, step: 0.1 },
        transmission: { value: 1, min: 0, max: 1, step: 0.1 }, // Full transparency
        ior: { value: 1.2, min: 1, max: 3, step: 0.1 },  // Glass-like refraction
        chromaticAberration: { value: 0.02, min: 0, max: 1 },
        backside: { value: true },  // Use backside transmission
    });

    return (
        <>
            {/* Lighting to make the transparency visible */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1.5} />
            
            {/* Environment for realistic reflections */}
            <Environment preset="sunset" />

            <mesh ref={sphereRef} scale={viewport.width / 4}>
                <sphereGeometry args={[1, 64, 64]} /> {/* Sphere geometry with higher subdivisions */}
                {/* <MeshTransmissionMaterial {...materialProps} /> */}
                <meshStandardMaterial 
  transparent={true} 
  opacity={0.5} 
  depthWrite={false} 
  depthTest={true}
/>
            </mesh>
        </>
    );
}