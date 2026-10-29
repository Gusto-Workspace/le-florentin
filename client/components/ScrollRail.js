import { motion, useScroll } from 'motion/react';

/** Uses Motion's official useScroll MotionValue. No GSAP animates this element. */
export default function ScrollRail() {
  const { scrollYProgress } = useScroll();
  return <motion.div aria-hidden="true" className="reading-progress" style={{ scaleY: scrollYProgress }} />;
}
