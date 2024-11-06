'use client';
import React from 'react';
import Card from './card';
import styles from '../page.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Projects() {
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => clearInterval(cursorInterval);
    }, []);

    const projects = [
        {
            title: '909 Drum Machine',
            description: 'An online drum machine inspired by the legendary Roland TR-909, famous for shaping the sound of house and techno music',
            imageUrl: '/medias/909_banner.png',
            projectName: '909-drum-machine',
            stack: ['React','JavaScript','CSS'],
        },
        {
            title: 'Space Invaders',
            description: 'A web version of the classic arcade game. Use your spacebar and arrow keys to control the spaceship !',
            imageUrl: '/medias/SpaceInvaders_banner.png',
            projectName: 'space-invaders',
            stack: ['React','JavaScript','CSS'],
        },
    ];

    return (
        <div className={styles.projectPageContainer}>
            <h2 className={styles.webProjects}>
                Web Projects<span className={styles.cursor}>{showCursor ? "_" : ""}</span>
            </h2>
            <div className={styles.projectsContainer}>
                {projects.map((project, index) => (
                    <Card
                        key={index}
                        title={project.title}
                        description={project.description}
                        imageUrl={project.imageUrl}
                        projectName={project.projectName}
                        stack={project.stack || []}
                    />
                ))}
            </div>
        </div>
    );
} 