import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import InteriorShell, { EditorialHeading } from '../components/interior/InteriorShell';
import { CatalogLoading, CatalogEmpty, CatalogError } from '../components/interior/CatalogStates';
import { useCatalog } from '../components/interior/useCatalog';
import DiagonalArrow from '../components/DiagonalArrow';
import { loadGiftCatalog } from '../lib/content/catalog.mjs';

const format = n => Number.isFinite(Number(n)) && n !== null && n !== undefined ? `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(n)} €` : 'Sur demande';
function Offer({ offer, selected, onSelect }) {
  return <button type="button" className={`gift-offer ${selected ? 'gift-offer-selected' : ''}`} onClick={() => onSelect(offer.id)} aria-pressed={selected}>
    <span className="gift-offer-top"><span>{offer.kind === 'experience' ? 'EXPÉRIENCE' : 'BON DE VALEUR'}</span><span aria-hidden="true">{selected ? '●' : '○'}</span></span>
    <span className="gift-offer-name">{offer.title}</span>
    {offer.description && <span className="gift-offer-desc">{offer.description}</span>}
    <span className="gift-offer-bottom"><strong>{format(offer.value)}</strong><span>{selected ? 'SÉLECTIONNÉ' : 'CHOISIR'} <DiagonalArrow /></span></span>
  </button>;
}
export default function GiftCards() {
  const { query } = useRouter();
  const { data, status, error } = useCatalog(loadGiftCatalog, typeof query.demo === 'string' ? query.demo : 'default');
  const [selectedId, setSelectedId] = useState(null);
  const [dedication, setDedication] = useState('');
  const [recipient, setRecipient] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const offers = useMemo(() => data?.groups.flatMap(g => g.offers) || [], [data]);
  const selected = offers.find(offer => offer.id === selectedId) || null;
  useEffect(() => { if (selectedId && !offers.some(o => o.id === selectedId)) { setSelectedId(null); setShowSummary(false); } }, [offers, selectedId]);
  return <InteriorShell page="gift-cards" title="Cartes cadeaux" description="L'art d'offrir un instant au Florentin. Découvrez nos attentions et nos inspirations pour offrir un moment à partager." theme="light">
    <div className="interior-hero gift-page-hero">
      <EditorialHeading chapter="LES CARTES CADEAUX" title="L’art" italic="d’offrir." subtitle="Un geste délicat, une expérience à partager, un souvenir qui se prolonge." theme="light" />
      <div className="gift-hero-composition" aria-label="Illustration d’une carte cadeau"><div className="gift-hero-card"><span>LE FLORENTIN <i aria-hidden="true"/> MOISSAC</span><strong>Le plaisir<br/><em>d’être ensemble.</em></strong><small>UNE INVITATION À PARTAGER</small></div><div className="gift-hero-underlay" aria-hidden="true"/></div>
    </div>
    <section className="gift-selection-section">
      <div className="gift-intro"><p className="interior-eyebrow">L’ART DE FAIRE PLAISIR</p><h2>Un présent.<br/><em>Un souvenir.</em></h2><p>Choisir une valeur ou imaginer une expérience : le plaisir d'offrir commence par une attention particulière.</p></div>
      <p className="interior-data-disclaimer">Offres et montants illustratifs · achat en ligne indisponible</p>
      {status === 'loading' ? <CatalogLoading/> : status === 'error' ? <CatalogError error={error}/> : (data.groups.length ? <div className="gift-groups">{data.groups.map((group, idx) => <section className="gift-group" key={group.id}><div className="gift-group-heading"><span className="interior-count">{String(idx + 1).padStart(2,'0')}</span><div><p className="interior-eyebrow">{group.subtitle}</p><h3>{group.name}</h3></div></div>{group.offers.length ? <div className="gift-offer-grid">{group.offers.map(offer => <Offer key={offer.id} offer={offer} selected={selectedId === offer.id} onSelect={id => { setSelectedId(id); setShowSummary(false); }}/>)}</div> : <CatalogEmpty label="Aucune offre publiée dans cette sélection."/>}</section>)}</div> : <CatalogEmpty label="Aucune proposition à présenter pour le moment."/>)}
      <div className="gift-customization" id="cadeau-preview"><div className="gift-customization-heading"><p className="interior-eyebrow">VOTRE ATTENTION</p><h2>Les mots<br/>qui <em>accompagnent.</em></h2><p>Un aperçu local pour imaginer le cadeau. Il ne génère ni bon, ni commande, ni paiement.</p></div><div className="gift-customization-form"><label htmlFor="gift-recipient">Prénom du destinataire (facultatif)</label><input id="gift-recipient" maxLength={80} value={recipient} onChange={e => {setRecipient(e.target.value);setShowSummary(false);}} placeholder="Un prénom à chérir"/><label htmlFor="gift-message">Votre message (facultatif)</label><textarea id="gift-message" rows={4} maxLength={320} value={dedication} onChange={e => {setDedication(e.target.value);setShowSummary(false);}} placeholder="Pour les instants que l’on n’oublie pas…"/><button className="interior-primary-button" type="button" disabled={!selected} onClick={() => setShowSummary(true)}>APERÇU DE MON ATTENTION <DiagonalArrow /></button>{!selected && <p className="gift-hint">Choisissez une proposition ci-dessus pour activer cet aperçu.</p>}</div></div>
      {showSummary && selected && <div className="gift-summary" role="status"><p className="interior-eyebrow">APERÇU LOCAL · AUCUN ACHAT</p><h3>{recipient.trim() ? `Pour ${recipient.trim()}` : 'Pour quelqu’un de précieux'}</h3><p>{selected.title} — {format(selected.value)}</p>{dedication.trim() && <blockquote>« {dedication.trim()} »</blockquote>}<p className="gift-summary-caution">Cette sélection n'a pas été enregistrée et aucun bon cadeau n'a été émis. Le paiement Gusto Manager / Stripe n'est pas connecté.</p></div>}
    </section>
    <div className="gift-ending"><p>Un souvenir commence<br/><em>bien avant le dîner.</em></p><Link href="/contact">CONTACTER LE RESTAURANT <DiagonalArrow /></Link></div>
  </InteriorShell>;
}
