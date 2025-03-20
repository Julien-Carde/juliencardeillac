'use client';
import styles from './page.module.css';
import dynamic from 'next/dynamic';
import React, { useState, Suspense, useCallback } from 'react';
import Header from './Header';
import Glass from './glass';
import About from './about/about';
import Projects from './projects/projects';
import Cv from './cv/cv';
import { motion, AnimatePresence } from 'framer-motion';



// Load Scene dynamically (disable SSR)
// const Scene = dynamic(() => import('../components/scene/Index'), { 
//   ssr: false,
// });

export default function Home() {
  const [activePage, setActivePage] = useState('home');
  // const [sceneIsLoaded, setSceneIsLoaded] = useState(false);

  const handleNavigation = (page) => {
    setActivePage(page);
  };

  // const handleSceneLoad = useCallback(() => {
  //   setSceneIsLoaded(true);
  //   console.log('Scene loaded successfully');
  // }, []);

  // Transition settings for non-home pages
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
              <Glass />
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