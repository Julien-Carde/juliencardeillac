import styles from './page.module.css';

export default function Home() {
    return (
                <Suspense
                  fallback={
                    <div className={styles.loader}>
                    </div>
                  }
                >
                  <Scene onLoad={handleSceneLoad} />
                </Suspense>
    )
}