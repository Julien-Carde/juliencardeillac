import React, { useRef, useEffect } from 'react';
import { Html, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Flower() {
    const { scene } = useGLTF('/medias/LotusFlower.glb');
    const flower = useRef();

    // Apply glass material to each mesh in the scene
    useEffect(() => {
        const glassMaterial = new THREE.MeshPhysicalMaterial({
            thickness: 0.2,
            roughness: 0.1,
            transmission: 1,
            ior: 1.5,
            chromaticAberration: 0.1,
            metalness: 1,
            transparent: true,
            resolution: 512,
            samples: 8,
            backside: true,
        });

        scene.traverse((child) => {
            if (child.isMesh) {
                child.material = glassMaterial;
            }
        });
    }, [scene]);

    // Rotation animation
    useFrame(() => {
        if (flower.current) {
            flower.current.rotation.y += 0.005;
        }
    });

    return (
        <>
            <ambientLight intensity={2} />
            <directionalLight position={[10, 10, 10]} intensity={1.5} />

            <group ref={flower} position={[0, 0, -5]} scale={1.5}>
                <primitive object={scene} />
            </group>

            {/* Html overlay for the "About Me" text */}
            <Html position={[0, -2, 0]} center>
                <div style={{ textAlign: 'center', color: '#333', fontFamily: 'Rajdhani, sans-serif', fontSize: '1.2rem' }}>
                    <h2>About Me</h2>
                    <p>
                        Hello! I’m Julien Cardeillac, a software developer with a passion for 3D graphics, interactive web design, and creative innovation.
                        With a background in engineering and a keen interest in artistic expression, I specialize in creating visually engaging, technically
                        robust digital experiences. My work blends engineering principles with visual design to bring immersive projects to life.
                    </p>
                </div>
            </Html>
        </>
    );
}