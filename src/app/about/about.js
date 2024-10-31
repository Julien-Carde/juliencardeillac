'use client';
import styles from '../page.module.css';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Mac from '../../components/Computer';

export default function About() {
    const [showCursor, setShowCursor] = useState(true);

    // Toggle cursor visibility every 500ms
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500); // Adjust time for faster or slower blinking

        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <>
            <div className={styles.aboutContainer}>
                {/* About Section Overlay */}
                <div className={styles.aboutSection}>
                    <h2 className={styles.aboutMe}>
                        About Me<span className={styles.cursor}>{showCursor ? "_" : ""}</span>
                    </h2>
                    <p className={styles.aboutText}>
                        Hello! I’m Julien Cardeillac, a software developer with a passion for 3D graphics, interactive web design, and creative innovation.
                        With a background in engineering and a keen interest in artistic expression, I specialize in creating visually engaging, technically robust digital experiences.
                        My work blends engineering principles with visual design to bring immersive projects to life.
                        <br />
                        <br />
                        Whether working on 3D modeling, animation, or full-stack applications, I’m committed to pushing the boundaries of what’s possible, always striving to make each project more intuitive and impactful.
                        Welcome to my portfolio, where I share my journey through code, creativity, and continuous learning.
                    </p>
                </div>
                {/* Mac 3D Scene */}
                <div className={styles.macModel}>
                    <Mac />
                </div>
            </div>
        </>
    );
}