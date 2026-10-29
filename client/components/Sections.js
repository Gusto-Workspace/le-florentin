import { motion } from 'motion/react';
import Photo from './Photo';
import ScrollReveal from './external/react-bits/ScrollReveal';
import { scrollToTarget } from './Experience';

export function Hero({ lenisRef }) {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-noise" aria-hidden="true" />
    <div className="hero-aperture"><Photo className="hero-image" name="night-interior" priority alt="Restaurant à la lumière tamisée, photographie d'ambiance illustrative"/><div className="hero-image-shade"/></div>
    <div className="hero-intro"><span>LE FLORENTIN</span><span>RESTAURANT GASTRONOMIQUE</span><span>MOISSAC</span></div>
    <div className="hero-heading"><span className="hero-script">Quand la lumière devient un souvenir</span><h1 id="hero-title">Le <em>Florentin</em></h1><p>L’art de recevoir, le goût de l’instant.</p></div>
    <div className="hero-caption"><span>UNE CERTAINE IDÉE DU PLAISIR</span><span>8, PLACE ROGER-DELTHIL</span></div>
    <div className="hero-bottom-line" aria-hidden="true"/><button className="hero-instruction" onClick={() => scrollToTarget('#maison', lenisRef)}>DÉCOUVRIR <span aria-hidden="true">↓</span></button>
    <div className="hero-discovery" aria-hidden="true"><span>LE GOÛT D’ÊTRE ICI</span><p>Tout commence par un instant.</p></div>
    <div className="hero-exit-veil" aria-hidden="true" />
  </section>;
}

export function Maison() {
  return <section className="maison section-dark" id="maison" aria-labelledby="maison-title">
    <div className="maison-threshold" aria-hidden="true"><span>ENTREZ</span><i /></div>
    <div className="page-rail" aria-hidden="true"/><div className="section-index">01 <span>—</span> LA MAISON</div>
    <div className="maison-lead" data-reveal><p className="eyebrow">LE TEMPS D’UN MOMENT</p><h2 id="maison-title">Il est des lieux<br/>qui donnent envie<br/><em>de rester.</em></h2></div>
    <div className="maison-layout">
      <div className="maison-copy" data-reveal><p className="dropcap">À Moissac, un repas devient une parenthèse. Une manière de ralentir, de savourer, de s’offrir ce luxe simple : être ensemble.</p><a className="text-link" href="#cuisine">DÉCOUVRIR NOTRE CUISINE <span aria-hidden="true">↗</span></a><span className="maison-vertical">MOISSAC / SUD-OUEST</span></div>
      <div className="maison-images"><figure className="maison-portrait"><div className="parallax-wrap"><Photo name="wine-pouring" alt="Vin servi à table, photographie d'ambiance illustrative" data-parallax="9" /></div><figcaption>01 / LE TEMPS DU PARTAGE</figcaption></figure><figure className="maison-small"><Photo name="warm-room" alt="Salle chaleureuse de restaurant, photographie illustrative"/><figcaption>02 / L’ART DE RECEVOIR</figcaption></figure></div>
    </div>
    <p className="maison-last-word" aria-hidden="true">Prendre le temps.</p>
  </section>;
}

export function Interlude() {
  return <section className="interlude" aria-label="Une déclaration du Florentin">
    <div className="interlude-curtain" aria-hidden="true" />
    <span className="interlude-small">LA BELLE HEURE</span>
    <ScrollReveal className="interlude-reveal" as="blockquote" baseRotation={2} blurStrength={5} start="top 92%" end="bottom 37%">Les belles choses ne se pressent jamais.</ScrollReveal>
    <span className="interlude-signature">LE FLORENTIN — MOISSAC</span>
    <span className="interlude-next" aria-hidden="true">LA MATIÈRE DEVIENT ÉMOTION&nbsp; ↓</span>
  </section>;
}

