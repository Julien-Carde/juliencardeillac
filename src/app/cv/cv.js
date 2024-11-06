'use client';
import styles from '../page.module.css';
import React, { useState, useEffect } from 'react';
import Header from '../Header';

function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        setMatches(mediaQuery.matches);
        const handler = (event) => setMatches(event.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, [query]);

    return matches;
}

export default function Cv() {
    const [expandedSection, setExpandedSection] = useState(null);
    const isMobile = useMediaQuery('(max-width: 768px)');

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <>
            <div className={styles.cvContainer}>
                <div className={styles.topSection}>
                    <img className={styles.profilePicture}
                        src='/medias/profilePicture.jpg'
                        height='200px'
                    />
                    <div className={styles.details}>
                        <h1>Julien Cardeillac</h1>
                        <div className={styles.contact}>
                            <p className={styles.infoItem}>
                                <img
                                    src='/medias/phone-call-svgrepo-com.svg'
                                    alt='Phone Icon'
                                    height='15px'
                                    style={{ marginRight: '8px' }}
                                />
                                <a href="tel:+33651290096" className={styles.phoneLink}>
                                    +33 6 51 29 00 96
                                </a>
                            </p>
                            <p className={styles.infoItem}>
                                <img
                                    src='/medias/envelope-svgrepo-com.svg'
                                    alt='Email Icon'
                                    height='15px'
                                    style={{ marginRight: '8px' }}
                                />
                                <a href="mailto:julien.cardeillac@ensam.eu" className={styles.emailLink}>
                                    julien.cardeillac@ensam.eu
                                </a>
                            </p>
                            <p className={styles.infoItem}>
                                <img
                                    src='/medias/placeholder-svgrepo-com.svg'
                                    alt='Location Icon'
                                    height='15px'
                                    style={{ marginRight: '8px' }}
                                />
                                Paris, France
                            </p>
                        </div>
                    </div>
                </div>

                <section className={styles.section}>
                    <h3 onClick={() => toggleSection('education')}> Education
                        <img
                            src='/medias/next-svgrepo-com.svg'
                            alt="Expand"
                            className={`${styles.arrow} ${expandedSection === 'education' ? styles.expanded : ''}`}
                        />
                    </h3>
                    <div className={`${styles['section-content']} ${expandedSection === 'education' ? styles.expanded : ''}`}>
                        <div className={styles.timeline}>
                            <div className={styles.timelineItem}>
                                <div className={styles.logoContainer}>
                                    <img src='/medias/Screenshot 2024-10-30 at 10.00.09.png' className={styles.logo} />
                                </div>
                                <div className={styles.experienceDetails}>
                                    <p className={styles.experienceTitle}><span className={styles.semi}>2020 - 2024</span> - Arts et Métiers - Grande Ecole Program</p>
                                    <p>Generalist engineering school: electronics and electrical engineering, computer science, mechanics, energy, manufacturing processes, industrial product design, lean management, supply chain, project management.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h3 onClick={() => toggleSection('experience')}>Professional / Academic Experience
                        <img
                            src='/medias/next-svgrepo-com.svg'
                            alt="Expand"
                            className={`${styles.arrow} ${expandedSection === 'experience' ? styles.expanded : ''}`}
                        />
                    </h3>
                    <div className={`${styles['section-content']} ${expandedSection === 'experience' ? styles.expanded : ''}`}>
                        <div className={styles.timeline}>

                        <div className={styles.timelineItem}>
                                <div className={styles.logoContainer}>
                                    <img src='/medias/cnam_logo.png' className={styles.logo} />
                                </div>
                                <div className={styles.experienceDetails}>
                                    <p className={styles.experienceTitle}><span className={styles.semi}>Sept - Nov 2023</span> - Research Project, Biomechanical Visualization Web Application</p>
                                    <p>• Academic project in partnership with a University Hospital, creating a motion capture system for patients undergoing rehabilitation<br /><br />
                                        • Creating a web-based visualization interface using React and Three.js, enabling doctors to monitor and record patient movements for rehabilitation purposes</p>
                                </div>
                            </div>
                            
                            <div className={styles.timelineItem}>
                                <div className={styles.logoContainer}>
                                    <img src='/medias/mocaplab_logo.png' className={styles.logo} />
                                </div>
                                <div className={styles.experienceDetails}>
                                    <p className={styles.experienceTitle}><span className={styles.semi}>March - August 2023</span> - R&D Engineer (Final Internship) - Mocaplab</p>
                                    <p>• Research and development project on Eye Tracking technology (ocular motion capture), hardware/software prototyping (Python)<br /><br />
                                        • Training of a deep learning model for ocular motion recognition<br /><br />
                                        • Preparation of sets and directing actors for Motion Capture shoots</p>
                                </div>
                            </div>
                            

                            <div className={styles.timelineItem}>
                                <div className={styles.logoContainer}>
                                    <img src='/medias/Screenshot 2024-10-30 at 10.00.09.png' className={styles.logo} />
                                </div>
                                <div className={styles.experienceDetails}>
                                    <p className={styles.experienceTitle}><span className={styles.semi}>Sept - Nov 2021</span> - Research Project in Industrial Robotics</p>
                                    <p>• Designing a digital chain for a 6-axis industrial robot intended for precision welding<br /><br />
                                        • Development of a Catia V5 plugin in C++ to convert 3D data into mechanical instruction sequences</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h3 onClick={() => toggleSection('skills')}>Skills
                        <img
                            src='/medias/next-svgrepo-com.svg'
                            alt="Expand"
                            className={`${styles.arrow} ${expandedSection === 'skills' ? styles.expanded : ''}`}
                        />
                    </h3>
                    <div className={`${styles['section-content']} ${expandedSection === 'skills' ? styles.expanded : ''}`}>
                        <div className={styles.skillsDetails}>
                        <p><strong>Full-stack</strong>: HTML, CSS, JavaScript, TypeScript, React, Node.js, MongoDB, SQL</p>
                            <p><strong>Programming</strong>: Python, C++, Matlab</p>
                            <p><strong>Visual Effects & 3D Animation</strong>: Blender, Maya, Unreal Engine</p>
                            <p><strong>CAD</strong>: Catia, 3D Experience</p>
                            <p><strong>Machine Learning</strong>: PyTorch</p>
                            <p><strong>Video Editing</strong>: Premiere Pro, DaVinci Resolve</p>
                            <p><strong>Visual Effects & 3D Animation</strong>: Blender, Maya, Unreal Engine</p>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h3 onClick={() => toggleSection('languages')}>Languages
                        <img
                            src='/medias/next-svgrepo-com.svg'
                            alt="Expand"
                            className={`${styles.arrow} ${expandedSection === 'languages' ? styles.expanded : ''}`}
                        />
                    </h3>
                    <div className={`${styles['section-content']} ${expandedSection === 'languages' ? styles.expanded : ''}`}>
                        <p><span className={styles.strong}>French</span> - Native</p>
                        <p><span className={styles.strong}>English</span> - Fluent (written and spoken)</p>
                        <p><span className={styles.strong}>German</span> - Intermediate</p>
                    </div>
                </section>

                <section className={styles.section}>
                    <h3 onClick={() => toggleSection('interests')}>Interests
                        <img
                            src='/medias/next-svgrepo-com.svg'
                            alt="Expand"
                            className={`${styles.arrow} ${expandedSection === 'interests' ? styles.expanded : ''}`}
                        />
                    </h3>
                    <div className={`${styles['section-content']} ${expandedSection === 'interests' ? styles.expanded : ''}`}>
                        <p>3D Animation, Filmmaking, Music Production, Climate Science</p>
                    </div>
                </section>

                <div className={styles.downloadButton}>
                    <a href="/medias/CV_Julien_Cardeillac_English.pdf"
                        download="CV_Julien_Cardeillac_(EN).pdf">
                        Download CV
                    </a>
                    <a href="/medias/CV_Julien_Cardeillac_Dev.pdf"
                        download="CV_Julien_Cardeillac_(FR).pdf">
                        Télécharger le CV
                    </a>
                </div>
            </div>
        </>
    );
}