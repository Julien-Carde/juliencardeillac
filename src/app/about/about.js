'use client';
import styles from '../page.module.css';
import dynamic from 'next/dynamic';
import React, { useState, useEffect, Suspense } from 'react';
import Header from '../Header';
import Mac from '../../components/computer/Index';

export default function About() {
    const [showCursor, setShowCursor] = useState(true);
    const [isMacLoaded, setIsMacLoaded] = useState(false);

    // Toggle cursor visibility every 500ms
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => clearInterval(cursorInterval);
    }, []);

    // Handler for when Mac model is loaded
    const handleMacLoad = () => {
        setIsMacLoaded(true);
    };

    return (
        <>
            <div className={styles.aboutContainer}>
                {/* About Section Overlay */}
                <div className={styles.aboutSection}>
                    <h2 className={styles.aboutMe}>
                        About Me<span className={styles.cursor}>{showCursor ? "_" : ""}</span>
                    </h2>
                    <p className={styles.aboutText}>
                        Hello! I am Julien Cardeillac, a 23-year-old engineer with a passion for interactive web design, 3D graphics, and creative innovation.
                        My engineering background, combined with a keen interest in artistic expression, drives me to work on projects that blend technical precision with aesthetic impact.

                        <br />
                        <br />
                        <p className={styles.optionalText}>Whether working on full-stack applications, 3D modeling or animation, I am dedicated to continually building my skills, learning from experienced teams, and contributing to innovative projects that merge technology with design.
                        Welcome to my portfolio, where I share my journey through code, creativity, and continuous learning. <span style={{ fontFamily: 'Courier New, Courier, monospace', display: 'inline-flex', alignItems: 'center' }}>(Made with <img src="/medias/nextjs.svg" alt="Next.js Logo" className={styles.logoStack} style={{ margin: '0 5px' }} /> Next.js and <img src="/medias/Three.js_Icon.svg.png" alt="Three.js Logo" className={styles.logoStack} style={{ margin: '0 5px' }} /> Three.js)</span>
                        </p>
                    </p>
                </div>
                {/* Mac 3D Scene */}
                <div className={styles.macModel}>
                    <Suspense fallback={<div className={styles.loader}></div>}>
                        <Mac onLoad={handleMacLoad} />
                    </Suspense>
                </div>
            </div>
        </>
    );
}