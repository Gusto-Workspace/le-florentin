/*
 * Adapted from React Bits / ScrollReveal.jsx by David Haz (DavidHDev).
 * Source: https://github.com/DavidHDev/react-bits/tree/main/src/content/TextAnimations/ScrollReveal
 * License: MIT + Commons Clause (see THIRD_PARTY_LICENSES.md).
 * Original mechanics retained: per-word split, scroll-linked rotation, opacity and blur.
 * Changes for Florentin: replace global ScrollTrigger.getAll().kill() with gsap.context
 * scoped cleanup, honor reduced motion and remove invalid h2 > p nesting, use a single
 * timeline to avoid duplicate competing ScrollTriggers for the same words.
 */
import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({
  children,
  baseOpacity = 0.12,
  baseRotation = 2,
  blurStrength = 6,
  className = '',
  as: Tag = 'p',
  start = 'top 88%',
  end = 'bottom 44%',
}) {
  const elementRef = useRef(null);
  const words = useMemo(() => String(children || '').split(/(\s+)/).map((word, index) =>
    /^\s+$/.test(word) ? word : <span className="rb-scroll-word" key={index}>{word}</span>
  ), [children]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const pieces = element.querySelectorAll('.rb-scroll-word');
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: element, start, end, scrub: 0.35, invalidateOnRefresh: true },
      });
      timeline.fromTo(element, { rotation: baseRotation, transformOrigin: '0% 50%' },
        { rotation: 0, ease: 'none', duration: 1 }, 0);
      timeline.fromTo(pieces,
        { opacity: baseOpacity, filter: `blur(${blurStrength}px)` },
        { opacity: 1, filter: 'blur(0px)', stagger: 0.045, ease: 'none', duration: 0.8 }, 0);
    }, element);
    return () => ctx.revert();
  }, [baseOpacity, baseRotation, blurStrength, start, end]);

  return <Tag ref={elementRef} className={`rb-scroll-reveal ${className}`}>{words}</Tag>;
}
