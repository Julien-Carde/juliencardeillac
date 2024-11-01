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
                        src='https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/433866295_3546952942184311_1566275548053013904_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=rML0zZNib9IQ7kNvgGfSPjE&_nc_zt=23&_nc_ht=scontent-cdg4-2.xx&_nc_gid=AyvV09vzbXyCTtLSvY7pmqt&oh=00_AYDLl178pRuwi9O97lRWbwni6iK4jrTLi7RDJEcfVwdm3w&oe=6727234B'
                        height= '200px'
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
                                    06 51 29 00 96
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
                    <h3 onClick={() => toggleSection('education')}> Éducation
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
                                    <p className={styles.experienceTitle}><strong>2020 - 2024</strong> - Arts et Métiers - Programme Grande Ecole</p>
                                    <p>École d’ingénieur généraliste : électronique, génie électrique, informatique, mécanique, énergétique, etc.</p>
                                </div>
                            </div>
                            {/* Repeat for other experiences */}
                        </div>
                    </div>
                </section>

               

                <section className={styles.section}>
                    <h3 onClick={() => toggleSection('experience')}>Expériences Professionnelles / Académiques
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
                                    <img src='https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/305313379_512355844223183_7471193810225545954_n.png?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=hvwKYO3Ai5gQ7kNvgEv1H4q&_nc_zt=23&_nc_ht=scontent-cdg4-2.xx&_nc_gid=Adrcmm7gMtDyv_NK8cn9FhR&oh=00_AYDS2HAoe94IyhOkfYi4aeFgfVnSDz5GtRBgqOuIet_qbg&oe=6727CEB1' className={styles.logo} />
                                </div>
                                <div className={styles.experienceDetails}>
                                    <p className={styles.experienceTitle}><strong>Mars - Août 2023</strong> - Ingénieur R&D (Stage de fin d’études), Mocaplab</p>
                                    <p>Développement d’une technologie Eye Tracking, prototypage en Python, et direction d’acteurs en tournage Motion Capture.</p>
                                </div>
                            </div>
                            {/* Repeat for other experiences */}
                            <div className={styles.timelineItem}>
                                <div className={styles.logoContainer}>
                                    <img src='https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/348437844_1187922805256226_2525741885378635201_n.png?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=psL2vL8-HL0Q7kNvgGu_pAJ&_nc_zt=23&_nc_ht=scontent-cdg4-1.xx&_nc_gid=AUQK217e1h_htp2CR-e5mhh&oh=00_AYDvuMxmuUFYunqAqUuKdxVmPYA_Y13yn8tTgzWsWJnJxw&oe=6727DDE0' className={styles.logo} />
                                </div>
                                <div className={styles.experienceDetails}>
                                    <p className={styles.experienceTitle}><strong>Sept - Nov 2023</strong> - Projet de recherche, Application web de visualisation biomécanique</p>
                                    <p>Création d’une interface web de visualisation pour patients en rééducation, utilisant React, WebGL et Three.js.</p>
                                </div>
                            </div>

                            <div className={styles.timelineItem}>
                                <div className={styles.logoContainer}>
                                    <img src='/medias/Screenshot 2024-10-30 at 10.00.09.png' className={styles.logo} />
                                </div>
                                <div className={styles.experienceDetails}>
                                    <p className={styles.experienceTitle}><strong>Sept - Nov 2021</strong> - Projet de recherche en Robotique industrielle</p>
                                    <p>Conception d’une chaine numérique pour un robot de soudure, développement en C++.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h3 onClick={() => toggleSection('skills')}>Compétences
                        <img
                            src='/medias/next-svgrepo-com.svg'
                            alt="Expand"
                            className={`${styles.arrow} ${expandedSection === 'skills' ? styles.expanded : ''}`}
                        />
                    </h3>
                    <div className={`${styles['section-content']} ${expandedSection === 'skills' ? styles.expanded : ''}`}>
                        <div className={styles.skillsDetails}>
                        <p><strong>Programmation</strong>: Python, C++, Matlab</p>
                        <p><strong>CAO</strong>: Catia, 3D Experience</p>
                        <p><strong>Full-stack</strong>: HTML, CSS, JavaScript, TypeScript, React, Node.js, MongoDB, SQL</p>
                        <p><strong>Machine Learning</strong>: PyTorch</p>
                        <p><strong>Montage Vidéo</strong>: Premiere Pro, DaVinci Resolve</p>
                        <p><strong>Effets Visuels & Animation 3D</strong>: Blender, Maya, Unreal Engine</p>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h3 onClick={() => toggleSection('languages')}>Langues
                        <img
                            src='/medias/next-svgrepo-com.svg'
                            alt="Expand"
                            className={`${styles.arrow} ${expandedSection === 'languages' ? styles.expanded : ''}`}
                        />
                    </h3>
                    <div className={`${styles['section-content']} ${expandedSection === 'languages' ? styles.expanded : ''}`}>
                        <p><strong>Français</strong> - Langue natale</p>
                        <p><strong>Anglais</strong> - Courant (écrit et parlé)</p>
                        <p><strong>Allemand</strong> - Intermédiaire</p>
                    </div>
                </section>

                <section className={styles.section}>
                    <h3 onClick={() => toggleSection('interests')}>Intérêts
                        <img
                            src='/medias/next-svgrepo-com.svg'
                            alt="Expand"
                            className={`${styles.arrow} ${expandedSection === 'interests' ? styles.expanded : ''}`}
                        />
                    </h3>
                    <div className={`${styles['section-content']} ${expandedSection === 'interests' ? styles.expanded : ''}`}>
                        <p>Animation 3D, Réalisation de films, Production musicale, Écologie, Sciences du climat</p>
                    </div>
                </section>

                <div className={styles.downloadButton}>
                    <a href="/medias/CV_Julien_Cardeillac_Dev.pdf"
                        download="CV_Julien_Cardeillac.pdf">
                        Télécharger le CV
                    </a>
                </div>
            </div>
        </>
    );
}