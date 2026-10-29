import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './HomeSplash.module.css';

export default function HomeSplash({ onComplete }) {
  const screenRef = useRef(null);
  const artworkRef = useRef(null);

  useEffect(() => {
    const originalOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    let timer;
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(artworkRef.current, { opacity: 1 });
        timer = window.setTimeout(onComplete, 2000);
        return;
      }
      gsap.timeline({ onComplete })
        .fromTo(artworkRef.current, { opacity: 0 },
          { opacity: 1, duration: 0.45, ease: 'power2.out' }, 0)
        .to(screenRef.current, { opacity: 0, duration: 0.55, ease: 'power2.inOut' }, 1.45);
    }, screenRef);
    return () => {
      window.clearTimeout(timer);
      ctx.revert();
      document.documentElement.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  return <div className={styles.screen} ref={screenRef} role="status">
    <span className="sr-only">Bienvenue au Florentin</span>
    <div className={styles.plaque} ref={artworkRef} aria-hidden="true">
      <div className={styles.signature}>
        <span className={styles.over}>L’ART DE RECEVOIR</span>
        <span className={styles.letter}>F</span>
        <span className={styles.name}>LE FLORENTIN</span>
        <span className={styles.city}>MOISSAC · SUD-OUEST</span>
      </div>
    </div>
  </div>;
}
