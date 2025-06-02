'use client';
import styles from '../page.module.css';
import dynamic from 'next/dynamic';
import React, { useState, useEffect, Suspense } from 'react';
import Header from '../Header';
import Mac from '../../components/Computer/Index';

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
                        Hello! I am Julien Cardeillac, a 23-year-old engineer with a passion for 3D graphics, filmmaking and creative innovation.
                        My engineering background, combined with a keen interest in artistic expression, drives me to work on projects that blend technical precision with aesthetic impact.
                        <br />
                        <p className={styles.optionalText}>
                            Starting in September, I will begin a two-year master’s program in{" "}
                            <a
                                href="https://programmes.polytechnique.edu/en/master/all-msct-programs/science-technology-in-extended-cinematography"
                                style={{ color: "#555", textDecoration: "underline"}}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Extended Cinematography
                            </a>{" "}
                            (École Polytechnique & Louis Lumière), focused on VFX, virtual production, and computer graphics. As part of this program, I am currently looking for an apprenticeship (alternance) over the next two years, ideally within a VFX studio or virtual production environment, either as an R&D engineer or working on set.
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