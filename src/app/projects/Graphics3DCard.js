import React, { useState, useRef, useEffect } from "react";

export default function Graphics3DCard({ title, description, wireframeUrl, renderUrl, mobileRenderUrl, cover }) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isVisible, setIsVisible] = useState(false);
    const [videosLoaded, setVideosLoaded] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const wireframeVideoRef = useRef(null);
    const renderVideoRef = useRef(null);
    const mobileVideoRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) {
            renderVideoRef.current?.pause();
            wireframeVideoRef.current?.pause();
            mobileVideoRef.current?.pause();
            return;
        }

        if (isMobile && videosLoaded >= 1) {
            // mobileVideoRef.current?.play().catch(console.log);
        } else if (!isMobile && videosLoaded >= 2) {
            renderVideoRef.current?.play().catch(console.log);
            wireframeVideoRef.current?.play().catch(console.log);
        }
    }, [isVisible, videosLoaded, isMobile]);

    const handleVideoLoaded = () => setVideosLoaded(prev => prev + 1);

    const handleSliderChange = (e) => setSliderPosition(Number(e.target.value));

    const handleTimeUpdate = (e) => {
        if (isMobile) return;
        const source = e.target;
        const target = source === wireframeVideoRef.current ? renderVideoRef.current : wireframeVideoRef.current;
        if (Math.abs(source.currentTime - target.currentTime) > 0.2) {
            target.currentTime = source.currentTime;
        }
    };

    const styles = {
        graphicsCardWrapper: { width: "100%", margin: "0 auto" },
        graphicsCard: { position: "relative", width: "100%", maxWidth: "800px", margin: "0 auto" },
        videoComparisonContainer: {
            position: "relative", width: "100%", paddingTop: "56.25%", overflow: "hidden", background: "#f0f0f0"
        },
        loaderContainer: {
            position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
            display: (isMobile ? videosLoaded >= 1 : videosLoaded >= 2) ? "none" : "flex",
            alignItems: "center", justifyContent: "center", background: "#f0f0f0", zIndex: 5
        },
        loader: {
            width: "40px", height: "40px",
            border: "5px solid #fff", borderTop: "5px solid #888",
            borderRadius: "50%", animation: "spin 1s linear infinite"
        },
        videoWrapper: {
            position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
            display: (isMobile ? videosLoaded >= 1 : videosLoaded >= 2) ? "block" : "none"
        },
        video: { width: "100%", height: "100%", objectFit: "cover" },
        sliderLine: {
            position: "absolute", top: 0, bottom: 0, width: "1px", background: "white",
            left: `${sliderPosition}%`, cursor: "ew-resize", zIndex: 2
        },
        sliderHandle: {
            position: "absolute", top: "50%", left: `${sliderPosition}%`,
            transform: "translate(-50%, -50%)",
            width: "40px", height: "40px", background: "white",
            borderRadius: "50%", zIndex: 3, cursor: "ew-resize",
            display: "flex", alignItems: "center", justifyContent: "space-between"
        },
        arrow: { pointerEvents: "none", userSelect: "none", color: "gray", margin: "0 5px" },
        slider: {
            position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
            opacity: 0, zIndex: 4
        },
        info: { display: "flex", flexDirection: "column", gap: "0px" },
       title: {
    textAlign: "center",
    margin: "10px 0 2px 0", // top, right, bottom, left
    fontFamily: "'Rajdhani', sans-serif"
},
description: {
    margin: "0 auto",
    textAlign: "center",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "10px",
    color: "gray",
    fontWeight: 300
}
    };

    return (
        <div style={styles.graphicsCardWrapper}>
            <div style={styles.graphicsCard}>
                <div ref={containerRef} style={styles.videoComparisonContainer}>
                    {/* Loader */}
                    <div style={styles.loaderContainer}><div style={styles.loader}></div></div>

                    {/* Mobile version: only mobileRenderUrl */}
                    {isMobile ? (
                        <div style={styles.videoWrapper}>
                            <video
                                ref={mobileVideoRef}
                                muted
                                playsInline
                                controls={true}
                                preload="auto"
                                poster={cover}
                                onLoadedData={handleVideoLoaded}
                                style={styles.video}
                            >
                                <source src={mobileRenderUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            {/* touch overlay... */}
                        </div>
                    ) : (
                        <>
                            {/* Desktop version: render + wireframe */}
                            <div style={styles.videoWrapper}>
                                <video
                                    ref={renderVideoRef}
                                    loop
                                    muted
                                    playsInline
                                    preload="auto"
                                    style={styles.video}
                                    onTimeUpdate={handleTimeUpdate}
                                    onLoadedData={handleVideoLoaded}
                                    poster=""
                                >
                                    <source src={renderUrl.replace(".webm", ".mp4")} type="video/mp4" />
                                    <source src={renderUrl} type="video/webm" />
                                </video>
                            </div>
                            <div
                                style={{
                                    ...styles.videoWrapper,
                                    maskImage: `linear-gradient(to right, transparent ${sliderPosition}%, black ${sliderPosition}%)`,
                                    WebkitMaskImage: `linear-gradient(to right, transparent ${sliderPosition}%, black ${sliderPosition}%)`
                                }}
                            >
                                <video
                                    ref={wireframeVideoRef}
                                    loop
                                    muted
                                    playsInline
                                    preload="auto"
                                    style={styles.video}
                                    onTimeUpdate={handleTimeUpdate}
                                    onLoadedData={handleVideoLoaded}
                                    poster=""
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
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `
            }} />
        </div>
    );
}