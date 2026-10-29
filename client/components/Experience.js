import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function scrollToTarget(target, lenisRef) {
  if (typeof document === 'undefined') return;
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced && lenisRef?.current) lenisRef.current.scrollTo(el, { offset: 0, duration: 1.12, lock: false });
  else el.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });
}

/** One Lenis RAF driven by GSAP; all scene triggers scoped and reverted on unmount. */
export default function Experience({ rootRef, lenisRef, menuOpen, introActive = false, introDelay = 0 }) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis;
    let raf;
    if (!reduced) {
      lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false, wheelMultiplier: 0.88, touchMultiplier: 1 });
      lenisRef.current = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      raf = seconds => lenis.raf(seconds * 1000);
      gsap.ticker.add(raf);
      // Avoid catch-up jumps after a background tab has been suspended.
      gsap.ticker.lagSmoothing(0);
    }

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const q = gsap.utils.selector(root);
        const hero = q('.hero')[0];
        const maison = q('.maison')[0];
        const interlude = q('.interlude')[0];
        const ritual = q('.ritual')[0];
        const ritualJourney = q('.ritual-journey')[0];
        const ritualScroll = q('.ritual-scroll-spacer')[0];

        gsap.fromTo(q('.hero-heading'), { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 1.25, ease: 'power3.out', delay: introDelay + 0.1 });
        gsap.fromTo(q('.hero-intro, .hero-caption, .hero-instruction'), { autoAlpha: 0 }, { autoAlpha: 1, stagger: 0.12, duration: 0.8, delay: introDelay + 0.55 });

        q('[data-reveal]').forEach(el => {
          gsap.fromTo(el, { autoAlpha: 0, y: 29 }, {
            autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
          });
        });

        q('[data-parallax]').forEach(el => {
          const depth = Number(el.dataset.parallax) || 9;
          gsap.fromTo(el, { yPercent: -depth }, { yPercent: depth, ease: 'none',
            scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
          });
        });

        if (hero) {
          // Pin only the aperture's transformation duration. No arbitrary multi-viewport blank stage.
          const large = window.matchMedia('(min-width: 701px)').matches;
          const tl = gsap.timeline({ scrollTrigger: {
            id: 'threshold-aperture', trigger: hero, start: 'top top',
            end: large ? () => `+=${Math.min(window.innerHeight * 0.78, 740)}` : 'bottom 22%',
            scrub: 0.65, pin: large, pinSpacing: large, anticipatePin: 1,
            invalidateOnRefresh: true
          }});
          // Animate symmetric CSS variables, not a CSS shorthand whose normalization can shift the arch.
          // A single --hero-side drives BOTH left and right edges at every scrub position.
          tl.to(q('.hero-aperture'), {
            '--hero-top': '0%', '--hero-side': '0%', '--hero-bottom': '0%',
            '--hero-radius': '0px',
            ease: 'power2.inOut', duration: 1
          }, 0)
            .to(q('.hero-aperture img'), { scale: 1.11, yPercent: 2, ease: 'none', duration: 1 }, 0)
            .to(q('.hero-heading'), { yPercent: -47, autoAlpha: 0, ease: 'power2.in', duration: 0.63 }, 0.18)
            .to(q('.hero-intro, .hero-caption, .hero-bottom-line, .hero-instruction'), { autoAlpha: 0, duration: 0.26 }, 0.17)
            .fromTo(q('.hero-discovery'), { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, duration: 0.33, ease: 'power2.out' }, 0.62)
            .to(q('.hero-exit-veil'), { autoAlpha: 0.72, duration: 0.3, ease: 'none' }, 0.76);
        }

        if (maison) {
          // The arrival card seems to emerge from the previous aperture's remaining shadow.
          gsap.fromTo(q('.maison-threshold'), { yPercent: 58, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1,
            scrollTrigger: { trigger: maison, start: 'top 96%', end: 'top 42%', scrub: 0.35 }, ease: 'none' });
          gsap.fromTo(q('.maison-images'), { yPercent: 8 }, { yPercent: -5, ease: 'none',
            scrollTrigger: { trigger: maison, start: 'top bottom', end: 'bottom 0%', scrub: 0.7 } });
        }

        if (interlude) {
          // A single material change: dark velvet rolls away to reveal the pale editorial page.
          gsap.fromTo(q('.interlude-curtain'), { clipPath: 'inset(0% 0% 0% 0%)' }, {
            clipPath: 'inset(0% 0% 100% 0%)', ease: 'none',
            scrollTrigger: { id: 'velvet-to-paper', trigger: interlude, start: 'top 88%', end: 'top 21%', scrub: 0.45 }
          });
        }

        if (ritual && ritualJourney && ritualScroll) {
          // A unified photographic canvas: the plate is revealed *inside* the kitchen scene.
          // The sticky stage occupies the viewport throughout, avoiding blank pin spacers.
          const tl = gsap.timeline({ scrollTrigger: {
            id: 'gesture-to-plate', trigger: ritualJourney, start: 'top top',
            // Finish the photographic transition BEFORE the cream sheet enters.
            // The ritual remains sticky as that sheet scrolls over it.
            endTrigger: ritualScroll, end: 'bottom bottom',
            scrub: 0.65, invalidateOnRefresh: true
          }});
          tl.fromTo(q('.ritual-kitchen img'), { scale: 1.06, xPercent: 0 },
            { scale: 1.21, xPercent: -4, ease: 'none', duration: 1 }, 0)
            .fromTo(q('.ritual-first'), { autoAlpha: 1, y: 0 },
              { autoAlpha: 0, y: -56, ease: 'power2.in', duration: 0.22 }, 0.23)
            .fromTo(q('.ritual-plate-portal'), { clipPath: 'ellipse(0% 0% at 50% 50%)' },
              { clipPath: 'ellipse(135% 135% at 50% 50%)', ease: 'power2.inOut', duration: 0.62 }, 0.31)
            .fromTo(q('.ritual-plate img'), { scale: 1.26, yPercent: 5 },
              { scale: 1, yPercent: 0, ease: 'none', duration: 0.67 }, 0.31)
            .fromTo(q('.ritual-second'), { autoAlpha: 0, y: 56 },
              { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.2 }, 0.69)
            .to(q('.ritual-progress-fill'), { scaleX: 1, duration: 1, ease: 'none' }, 0);
        }

        const coda = q('.ritual-coda')[0];
        if (coda) {
          gsap.fromTo(q('.ritual-coda-line'), { scaleX: 0 }, { scaleX: 1, transformOrigin: 'center',
            scrollTrigger: { trigger: coda, start: 'top 75%', end: 'top 28%', scrub: true }, ease: 'none' });
        }
      }, root);
      return () => ctx.revert();
    });

    const refresh = () => ScrollTrigger.refresh();
    let cancelled = false;
    const imgs = Array.from(root.querySelectorAll('img'));
    const pending = imgs.filter(img => !img.complete);
    pending.forEach(img => { img.addEventListener('load', refresh); img.addEventListener('error', refresh); });
    window.addEventListener('load', refresh);
    document.fonts?.ready?.then(() => { if (!cancelled) refresh(); });
    ScrollTrigger.refresh();
    return () => {
      cancelled = true;
      window.removeEventListener('load', refresh);
      pending.forEach(img => { img.removeEventListener('load', refresh); img.removeEventListener('error', refresh); });
      mm.revert();
      if (raf) gsap.ticker.remove(raf);
      if (lenis) { lenis.off('scroll', ScrollTrigger.update); lenis.destroy(); }
      lenisRef.current = null;
    };
  }, [rootRef, lenisRef, introDelay]);

  useEffect(() => {
    if (!lenisRef.current) return;
    if (menuOpen || introActive) lenisRef.current.stop(); else lenisRef.current.start();
  }, [menuOpen, introActive, lenisRef]);
  return null;
}
