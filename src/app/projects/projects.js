import React, { useState, useEffect } from 'react';
import Card from './card';
import Graphics3DCard from './Graphics3DCard';
import ShortFilm from './ShortFilm';
import styles from '../page.module.css';

export default function Projects() {
    const [showCursor, setShowCursor] = useState(true);
    const [activeCategory, setActiveCategory] = useState('web');

    // Toggle cursor visibility every 500ms
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500); 

        return () => clearInterval(cursorInterval);
    }, []);

    const webProjects = [
        {
            title: 'Watchlist',
            description: 'A web app that allows you to create a watchlist and get information about the movies you want to watch. Powered by the TMDB API.',
            imageUrl: '/medias/banners/Watchlist_banner.webp',
            projectUrl: 'https://watchlist-one-xi.vercel.app/',
            stack: ['React', 'Node.js', 'MongoDB']
        },
        {
            title: '909 Drum Machine',
            description: 'An online drum machine inspired by the legendary Roland TR-909, famous for shaping the sound of house and techno music',
            imageUrl: '/medias/banners/TR-909_banner.webp',
            projectUrl: 'https://909-online-drum-machine.vercel.app/',
            stack: ['React'],
        },
        {
            title: 'Motion Lab',
            description: 'A 3D Motion Visualizer designed for an academic project, enabling doctors to track patient movements during rehabilitation. This preview showcases the interface and example animations.',
            imageUrl: '/medias/banners/MotionLab.webp',
            projectUrl: 'https://motion-lab-teal.vercel.app/',
            stack: ['React', 'Three.js'],
        },
        {
            title: 'Space Invaders',
            description: 'A web version of the classic arcade game. Use your spacebar and arrow keys to control the spaceship and shoot the invaders! Works on mobile and desktop.',
            imageUrl: '/medias/banners/SpaceInvaders_banner.webp',
            projectUrl: 'https://space-invaders-eight-zeta.vercel.app/',
            stack: ['React'],
        }
    ];

    const graphicsProjects = [
        {
            title: 'Car crash time-stop',
            description: <>Introduction shot of my short-film <em>Airbag</em> (work in progress)</>,
            wireframeUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-5bb0f.firebasestorage.app/o/vivien_wireframe.webm?alt=media&token=5a6baef7-f6ea-42ca-b645-34462fe505ac',
            renderUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-5bb0f.firebasestorage.app/o/vivien.webm?alt=media&token=f82c05eb-853f-4aa5-b89d-42d34a6ba21e'
        },
        {
            title: 'Paris Underground',
            description: 'Rendered with Blender Cycles, fisheye effect, color graded in DaVinci Resolve',
            wireframeUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-5bb0f.firebasestorage.app/o/Metro_Wireframe.webm?alt=media&token=a5088b64-4b0d-4d24-b914-24be9efa33e4',
            renderUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-5bb0f.firebasestorage.app/o/Metro.webm?alt=media&token=7fe71855-4d0f-4fd8-bbc3-7868820bc306'
        },
        {
            title: 'Clone of myself',
            description: 'Rendered with Blender Cycles, color graded in DaVinci Resolve',
            wireframeUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-5bb0f.firebasestorage.app/o/Human_render_wireframe.webm?alt=media&token=8eb712e8-1f3f-4e13-961e-13158f6bd907',
            renderUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-5bb0f.firebasestorage.app/o/Human_render.webm?alt=media&token=b5003e67-0bb5-4470-aa7a-598722da4cc8'
        },
        {
            title: 'Cigarette Close Up',
            description: 'Rendered with Blender Cycles, Smoke simulation, color graded in DaVinci Resolve',
            wireframeUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-5bb0f.firebasestorage.app/o/Cigarette_wireframe.webm?alt=media&token=6ba3b009-b97d-4c51-bf2f-69e183d837e3',
            renderUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-5bb0f.firebasestorage.app/o/Cigarette.webm?alt=media&token=ee95d4ef-7332-43ed-8731-56ef6485a81e'
        },
        {
            title: 'Giant Ball',
            description: 'Rendered with Blender Cycles, Custom HDRI shot on location',
            wireframeUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-5bb0f.firebasestorage.app/o/Ball_Wireframe.webm?alt=media&token=ec8b967f-2fdb-444a-b86d-9c86d67cc2f9',
            renderUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-5bb0f.firebasestorage.app/o/Garden_Ball.webm?alt=media&token=72877d2b-f9ec-457d-9547-2feefcaddd90'
        },
    ];

    const programmingProjects = [
        {
            title: 'OBJ file viewer',
            description: 'A C++ OpenGL program that allows displaying any OBJ file with basic lighting',
            imageUrl: '/medias/banners/OBJ_preview.webp',
            projectUrl: 'https://github.com/Julien-Carde/OBJ-file-viewer',
            stack: ['C++']
        },
        {
            title: 'Python Ray Tracer',
            description: 'A Python ray tracing program that simulates the physical behavior of light to render a photorealistic 3D scene',
            imageUrl: '/medias/banners/raytraced_image_cropped.webp',
            projectUrl: 'https://github.com/Julien-Carde/Python-Ray-Tracer',
            stack: ['Python']
        },
        {
            title: 'MVNX to Blender rig',
            description: 'A Python program that converts MVNX motion capture data into a Blender rig animation',
            imageUrl: '/medias/banners/mocap.webp',
            projectUrl: 'https://github.com/Julien-Carde/MVNX-to-blender',
            stack: ['Python']
        }
    ];

    // Determine which projects to display
    let projects = [];
    if (activeCategory === 'web') {
        projects = webProjects;
    } else if (activeCategory === 'graphics') {
        projects = graphicsProjects;
    } else if (activeCategory === 'programming') {
        projects = programmingProjects;
    }

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
                    className={activeCategory === 'programming' ? styles.active : styles.inactive}
                    onClick={() => setActiveCategory('programming')}
                >
                    C++ / Python<span className={styles.cursor}>{showCursor && activeCategory === 'programming' ? "_" : ""}</span>
                </span>
                <span 
                    className={activeCategory === 'graphics' ? styles.active : styles.inactive}
                    onClick={() => setActiveCategory('graphics')}
                >
                    3D Graphics<span className={styles.cursor}>{showCursor && activeCategory === 'graphics' ? "_" : ""}</span>
                </span>
                <span 
                    className={activeCategory === 'shortFilm' ? styles.active : styles.inactive}
                    onClick={() => setActiveCategory('shortFilm')}
                >
                    Short Film<span className={styles.cursor}>{showCursor && activeCategory === 'shortFilm' ? "_" : ""}</span>
                </span>
            </div>

            {/* Conditionally render projects OR ShortFilm */}
            {activeCategory === 'shortFilm' ? (
                <ShortFilm />
            ) : (
                <div className={activeCategory === 'web' || activeCategory === 'programming' ? styles.projectsContainerWeb : styles.projectsContainer3D}>
                    {projects.map((project, index) => (
                        activeCategory === 'graphics' ? (
                            <Graphics3DCard 
                                key={index} 
                                title={project.title} 
                                description={project.description} 
                                wireframeUrl={project.wireframeUrl} 
                                renderUrl={project.renderUrl} 
                            />
                        ) : (
                            <Card 
                                key={index} 
                                title={project.title} 
                                description={project.description} 
                                imageUrl={project.imageUrl} 
                                projectUrl={project.projectUrl} 
                                stack={project.stack} 
                            />
                        )
                    ))}
                </div>
            )}
        </div>
    );
}