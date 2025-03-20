'use client';
import dynamic from 'next/dynamic';
import React, { useState, Suspense } from 'react';

// Dynamically import the 3D model (Disable SSR)
const ModelAnimated = dynamic(() => import('../components/scene/Index'), { ssr: false });

export default function Glass() {
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [showScene, setShowScene] = useState(false);

    const handleModelLoad = () => {
        console.log("Model fully loaded!");
        setLoadingProgress(100);
        setShowScene(true);
        
        // After transition completes, remove the loader entirely
        setTimeout(() => {
            setIsModelLoaded(true);
        }, 800); // Match this with CSS transition time
    };

    const handleProgress = (progress) => {
        // Update with actual loading progress
        setLoadingProgress(Math.round(progress));
    };

    // Inline styles
    const styles = {
        wrapper: {
            position: 'absolute',
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            color: '#333',
            zIndex: 999,
            opacity: showScene ? 0 : 1,
            transition: 'opacity 0.8s ease-in-out',
        },
        spinner: {
            width: '50px',
            height: '50px',
            border: '5px solid #ccc',
            borderTop: '5px solid #333',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
        },
        text: {
            fontFamily: "'Rajdhani', sans-serif",
            marginTop: '10px',
            textAlign: 'center',
        },
        keyframes: `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `,
        scene: {
            position: 'relative',
            height: 'calc(100vh - 100px)',
            width: '100vw',
            zIndex: 1,
            filter: showScene ? 'blur(0px)' : 'blur(10px)',
            opacity: showScene ? 1 : 0,
            transition: 'filter 0.5s ease-out, opacity 0.8s ease-in',
        }
    };

    // Loading message with percentage
    const loadingMessage = `Loading Model... ${loadingProgress}%`;

    return (
        <>
            {/* Inject CSS Keyframes */}
            <style>{styles.keyframes}</style>
            
            {/* Scene container */}
            <div className="scene-container" style={styles.scene}>
                <Suspense fallback={null}>
                    <ModelAnimated onLoad={handleModelLoad} onProgress={handleProgress} />
                </Suspense>
            </div>
            
            {/* Loader overlay - shown until transition completes */}
            {!isModelLoaded && (
                <div style={styles.wrapper}>
                    <div style={styles.spinner}></div>
                    <p style={styles.text}>{loadingMessage}</p>
                </div>
            )}
        </>
    );
}