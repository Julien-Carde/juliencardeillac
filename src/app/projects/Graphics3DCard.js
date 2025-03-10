import React, { useState, useRef, useEffect } from "react";

export default function Graphics3DCard({ title, description, wireframeUrl, renderUrl }) {
    const [sliderPosition, setSliderPosition] = useState(50); // Initial slider position at 50%
    const wireframeVideoRef = useRef(null);
    const renderVideoRef = useRef(null);

    useEffect(() => {
        // Ensure videos play only when they are visible
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    wireframeVideoRef.current?.play();
                    renderVideoRef.current?.play();
                } else {
                    wireframeVideoRef.current?.pause();
                    renderVideoRef.current?.pause();
                }
            },
            { threshold: 0.2 }
        );

        if (wireframeVideoRef.current) observer.observe(wireframeVideoRef.current);
        if (renderVideoRef.current) observer.observe(renderVideoRef.current);

        return () => observer.disconnect();
    }, []);

    const handleSliderChange = (e) => {
        setSliderPosition(Number(e.target.value));
    };

    const handleTimeUpdate = () => {
        // Keep videos in sync
        if (wireframeVideoRef.current && renderVideoRef.current) {
            const wireframeTime = wireframeVideoRef.current.currentTime;
            if (Math.abs(wireframeTime - renderVideoRef.current.currentTime) > 0.1) {
                renderVideoRef.current.currentTime = wireframeTime;
            }
        }
    };

    const styles = {
        graphicsCardWrapper: { width: "100%", margin: "0 auto" },
        graphicsCard: { position: "relative", width: "100%", maxWidth: "800px", margin: "0 auto" },
        videoComparisonContainer: { position: "relative", width: "100%", paddingTop: "56.25%", overflow: "hidden" },
        videoWrapper: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%" },
        video: { width: "100%", height: "100%", objectFit: "cover" },
        sliderLine: { position: "absolute", top: 0, bottom: 0, width: "1px", background: "white", left: `${sliderPosition}%`, cursor: "ew-resize", zIndex: 2 },
        sliderHandle: { position: "absolute", top: "50%", transform: "translate(-50%, -50%)", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "white", borderRadius: "50%", cursor: "ew-resize", zIndex: 3, left: `${sliderPosition}%` },
        arrow: { pointerEvents: "none", userSelect: "none", color: "gray", margin: "0 5px" },
        slider: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, zIndex: 4 },
        info: { display: "flex", flexDirection: "column", gap: "0px" },
        title: { textAlign: "center", marginTop: "10px", marginBottom: "0px", fontFamily: "'Rajdhani', sans-serif" },
        description: { marginTop: "0px", textAlign: "center", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", color: "gray", fontWeight: 300 },
    };

    return (
        <div style={styles.graphicsCardWrapper}>
            <div style={styles.graphicsCard}>
                <div style={styles.videoComparisonContainer}>
                    {/* Background Video */}
                    <div style={styles.videoWrapper}>
                        <video
                            ref={renderVideoRef}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            disableRemotePlayback
                            decoding="async"
                            loading="lazy"
                            style={styles.video}
                            onTimeUpdate={handleTimeUpdate}
                        >
                            <source src={renderUrl} type="video/webm" />
                        </video>
                    </div>
                    {/* Foreground Video */}
                    <div
                        style={{
                            ...styles.videoWrapper,
                            clipPath: `inset(0 0 0 ${Math.min(sliderPosition, 99.99)}%)`,
                        }}
                    >
                        <video
                            ref={wireframeVideoRef}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            disableRemotePlayback
                            decoding="async"
                            loading="lazy"
                            style={styles.video}
                            onTimeUpdate={handleTimeUpdate}
                        >
                            <source src={wireframeUrl} type="video/webm" />
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
                    <input type="range" min="0" max="100" value={sliderPosition} onChange={handleSliderChange} style={styles.slider} />
                </div>
                <div style={styles.info}>
                    <h3 style={styles.title}>{title}</h3>
                    <p style={styles.description}>{description}</p>
                </div>
            </div>
        </div>
    );
}