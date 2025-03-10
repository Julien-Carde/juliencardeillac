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
            wireframeUrl: '/medias/CGI_Videos/webm_output/vivien_wireframe.webm',
            renderUrl: '/medias/CGI_Videos/webm_output/vivien.webm'
        },
        {
            title: 'Paris Underground',
            description: 'Rendered with Blender Cycles, fisheye effect, color graded in DaVinci Resolve',
            wireframeUrl: '/medias/CGI_Videos/webm_output/Metro_Wireframe.webm',
            renderUrl: '/medias/CGI_Videos/webm_output/Metro.webm'
        },
        {
            title: 'Clone of myself',
            description: 'Rendered with Blender Cycles, color graded in DaVinci Resolve',
            wireframeUrl: '/medias/CGI_Videos/webm_output/Human_render_wireframe.webm',
            renderUrl: '/medias/CGI_Videos/webm_output/Human_render.webm'
        },
        {
            title: 'Cigarette Close Up',
            description: 'Rendered with Blender Cycles, Smoke simulation, color graded in DaVinci Resolve',
            wireframeUrl: '/medias/CGI_Videos/webm_output/Cigarette_wireframe_2.webm',
            renderUrl: '/medias/CGI_Videos/webm_output/Cigarette.webm'
        },
        {
            title: 'Giant Ball',
            description: 'Rendered with Blender Cycles, Custom HDRI shot on location',
            wireframeUrl: '/medias/CGI_Videos/webm_output/Ball_Wireframe.webm',
            renderUrl: '/medias/CGI_Videos/webm_output/Garden_Ball.webm'
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