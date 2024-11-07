'use client';
import styles from '../page.module.css';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Mac from '../../components/computer/Index';

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
                        Hello! I am Julien Cardeillac, a 23-year-old engineer with a passion for interactive web design, 3D graphics, and creative innovation.
                        My engineering background, combined with a keen interest in artistic expression, drives me to work on projects that blend technical precision with aesthetic impact.

                        <br />
                        <br />
                        <p className={styles.optionalText}>Whether working on full-stack applications, 3D modeling or animation, I am dedicated to continually building my skills, learning from experienced teams, and contributing to innovative projects that merge technology with design.
                        Welcome to my portfolio, where I share my journey through code, creativity, and continuous learning.</p>
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