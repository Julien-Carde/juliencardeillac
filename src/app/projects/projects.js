// Projects.js
import React from 'react';
import Card from './card';
import styles from '../page.module.css';
import { useState, useEffect } from 'react';

export default function Projects() {
    const [showCursor, setShowCursor] = useState(true);

    // Toggle cursor visibility every 500ms
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500); // Adjust time for faster or slower blinking

        return () => clearInterval(cursorInterval);
    }, []);

    const projects = [
        {
            title: 'Watchlist',
            description: 'A web app that allows you to create a watchlist and get information about the movies you want to watch. Powered by the TMDB API.',
            imageUrl: '/medias/Watchlist_banner.png',
            projectUrl: 'https://watchlist-one-xi.vercel.app/',
            stack: ['React', 'Node.js']
        },
        {
            title: '909 Drum Machine',
            description: 'An online drum machine inspired by the legendary Roland TR-909, famous for shaping the sound of house and techno music',
            imageUrl: '/medias/909_banner.png',
            projectUrl: 'https://909-online-drum-machine.vercel.app/',
            stack: ['React'],
        },
        {
            title: 'Space Invaders',
            description: 'A web version of the classic arcade game. Use your spacebar and arrow keys to control the spaceship and shoot the invaders! Works on mobile and desktop.',
            imageUrl: '/medias/SpaceInvaders_banner.png',
            projectUrl: 'https://space-invaders-eight-zeta.vercel.app/',
            stack: ['React'],
        },
    ];

    return (
        <div className={styles.projectPageContainer}>
        <h2 className={styles.webProjects}>Web Projects<span className={styles.cursor}>{showCursor ? "_" : ""}</span></h2>
        <div className={styles.projectsContainer}>
            {projects.map((project, index) => (
                <Card
                    key={index}
                    title={project.title}
                    description={project.description}
                    imageUrl={project.imageUrl}
                    projectUrl={project.projectUrl}
                    stack={(project.stack || [])} // Ensure stack is an array before joining
                />
            ))}
        </div>
        </div>
    );
}