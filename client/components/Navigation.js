import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { scrollToTarget } from './Experience';

const chapters = [
  { name: <>La <em>maison</em></>, label: 'La maison', id: 'maison' },
  { name: <>La <em>cuisine</em></>, label: 'La cuisine', id: 'cuisine', pageHref: '/menus' },
  { name: <>Les <em>plaisirs</em></>, label: 'Les plaisirs', id: 'plaisirs', pageHref: '/gift-cards' },
  { name: <>Ré<em>server</em></>, label: 'Réserver', href: 'tel:+33563041918', pageHref: '/reservations' },
  { name: <>Nous <em>trouver</em></>, label: 'Nous trouver', id: 'contact', pageHref: '/contact' },
];

/** One shared layout guarantees pixel-identical header positions in both menu states. */
function HeaderBar({ expanded = false, buttonRef, onToggle, onBrand, inertHeader = false, interior = false }) {
  return (
    <header className={`site-header${expanded ? ' menu-header' : ''}`} id={expanded ? undefined : 'haut'} inert={inertHeader || undefined} aria-hidden={inertHeader || undefined}>
      <a className="brand-lockup" href={interior ? "/" : "#haut"} onClick={onBrand} aria-label="Le Florentin — retour en haut">
        <span className="brand-mark">LF</span><span className="brand-meta"><b>LE FLORENTIN</b><small>MOISSAC · FRANCE</small></span>
      </a>
      <div className="header-actions">
        <a className="header-book" href={interior ? "/reservations" : "tel:+33563041918"}>RÉSERVER <span aria-hidden="true">↗</span></a>
        <button type="button" className={`nav-toggle${expanded ? ' nav-toggle-close' : ''}`} ref={buttonRef}
          onClick={onToggle} aria-label={expanded ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={expanded} aria-controls="menu-florentin">
          <span>{expanded ? 'FERMER' : 'MENU'}</span><span className="toggle-lines" aria-hidden="true"><i/><i/></span>
        </button>
      </div>
    </header>
  );
}

export default function Navigation({ open, setOpen, lenisRef, interior = false }) {
  const overlayRef = useRef(null);
  const toggleRef = useRef(null);
  const closeRef = useRef(null);
  const lastFocus = useRef(null);
  const firstOpening = useRef(true);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const duration = mql.matches ? 0 : 0.65;
    const links = overlay.querySelectorAll('.nav-chapter');
    gsap.killTweensOf([overlay, ...links, overlay.querySelector('.nav-plaque')]);
    if (open) {
      lastFocus.current = document.activeElement;
      const originalOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      gsap.set(overlay, { autoAlpha: 1, pointerEvents: 'auto' });
      const tl = gsap.timeline();
      if (duration) {
        tl.fromTo(overlay, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration, ease: 'power3.inOut' })
          .fromTo(links, { y: 32, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.072, ease: 'power3.out', duration: 0.55 }, 0.24)
          .fromTo('.nav-plaque', { scale: 0.91, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.82, ease: 'power3.out' }, 0.16);
      } else gsap.set([links, overlay.querySelector('.nav-plaque')], { autoAlpha: 1, y: 0, scale: 1 });
      closeRef.current?.focus({ preventScroll: true });
      firstOpening.current = false;
      return () => {
        document.documentElement.style.overflow = originalOverflow;
        tl.kill();
      };
    }
    if (firstOpening.current) {
      gsap.set(overlay, { autoAlpha: 0, pointerEvents: 'none' });
      return;
    }
    const tl = gsap.timeline({ onComplete: () => gsap.set(overlay, { autoAlpha: 0, pointerEvents: 'none' }) });
    if (duration) tl.to(overlay, { clipPath: 'inset(0% 0% 100% 0%)', ease: 'power3.inOut', duration: duration * 0.8 });
    else gsap.set(overlay, { autoAlpha: 0, pointerEvents: 'none' });
    lastFocus.current?.focus?.({ preventScroll: true });
    return () => tl.kill();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeys = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); return; }
      if (event.key !== 'Tab') return;
      const items = [...overlayRef.current.querySelectorAll('a[href],button:not([disabled])')];
      if (!items.length) return;
      const first = items[0]; const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKeys);
    return () => document.removeEventListener('keydown', handleKeys);
  }, [open, setOpen]);

  function goTo(id) {
    setOpen(false);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.setTimeout(() => scrollToTarget(`#${id}`, lenisRef), reduced ? 0 : 570);
  }

  return (
    <>
      <HeaderBar
        buttonRef={toggleRef}
        onToggle={() => setOpen(true)}
        onBrand={interior ? undefined : (event) => { event.preventDefault(); scrollToTarget('#haut', lenisRef); }}
        inertHeader={open}
        interior={interior}
      />

      <div className={`menu-overlay ${open ? 'menu-is-open' : ''}`} id="menu-florentin" ref={overlayRef} role="dialog" aria-modal={open ? 'true' : undefined} aria-label="Navigation principale" aria-hidden={!open} inert={!open}>
        <div className="menu-engraving" aria-hidden="true" />
        <HeaderBar
          expanded
          buttonRef={closeRef}
          onToggle={() => setOpen(false)}
          onBrand={interior ? (() => setOpen(false)) : (event) => { event.preventDefault(); goTo('haut'); }}
          interior={interior}
        />
        <div className="menu-body">
          <div className="menu-directory">
            <p className="menu-chapter-label">LE FLORENTIN / SOMMAIRE <span>01 — 05</span></p>
            <nav className="menu-chapters" aria-label="Chapitres de la page">
              {chapters.map((chapter, index) => interior ? (
                <a key={chapter.label} className="nav-chapter" href={['/', '/menus', '/gift-cards', '/reservations', '/contact'][index]} onClick={() => setOpen(false)}><span className="menu-number">0{index + 1}</span><span className="chapter-word">{chapter.name}</span><span className="chapter-arrow" aria-hidden="true">↗</span></a>
              ) : chapter.pageHref ? (
                <a key={chapter.label} className="nav-chapter" href={chapter.pageHref} onClick={() => setOpen(false)}><span className="menu-number">0{index + 1}</span><span className="chapter-word">{chapter.name}</span><span className="chapter-arrow" aria-hidden="true">↗</span></a>
              ) : chapter.href ? (
                <a key={chapter.label} className="nav-chapter" href={chapter.href} onClick={() => setOpen(false)}><span className="menu-number">0{index + 1}</span><span className="chapter-word">{chapter.name}</span><span className="chapter-arrow" aria-hidden="true">↗</span></a>
              ) : (
                <a key={chapter.label} className="nav-chapter" href={`#${chapter.id}`} onClick={(event) => { event.preventDefault(); goTo(chapter.id); }}><span className="menu-number">0{index + 1}</span><span className="chapter-word">{chapter.name}</span><span className="chapter-arrow" aria-hidden="true">↗</span></a>
              ))}
            </nav>
            <div className="menu-directory-bottom"><p>Une adresse où l’on prend le temps.</p><a href={interior ? "/reservations" : "tel:+33563041918"} onClick={() => setOpen(false)}>RÉSERVER UNE TABLE <span aria-hidden="true">↗</span></a></div>
          </div>
          <aside className="menu-cabinet" aria-label="Signature artistique du Florentin"><div className="menu-cabinet-inner"><p className="cabinet-top">UNE INVITATION À ENTRER</p><div className="nav-plaque"><div className="plaque-inner"><span className="plaque-over">L’ART DE RECEVOIR</span><span className="plaque-letter">F</span><span className="plaque-name">LE FLORENTIN</span><span className="plaque-city">MOISSAC · SUD-OUEST</span></div></div><p className="cabinet-poem">Le temps d’un dîner,<br/><em>oublier le temps.</em></p><p className="cabinet-bottom">8, PLACE ROGER-DELTHIL <span>82200 MOISSAC</span></p></div></aside>
        </div>
        <div className="menu-footer"><span>LE FLORENTIN</span><span>LE GOÛT DES INSTANTS RARES</span></div>
      </div>
    </>
  );
}