/** One continuous visual stage: kitchen gesture opens into the finished plate. */
export function Ritual({ lenisRef }) {
  return <div className="ritual-journey">
    <span id="plaisirs" className="ritual-anchor" aria-hidden="true" />
    <section className="ritual" id="cuisine" aria-labelledby="craft-title">
      <div className="ritual-stage">
        <Photo name="chef-hands" className="ritual-photo ritual-kitchen" alt="Chef dressant une assiette, photographie illustrative" eager />
        <div className="ritual-kitchen-shade" aria-hidden="true" />
        <div className="ritual-plate-portal"><Photo name="dark-plate" className="ritual-photo ritual-plate" alt="Assiette gastronomique, photographie d'ambiance illustrative" eager /><div className="ritual-plate-shade" aria-hidden="true" /></div>
        <span className="ritual-fixed-caption">LE FLORENTIN <i /> MOISSAC</span>
        <div className="ritual-first ritual-copy">
          <span className="ritual-index">02 / LE GESTE</span><p className="ritual-script">Au plus près du geste.</p><h2 id="craft-title">La cuisine<br/><em>en vérité.</em></h2>
          <p className="ritual-lead">La précision d’une main.<br/>Le respect d’un produit.</p>
        </div>
        <div className="ritual-second ritual-copy">
          <span className="ritual-index">03 / L’INSTANT</span><p className="ritual-script">Puis vient l’émotion.</p><h2>Le plaisir<br/><em>se compose.</em></h2>
          <p className="ritual-lead">Les saveurs se rencontrent.<br/>Le temps se suspend.</p>
        </div>
        <div className="ritual-progress" aria-hidden="true"><span className="ritual-progress-fill" /></div>
        <span className="ritual-edge-label" aria-hidden="true">DU GESTE À L’ASSIETTE</span>
      </div>
    </section>
    <div className="ritual-scroll-spacer" aria-hidden="true" />
    <section className="ritual-coda" aria-label="L'expérience de la table">
      <div className="ritual-coda-line" aria-hidden="true" />
      <span className="eyebrow" data-reveal>À LA TABLE DU FLORENTIN</span>
      <h2 data-reveal>Ce qui compte,<br/>c’est <em>l’instant.</em></h2>
      <p data-reveal>Une cuisine à découvrir, des moments à partager. Le plaisir de se retrouver autour d’une table.</p>
      <button className="text-link" onClick={() => scrollToTarget('#contact', lenisRef)}>VENIR AU FLORENTIN <span aria-hidden="true">↗</span></button>
    </section>
  </div>;
}

export function Invitation() {
  return <section className="invitation" id="contact" aria-labelledby="invitation-title"><div className="invitation-corner invitation-corner-a" aria-hidden="true"/><div className="invitation-corner invitation-corner-b" aria-hidden="true"/><span className="invitation-index" data-reveal>LE FLORENTIN / MOISSAC</span><p className="invitation-before" data-reveal>À présent, il ne reste qu’à se rencontrer.</p><h2 id="invitation-title" data-reveal>À très <em>bientôt</em><br/>à notre table.</h2><motion.a className="invitation-cta" href="tel:+33563041918" whileHover={{ scale: 1.035 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 270, damping: 20 }}><span>RÉSERVER PAR TÉLÉPHONE</span><span aria-hidden="true">↗</span></motion.a><p className="invitation-address">8 place Roger-Delthil · 82200 Moissac<br/><a href="tel:+33563041918">05 63 04 19 18</a></p><p className="invitation-footnote">PHOTOGRAPHIES D’AMBIANCE NON CONTRACTUELLES</p></section>;
}

export function Footer({ lenisRef }) {
  return <footer className="site-footer"><div className="footer-top"><span className="footer-wordmark">Le Florentin</span><button className="footer-toplink" onClick={() => scrollToTarget('#haut', lenisRef)}>REMONTER <span aria-hidden="true">↑</span></button></div><div className="footer-middle"><span>RESTAURANT GASTRONOMIQUE<br/>MOISSAC · FRANCE</span><span>LE GOÛT DES INSTANTS RARES</span><a href="tel:+33563041918">NOUS APPELER ↗</a></div><div className="footer-bottom"><span>© LE FLORENTIN — CONCEPT DIGITAL</span><span>CRÉATION GUSTO</span></div></footer>;
}
