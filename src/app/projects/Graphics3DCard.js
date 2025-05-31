import React, { useState, useRef, useEffect } from "react";

export default function Graphics3DCard({
  title,
  description,
  wireframeUrl,
  renderUrl,
  mobileRenderUrl,
  cover
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isMobile, setIsMobile] = useState(false);
  const [videosLoaded, setVideosLoaded] = useState(0);
  const wireframeRef = useRef(null);
  const renderRef = useRef(null);
  const mobileVideoRef = useRef(null);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const handleSliderChange = (e) => {
    setSliderPosition(Number(e.target.value));
  };

  const handleVideoLoaded = () => setVideosLoaded((prev) => prev + 1);

  const handleTimeUpdate = (e) => {
    const source = e.target;
    const target =
      source === wireframeRef.current ? renderRef.current : wireframeRef.current;
    if (Math.abs(source.currentTime - target.currentTime) > 0.2) {
      target.currentTime = source.currentTime;
    }
  };

  const requestFullscreenPlay = () => {
    const video = mobileVideoRef.current;
    if (video) {
      video.play().catch(console.error);
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen(); // iOS Safari
      }
    }
  };

  const styles = {
    container: { width: "100%", maxWidth: "800px", margin: "0 auto" },
    videoContainer: {
      position: "relative",
      width: "100%",
      paddingTop: "56.25%", // 16:9 aspect ratio
      background: "#f0f0f0",
      overflow: "hidden"
    },
    videoWrapper: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    },
    sliderLine: {
      position: "absolute",
      top: 0,
      bottom: 0,
      width: "1px",
      background: "white",
      left: `${sliderPosition}%`,
      zIndex: 2
    },
    sliderHandle: {
      position: "absolute",
      top: "50%",
      left: `${sliderPosition}%`,
      transform: "translate(-50%, -50%)",
      width: "40px",
      height: "40px",
      background: "white",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: 3
    },
    arrow: {
      pointerEvents: "none",
      userSelect: "none",
      color: "gray",
      margin: "0 5px"
    },
    slider: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 0,
      zIndex: 4
    },
    info: {
      display: "flex",
      flexDirection: "column",
      gap: "0px"
    },
    title: {
      textAlign: "center",
      margin: "10px 0 2px 0",
      fontFamily: "'Rajdhani', sans-serif"
    },
    description: {
      margin: "0 auto",
      textAlign: "center",
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "10px",
      color: "gray",
      fontWeight: 300
    },
    playButton: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "60px",
      height: "60px",
      background: "rgba(255, 255, 255, 0.8)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
      cursor: "pointer",
      backdropFilter: "blur(4px)"
    },
    triangle: {
      width: 0,
      height: 0,
      borderTop: "10px solid transparent",
      borderBottom: "10px solid transparent",
      borderLeft: "16px solid black",
      marginLeft: "4px"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.videoContainer}>
        {isMobile ? (
          <>
            <img
              src={cover}
              alt="preview"
              style={styles.videoWrapper}
            />
            <div style={styles.playButton} onClick={requestFullscreenPlay}>
              <div style={styles.triangle}></div>
            </div>
            <video
              ref={mobileVideoRef}
              src={mobileRenderUrl}
              style={{ display: "none" }}
              controls
              playsInline
              preload="auto"
            />
          </>
        ) : (
          <>
            <video
              ref={renderRef}
              loop
              muted
              playsInline
              preload="auto"
              style={styles.videoWrapper}
              onLoadedData={handleVideoLoaded}
              onTimeUpdate={handleTimeUpdate}
            >
              <source src={renderUrl.replace(".webm", ".mp4")} type="video/mp4" />
              <source src={renderUrl} type="video/webm" />
            </video>

            <div
              style={{
                ...styles.videoWrapper,
                maskImage: `linear-gradient(to right, transparent ${sliderPosition}%, black ${sliderPosition}%)`,
                WebkitMaskImage: `linear-gradient(to right, transparent ${sliderPosition}%, black ${sliderPosition}%)`
              }}
            >
              <video
                ref={wireframeRef}
                loop
                muted
                playsInline
                preload="auto"
                style={styles.videoWrapper}
                onLoadedData={handleVideoLoaded}
                onTimeUpdate={handleTimeUpdate}
              >
                <source src={wireframeUrl.replace(".webm", ".mp4")} type="video/mp4" />
                <source src={wireframeUrl} type="video/webm" />
              </video>
            </div>

            <div style={styles.sliderLine}></div>
            <div style={styles.sliderHandle}>
              <span style={styles.arrow}>&lt;</span>
              <span style={styles.arrow}>&gt;</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              style={styles.slider}
            />
          </>
        )}
      </div>

      <div style={styles.info}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.description}>{description}</p>
      </div>
    </div>
  );
}