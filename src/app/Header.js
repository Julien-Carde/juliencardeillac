import React from "react";
import styles from './page.module.css';

export default function Header({ onNavigate }) {
    return (
      <header className={styles.header}>
        <h2 className={styles.logoMain} onClick={() => onNavigate('home')}>JC_</h2>
        <div className={styles.nav}>
          <span className={styles.menuItem} onClick={() => onNavigate('about')}>About</span>
          <span className={styles.menuItem} onClick={() => onNavigate('projects')}>Projects</span>
          <span className={styles.menuItem} onClick={() => onNavigate('cv')}>CV</span>
        </div>
      </header>
    );
}