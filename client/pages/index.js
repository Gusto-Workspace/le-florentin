import Head from 'next/head';
import { useRef, useState } from 'react';
import Navigation from '../components/Navigation';
import Experience from '../components/Experience';
import ScrollRail from '../components/ScrollRail';
import { Hero, Maison, Interlude, Ritual, Invitation, Footer } from '../components/Sections';

export default function Home() {
  const rootRef = useRef(null);
  const lenisRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  return <>
    <Head>
      <title>Le Florentin | Restaurant gastronomique à Moissac</title>
      <meta name="description" content="Le Florentin à Moissac — l'art de recevoir et le plaisir d'une cuisine de saison. Découvrez notre univers et réservez votre table." />
      <meta name="theme-color" content="#091718" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content="Le Florentin — Restaurant gastronomique à Moissac" />
      <meta property="og:description" content="Le goût des instants rares, à Moissac." />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    </Head>
    <a href="#maison" className="skip-link">Aller au contenu</a>
    <ScrollRail />
    <Navigation open={menuOpen} setOpen={setMenuOpen} lenisRef={lenisRef}/>
    <main id="contenu" ref={rootRef} inert={menuOpen} aria-hidden={menuOpen}>
      <Hero lenisRef={lenisRef}/>
      <Maison/>
      <Interlude/>
      <Ritual lenisRef={lenisRef}/>
      <Invitation/>
      <Footer lenisRef={lenisRef}/>
    </main>
    <Experience rootRef={rootRef} lenisRef={lenisRef} menuOpen={menuOpen}/>
  </>;
}
