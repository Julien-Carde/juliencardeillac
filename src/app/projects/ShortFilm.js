import styles from '../page.module.css';

export default function ShortFilm() {
    return (
        <div className={styles.containerFilm}>
            <div className={styles.videoContainer}>
                <iframe
                    src="https://www.youtube.com/embed/xqzv_WLzYTI"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <div className={styles.textContainer}>
                <h2>Airbag (Work In Progress)</h2>
                <p>
                    This video serves as both a preview and a VFX breakdown of my short film 'Airbag', showcasing key shots alongside behind-the-scenes CGI work. While the work is still in progress, the goal is to showcase the foundation of cinematography, color grading, CGI, and compositing, which will serve as a base for further refinement and enhancement.
                </p>
                <p>
                    Airbag follows a fashion photographer who dies in a car accident after a tense argument with a model about her growing discomfort with being objectified. As tensions rise, his perception fractures, hallucinations blur the boundary between reality and fantasy, culminating in a fatal crash.
                </p>
                <p>
                    After reading Baudrillard’s Simulacra and Simulation, I was inspired to explore hyperreality and the male gaze, questioning how the photographer’s world is not an objective reality but a fabricated construct shaped by his lens and the industry around him. His gaze reduces the model to an image, a commodity to be consumed, until she resists objectification, fracturing his control, making fantasy collide with the Real.
                </p>
                <p>
                    <span className={styles.filmBold}>Cast:</span> Coralie Nadel, Vivien Verdureau
                </p>
                <p>
                    <span className={styles.filmBold}>Music:</span> Massive Attack - Dissolved Girl
                </p>
            </div>
        </div>
    );
}