import React from 'react';
import styles from '../page.module.css';
import Link from 'next/link';

const technologyLogos = {
    'React': '/medias/logo-react-svgrepo-com.svg',
    'CSS': '/medias/css3-02-svgrepo-com.svg',
    'JavaScript': '/medias/javascript-155-svgrepo-com.svg',
    'Node.js': '/medias/node-js-svgrepo-com.svg',
    'Express': '/path/to/express-logo.png',
    'MongoDB': '/path/to/mongodb-logo.png',
};

export default function Card({ title, description, imageUrl, projectName, stack }) {
    return (
        <div className={styles.card}>
            <img src={imageUrl} alt={title} className={styles.image} />
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
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
                <Link href={`/projects/${projectName}`} className={styles.seeProject}>
                    See project
                    <img src='/medias/external-link-svgrepo-com.svg' height='20px'/>
                </Link>
            </div>
        </div>
    );
} 