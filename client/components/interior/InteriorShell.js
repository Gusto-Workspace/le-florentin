import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Navigation from '../Navigation';
import DiagonalArrow from '../DiagonalArrow';

const routes = [
  { href: '/', title: 'La maison' },
  { href: '/menus', title: 'La cuisine' },
  { href: '/gift-cards', title: 'Les plaisirs' },
  { href: '/reservations', title: 'Réserver' },
  { href: '/contact', title: 'Nous trouver' },
];
export function EditorialHeading({ chapter, title, italic, subtitle, theme = 'dark' }) {
  return <div className={`interior-editorial-heading ${theme === 'light' ? 'is-light' : ''}`}>
    <p className="interior-eyebrow"><span>LE FLORENTIN</span><span> / </span>{chapter}</p>
    <h1>{title} <em>{italic}</em></h1>
    {subtitle && <p className="interior-subtitle">{subtitle}</p>}
  </div>;
}
export default function InteriorShell({ page, title, description, children, theme = 'dark' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const lenisRef = useRef(null);
  return <>
    <Head>
      <title>{`${title} — Le Florentin, Moissac`}</title>
      <meta name="description" content={description}/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="theme-color" content="#091516"/>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
    </Head>
    <a href="#interior-content" className="skip-link">Aller au contenu</a>
    <Navigation open={menuOpen} setOpen={setMenuOpen} lenisRef={lenisRef} interior />
    <main id="interior-content" className={`interior-page interior-${page} interior-theme-${theme}`} inert={menuOpen} aria-hidden={menuOpen}>
      {children}
      <footer className="interior-footer">
        <div className="interior-footer-top"><p>Le Florentin</p><span>MOISSAC · FRANCE</span><Link href="/reservations">LE TEMPS D’UNE TABLE <DiagonalArrow /></Link></div>
        <nav aria-label="Navigation de bas de page">{routes.map(route => <Link key={route.href} href={route.href} aria-current={route.href === '/' + page ? 'page' : undefined}>{route.title}</Link>)}</nav>
        <div className="interior-footer-bottom"><span>© LE FLORENTIN</span><span>PHOTOGRAPHIES D’AMBIANCE NON CONTRACTUELLES</span><span>CRÉATION GUSTO</span></div>
      </footer>
    </main>
  </>;
}
