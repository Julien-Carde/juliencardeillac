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
            title: 'Space Invaders',
            description: 'A web emulation of a classic arcade game. Use your spacebar and arrow keys to control the spaceship',
            imageUrl: 'https://arcademarquee.com/wp-content/uploads/2015/02/space-invaders_marquee.jpg',
            projectUrl: 'https://julien-carde.github.io/space-invaders/',
            stack: ['React', 'CSS', 'JavaScript'],
        },
        {
            title: 'Project 2',
            description: 'Description description description description description description description description',
            imageUrl: 'https://img.freepik.com/free-photo/communication-social-media-icons-personal-computer_23-2150781061.jpg',
            projectUrl: 'https://julien-carde.github.io/space-invaders/',
        },
        {
            title: 'Project 3',
            description: 'Description description description description description description description description',
            imageUrl: 'https://img.freepik.com/free-photo/communication-social-media-icons-personal-computer_23-2150781061.jpg',
            projectUrl: 'https://julien-carde.github.io/space-invaders/',
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