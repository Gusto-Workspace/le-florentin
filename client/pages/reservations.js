import { useEffect, useState } from 'react';
import InteriorShell, { EditorialHeading } from '../components/interior/InteriorShell';
import Photo from '../components/Photo';

const services = [
  { id:'dejeuner', label:'Déjeuner', note:'Préférence de service' },
  { id:'diner', label:'Dîner', note:'Préférence de service' },
];
const initial = { date:'', guests:'2', service:'diner', time:'', firstname:'', lastname:'', email:'', phone:'', note:'' };
function todayLocal() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
export default function Reservations() {
  const [form, setForm] = useState(initial);
  const [today, setToday] = useState('');
  const [review, setReview] = useState(false);
  useEffect(() => { setToday(todayLocal()); }, []);
  const change = (key, value) => { setForm(old => ({...old,[key]:value})); setReview(false); };
  function handleSubmit(event) { event.preventDefault(); if (!event.currentTarget.reportValidity()) return; setReview(true); }
  return <InteriorShell page="reservations" title="Réservations" description="Préparez votre visite au Florentin. Pour préparer votre visite au Florentin, choisissez une date puis contactez notre équipe pour confirmer.">
    <div className="interior-hero reservation-hero">
      <div className="reservation-hero-photo"><Photo name="night-interior" alt="Ambiance de table, photographie illustrative" eager /></div>
      <div className="reservation-hero-text"><EditorialHeading chapter="RÉSERVATION" title="Une table" italic="à partager." subtitle="Le plaisir de se retrouver commence bien avant le premier service."/><a className="interior-hero-action" href="#reservation-form">PRÉPARER MA VISITE <span aria-hidden="true">↓</span></a></div>
    </div>
    <section className="reservation-booking" id="reservation-form">
      <div className="reservation-editorial"><span className="interior-eyebrow">PRENDRE LE TEMPS</span><h2>Imaginons<br/><em>votre venue.</em></h2><p>Imaginez votre venue à votre rythme. Pour confirmer une table, notre équipe vous répond directement par téléphone.</p><div className="reservation-side-photo"><Photo name="warm-room" alt="Intérieur chaleureux, photographie d’ambiance illustrative" /></div></div>
      <div className="reservation-form-panel"><div className="reservation-panel-top"><span>01 — 03</span><span>VOTRE PRÉFÉRENCE</span></div>
        <form onSubmit={handleSubmit}>
          <div className="reservation-form-section"><h3>Quand souhaitez-vous venir ?</h3><div className="reservation-service-options" role="group" aria-label="Préférence de service">{services.map(service => <button key={service.id} type="button" className={form.service === service.id ? 'selected' : ''} aria-pressed={form.service === service.id} onClick={() => change('service',service.id)}><span>{service.label}</span><small>{service.note}</small></button>)}</div>
          <div className="reservation-form-grid"><label>Date envisagée<input required type="date" value={form.date} min={today || undefined} onChange={e => change('date',e.target.value)}/></label><label>Nombre de convives<select value={form.guests} onChange={e => change('guests',e.target.value)}>{Array.from({length:12}, (_,i) => i+1).map(n => <option key={n} value={n}>{n} {n===1?'personne':'personnes'}</option>)}</select></label></div>
          <label>Heure souhaitée (indicative)<select value={form.time} onChange={e => change('time',e.target.value)} required><option value="">Sélectionnez une préférence</option>{(form.service === 'dejeuner' ? ['12:00','12:30','13:00','13:30'] : ['19:00','19:30','20:00','20:30']).map(t => <option key={t} value={t}>{t}</option>)}</select></label></div>
          <div className="reservation-form-section"><div className="reservation-panel-top"><span>02 — 03</span><span>VOS COORDONNÉES</span></div><h3>À qui préparer la table ?</h3><div className="reservation-form-grid"><label>Prénom<input required maxLength={80} autoComplete="given-name" value={form.firstname} onChange={e => change('firstname',e.target.value)} /></label><label>Nom<input required maxLength={80} autoComplete="family-name" value={form.lastname} onChange={e => change('lastname',e.target.value)} /></label></div><label>Adresse email<input required type="email" maxLength={180} autoComplete="email" value={form.email} onChange={e => change('email',e.target.value)}/></label><label>Téléphone<input required type="tel" maxLength={30} autoComplete="tel" value={form.phone} onChange={e => change('phone',e.target.value)}/></label><label>Une attention particulière ? (facultatif)<textarea rows={3} maxLength={450} value={form.note} onChange={e => change('note',e.target.value)} placeholder="Une information pour préparer votre visite…"/></label></div>
          <button type="submit" className="interior-primary-button">VOIR LE RÉCAPITULATIF <span aria-hidden="true">↗</span></button><p className="reservation-privacy">Préparation uniquement : aucune demande n’est transmise. Pour confirmer, appelez le 05 63 04 19 18.</p>
        </form>
        {review && <div className="reservation-review" role="status"><p className="interior-eyebrow">03 — 03 / APERÇU NON TRANSMIS</p><h3>Votre souhait de visite</h3><dl><div><dt>À l’attention de</dt><dd>{form.firstname} {form.lastname}</dd></div><div><dt>Date & service</dt><dd>{form.date} · {services.find(x => x.id === form.service)?.label} · {form.time}</dd></div><div><dt>Convives</dt><dd>{form.guests}</dd></div></dl><strong>AUCUNE RÉSERVATION N’A ÉTÉ ENREGISTRÉE.</strong><p>Ce récapitulatif est seulement visuel. Pour une réservation réelle, appelez le restaurant.</p><a href="tel:+33563041918" className="interior-text-link">APPELER LE FLORENTIN ↗</a></div>}
      </div>
    </section>
  </InteriorShell>;
}
