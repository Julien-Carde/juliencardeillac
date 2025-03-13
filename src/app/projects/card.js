// Card.js
import React from 'react';
import styles from '../page.module.css';
import Graphics3DCard from './Graphics3DCard';

const technologyLogos = {
    'React': '/medias/logo-react-svgrepo-com.svg',
    'CSS': '/medias/css3-02-svgrepo-com.svg',
    'JavaScript': '/medias/javascript-155-svgrepo-com.svg',
    'Node.js': '/medias/node-js-svgrepo-com.svg',
    'Express': '/path/to/express-logo.png',
    'MongoDB': '/medias/mongodb-svgrepo-com.svg',
    'Three.js': '/medias/Three.js_Icon.svg.png',
    'Next.js': '/medias/next-js-svgrepo-com.svg',
    'C++' : '/medias/C++.png',
    'OpenGL' : '/medias/openGL.png',
    'Python' : '/medias/python.webp',
    'Blender API' : '/medias/blender.png'
};

export default function Card({ title, description, imageUrl, projectUrl, stack, isGraphicsProject, wireframeUrl, renderUrl }) {
    if (isGraphicsProject) {
        return (
            <Graphics3DCard 
                title={title}
                description={description}
                wireframeUrl={wireframeUrl}
                renderUrl={renderUrl}
            />
        );
    }

    return (
        <div className={styles.card}>
            <img src={imageUrl} alt={title} className={styles.image} />
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <div className={styles.stackContainer}>
                    <div className={styles.stack}>
                        {stack.map((tech, index) => (
                            <span key={index} className={styles.stackItem}>
                                <img
                                    src={technologyLogos[tech] || '/path/to/default-logo.png'}
                                    alt={tech}
                                    className={styles.logoStack}
                                />
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
                <a className={styles.seeProject}
                    href={projectUrl}
                    target='_blank'>
                    See project
                    <img src='/medias/external-link-svgrepo-com.svg' height='20px'/>
                </a>
            </div>
        </div>
    );
}