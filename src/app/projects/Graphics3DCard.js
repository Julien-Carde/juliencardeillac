import React, { useState } from 'react';
import styles from '../page.module.css';

export default function Graphics3DCard({ title, description, wireframeUrl, renderUrl }) {
    const [sliderPosition, setSliderPosition] = useState(50);

    return (
        <div className={styles.graphicsCardWrapper}>
            <div className={styles.graphicsCard}>
                <div className={styles.videoComparisonContainer}>
                    {/* Render Video (Background) */}
                    <div className={styles.videoWrapper}>
                        <video autoPlay loop muted playsInline>
                            <source src={renderUrl} type="video/mp4" />
                        </video>
                    </div>
                    {/* Wireframe Video (Foreground) */}
                    <div 
                        className={styles.videoWrapper}
                        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                    >
                        <video autoPlay loop muted playsInline>
                            <source src={wireframeUrl} type="video/mp4" />
                        </video>
                    </div>
                    {/* Slider Line with Handle */}
                    <div 
                        className={styles.sliderLine}
                        style={{ left: `${sliderPosition}%` }}
                    >
                        <div className={styles.sliderHandle}>
                            <div className={`${styles.arrows} ${styles.arrowsLeft}`}></div>
                            <div className={`${styles.arrows} ${styles.arrowsRight}`}></div>
                        </div>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderPosition}
                        onChange={(e) => setSliderPosition(e.target.value)}
                        className={styles.slider}
                    />
                </div>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
            </div>
        </div>
    );
} 

