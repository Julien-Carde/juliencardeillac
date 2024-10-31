import React, { useState } from 'react';
import styles from './RevealSlider.module.css';

export default function RevealSlider() {
  const [sliderPosition, setSliderPosition] = useState(50); // Start with slider at the middle (50%)

  // Handle slider change to update the overlay width
  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    <div className={styles.container}>
      {/* Background video with the final render */}
      <video
        className={styles.video}
        src="/medias/1080p_Match_Framerate.mp4"
        autoPlay
        muted
        loop
        
      />

      {/* Overlay video with wireframe render */}
      <video
        className={styles.video}
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }} // Use clipPath to reveal
        src="/medias/1080p_Match_Framerate.mov"
        autoPlay
        muted
        loop
        
      />

      {/* Range slider to control the reveal */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className={styles.slider}
      />
    </div>
  );
}