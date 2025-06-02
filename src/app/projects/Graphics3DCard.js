import React, { useState, useRef, useEffect } from "react";

export default function Graphics3DCard({ title, description, wireframeUrl, renderUrl }) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isVisible, setIsVisible] = useState(false);
    const [videosLoaded, setVideosLoaded] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const wireframeVideoRef = useRef(null);
    const renderVideoRef = useRef(null);
    const containerRef = useRef(null);

    // Check if mobile on component mount
    useEffect(() => {
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    }, []);

    // Set up intersection observer for lazy loading
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                console.log("Component is visible:", entry.isIntersecting); // Debugging
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Handle video playback based on visibility
    useEffect(() => {
        if (isVisible && videosLoaded >= 2) {
            // Both videos are loaded and component is visible
            wireframeVideoRef.current?.play().catch(e => console.log("Play error:", e));
            renderVideoRef.current?.play().catch(e => console.log("Play error:", e));
        } else {
            wireframeVideoRef.current?.pause();
            renderVideoRef.current?.pause();
        }
    }, [isVisible, videosLoaded]);

    const handleVideoLoaded = () => {
        setVideosLoaded(prev => prev + 1);
        console.log("Video loaded, total loaded:", videosLoaded + 1); // Debugging
    };

    const handleSliderChange = (e) => {
        setSliderPosition(Number(e.target.value));
    };

    const handleTimeUpdate = (event) => {
        // Keep videos in sync but only update when necessary
        if (wireframeVideoRef.current && renderVideoRef.current) {
            const sourceVideo = event.target;
            const targetVideo = sourceVideo === wireframeVideoRef.current 
                ? renderVideoRef.current 
                : wireframeVideoRef.current;
                
            if (Math.abs(sourceVideo.currentTime - targetVideo.currentTime) > 0.2) {
                targetVideo.currentTime = sourceVideo.currentTime;
            }
        }
    };

    const styles = {
        graphicsCardWrapper: { width: "100%", margin: "0 auto" },
        graphicsCard: { position: "relative", width: "100%", maxWidth: "800px", margin: "0 auto" },
        videoComparisonContainer: { 
            position: "relative", 
            width: "100%", 
            paddingTop: "56.25%", 
            overflow: "hidden",
            background: "#f0f0f0" // Placeholder background while loading
        },
        loaderContainer: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: videosLoaded >= 2 ? "none" : "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f0f0f0",
            zIndex: 5
        },
        loader: {
            width: "40px",
            height: "40px",
            border: "5px solid #ffffff",
            borderRadius: "50%",
            borderTop: "5px solid #888888",
            animation: "spin 1s linear infinite"
        },
        videoWrapper: { 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%",
            display: videosLoaded >= 2 ? "block" : "none" // Hide until loaded
        },
        video: { 
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
            cursor: "ew-resize", 
            zIndex: 2,
            display: videosLoaded >= 2 ? "block" : "none" // Hide until loaded
        },
        sliderHandle: { 
            position: "absolute", 
            top: "50%", 
            transform: "translate(-50%, -50%)", 
            width: "40px", 
            height: "40px", 
            display: videosLoaded >= 2 ? "flex" : "none", // Hide until loaded
            alignItems: "center", 
            justifyContent: "space-between", 
            background: "white", 
            borderRadius: "50%", 
            cursor: "ew-resize", 
            zIndex: 3, 
            left: `${sliderPosition}%` 
        },
        arrow: { pointerEvents: "none", userSelect: "none", color: "gray", margin: "0 5px" },
        slider: { 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%", 
            opacity: 0, 
            zIndex: 4,
            display: videosLoaded >= 2 ? "block" : "none" // Hide until loaded
        },
        info: { display: "flex", flexDirection: "column", gap: "0px" },
        title: { textAlign: "center", marginTop: "10px", marginBottom: "0px", fontFamily: "'Rajdhani', sans-serif" },
        description: { marginTop: "0px", textAlign: "center", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", color: "gray", fontWeight: 300 },
    };

    return (
        <div style={styles.graphicsCardWrapper}>
            <div style={styles.graphicsCard}>
                <div ref={containerRef} style={styles.videoComparisonContainer}>
                    {/* Loading Indicator */}
                    <div style={styles.loaderContainer}>
                        <div style={styles.loader}></div>
                    </div>
                    
                    {/* Render Video (Left Side) */}
                    <div style={styles.videoWrapper}>
                        <video
                            ref={renderVideoRef}
                            loop
                            muted
                            playsInline
                            preload={isMobile ? "metadata" : "auto"}
                            style={styles.video}
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedData={handleVideoLoaded}
                            poster="" // Add a low-res poster image URL here for faster initial render
                        >
                            <source src={renderUrl} type="video/webm" />
                            <source src={renderUrl.replace(".webm", ".mp4")} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    
                    {/* Wireframe Video (Right Side) */}
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
                            preload={isMobile ? "metadata" : "auto"}
                            style={styles.video}
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedData={handleVideoLoaded}
                            poster="" // Add a low-res poster image URL here for faster initial render
                        >
                            <source src={wireframeUrl} type="video/webm" />
                            <source src={wireframeUrl.replace(".webm", ".mp4")} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    
                    {/* Vertical Slider Line */}
                    <div style={styles.sliderLine}></div>
                    
                    {/* Draggable Slider Handle with Arrows */}
                    <div style={styles.sliderHandle}>
                        <span style={styles.arrow}>&lt;</span>
                        <span style={styles.arrow}>&gt;</span>
                    </div>
                    
                    {/* Hidden Range Slider */}
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={sliderPosition} 
                        onChange={handleSliderChange} 
                        style={styles.slider} 
                    />
                </div>
                <div style={styles.info}>
                    <h3 style={styles.title}>{title}</h3>
                    <p style={styles.description}>{description}</p>
                </div>
            </div>
            
            {/* Animation keyframes for loader */}
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