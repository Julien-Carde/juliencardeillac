import React, { useState, useEffect } from 'react';
import Card from './card';
import Graphics3DCard from './Graphics3DCard';
import styles from '../page.module.css';

export default function Projects() {
    const [showCursor, setShowCursor] = useState(true);
    const [activeCategory, setActiveCategory] = useState('web');

    // Toggle cursor visibility every 500ms
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500); // Adjust time for faster or slower blinking

        return () => clearInterval(cursorInterval);
    }, []);

    const webProjects = [
        {
            title: 'Watchlist',
            description: 'A web app that allows you to create a watchlist and get information about the movies you want to watch. Powered by the TMDB API.',
            imageUrl: '/medias/Watchlist_banner.png',
            projectUrl: 'https://watchlist-one-xi.vercel.app/',
            stack: ['React', 'Node.js', 'MongoDB']
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
        }
    ];

    const graphicsProjects = [
        {
            title: 'Car crash time-stop',
            description: <>Introduction shot of my short-film <em>Airbag</em> (work in progress)</>,
            wireframeUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-5bb0f.firebasestorage.app/o/vivien_wireframe.mov?alt=media&token=dc4bcc14-f833-4fa9-8464-a043b1545352',
            renderUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-5bb0f.firebasestorage.app/o/vivien.mov?alt=media&token=9276dfc1-49ad-4f9a-8bf0-bd0f017b23e3'
        },
        {
            title: 'Paris Underground',
            description: 'Rendered with Blender Cycles, fisheye effect, color graded in DaVinci Resolve',
            wireframeUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-5bb0f.firebasestorage.app/o/Metro_Wireframe.mov?alt=media&token=bc46f025-4269-449d-8f57-27858b2668c4',
            renderUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-5bb0f.firebasestorage.app/o/Metro.mov?alt=media&token=95a39da6-e158-4a11-b16c-94641ced3a5c'
        },
        {
            title: 'Clone of myself',
            description: 'Rendered with Blender Cycles, color graded in DaVinci Resolve',
            wireframeUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-5bb0f.firebasestorage.app/o/Human_render_wireframe.mov?alt=media&token=39ec769d-5533-4080-8ae1-307c48e918de',
            renderUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-5bb0f.firebasestorage.app/o/Human_render.mov?alt=media&token=e14493fb-4ae3-4438-8905-5d36a3e3f2ea'
        },
        {
            title: 'Cigarette Close Up',
            description: 'Rendered with Blender Cycles, Smoke simulation, color graded in DaVinci Resolve',
            wireframeUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-5bb0f.firebasestorage.app/o/Cigarette_wireframe_2.mov?alt=media&token=bc28eee7-af31-4df5-86ab-79eccfe62854',
            renderUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-5bb0f.firebasestorage.app/o/Cigarette.mov?alt=media&token=491590df-825d-4b8e-8437-54791bf78e6e'
        },
        {
            title: 'Giant Ball',
            description: 'Rendered with Blender Cycles, Custom HDRI shot on location',
            wireframeUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-5bb0f.firebasestorage.app/o/Ball_Wireframe.mov?alt=media&token=7cfd9766-5b54-435e-8394-1df95766a7f2',
            renderUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-5bb0f.firebasestorage.app/o/Garden_Ball.mov?alt=media&token=a00eb509-87a5-4b91-8f7f-a72787f81221'
        },
    ];

    const projects = activeCategory === 'web' ? webProjects : graphicsProjects;

    return (
        <div className={styles.projectPageContainer}>
            <div className={styles.categorySelector}>
                <span 
                    className={activeCategory === 'web' ? styles.active : styles.inactive}
                    onClick={() => setActiveCategory('web')}
                >
                    Web Projects<span className={styles.cursor}>{showCursor && activeCategory === 'web' ? "_" : ""}</span>
                </span>
                <span 
                    className={activeCategory === 'graphics' ? styles.active : styles.inactive}
                    onClick={() => setActiveCategory('graphics')}
                >
                    3D Graphics<span className={styles.cursor}>{showCursor && activeCategory === 'graphics' ? "_" : ""}</span>
                </span>
            </div>
            <div className={activeCategory === 'web' ? styles.projectsContainerWeb : styles.projectsContainer3D}>
                {projects.map((project, index) => (
                    activeCategory === 'web' ? (
                        <Card 
                            key={index} 
                            title={project.title} 
                            description={project.description} 
                            imageUrl={project.imageUrl} 
                            projectUrl={project.projectUrl} 
                            stack={project.stack} 
                        />
                    ) : (
                        <Graphics3DCard 
                            key={index} 
                            title={project.title} 
                            description={project.description} 
                            wireframeUrl={project.wireframeUrl} 
                            renderUrl={project.renderUrl} 
                        />
                    )
                ))}
            </div>
        </div>
    );
}