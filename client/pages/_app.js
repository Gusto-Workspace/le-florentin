import { MotionConfig } from 'motion/react';
import 'lenis/dist/lenis.css';
import '../styles/global.css';
import '../styles/interior.css';

export default function App({ Component, pageProps }) {
  return <MotionConfig reducedMotion="user"><Component {...pageProps} /></MotionConfig>;
}
