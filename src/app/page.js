'use client';
import styles from './page.module.css';
import dynamic from 'next/dynamic';
import React, { useState, Suspense } from 'react';
import Header from './Header';
import About from './about/about';
import Projects from './projects/projects';
import Cv from './cv/cv';
import { motion, AnimatePresence } from 'framer-motion';

const Scene = dynamic(() => import('../components/scene/Index'), { ssr: false });

export default function Home() {
  const [activePage, setActivePage] = useState('home');
  const [sceneIsLoaded, setSceneIsLoaded] = useState(false)

  const handleNavigation = (page) => {
    setActivePage(page);
  };

  const handleSceneLoad = () => {
    setSceneIsLoaded(true);
  }

  // Transition settings
  const transitionSettings = {
    initial: { opacity: 0, filter: 'blur(2px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(2px)' },
    transition: { duration: 0.4, ease: 'easeInOut' }
  };

  return (
    <>
      <Header onNavigate={handleNavigation} />
      <main className={styles.main}>
        <div className={styles.contentWrapper}>
          <AnimatePresence mode="wait">
            {activePage === 'home' && (
              <motion.div className={styles.scene} key="home" {...transitionSettings}>
                <Suspense
                  fallback={<div className={styles.loaderHome}></div>}
                >
                  <Scene onLoad={handleSceneLoad}/>
                </Suspense>
              </motion.div>
            )}
            {activePage === 'about' && (
              <motion.div key="about" {...transitionSettings}>
                <About />
              </motion.div>
            )}
            {activePage === 'projects' && (
              <motion.div key="projects" {...transitionSettings}>
                <Projects />
              </motion.div>
            )}
            {activePage === 'cv' && (
              <motion.div key="cv" {...transitionSettings}>
                <Cv />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}