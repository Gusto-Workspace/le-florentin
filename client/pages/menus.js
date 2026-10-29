import Link from 'next/link';
import { useRouter } from 'next/router';
import InteriorShell, { EditorialHeading } from '../components/interior/InteriorShell';
import { CatalogLoading, CatalogEmpty, CatalogError } from '../components/interior/CatalogStates';
import { useCatalog } from '../components/interior/useCatalog';
import { loadMenuCatalog } from '../lib/content/catalog.mjs';
import Photo from '../components/Photo';

const money = value => value === null || value === undefined || value === '' ? null : new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Number(value));
function DishRow({ dish, index }) {
  return <article className="catalog-dish">
    <span className="catalog-dish-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
    <div className="catalog-dish-details"><h3>{dish.name}</h3>{dish.description && <p>{dish.description}</p>}{Boolean(dish.tags?.length) && <div className="catalog-tags">{dish.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}</div>
    <span className="catalog-dish-price">{money(dish.price) || <span className="price-on-request">Sur demande</span>}</span>
  </article>;
}
function Category({ category, index }) {
  const hasGroups = category.subcategories.length > 0;
  return <section id={`carte-${category.id}`} className="menu-category" aria-labelledby={`title-${category.id}`}>
    <div className="menu-category-title"><span className="interior-count">{String(index + 1).padStart(2, '0')}</span><div><p className="interior-eyebrow">{category.subtitle || 'À LA TABLE'}</p><h2 id={`title-${category.id}`}>{category.name}</h2></div></div>
    {category.items.length > 0 && <div className="catalog-dishes">{category.items.map((item, i) => <DishRow key={item.id} dish={item} index={i} />)}</div>}
    {hasGroups && category.subcategories.map(sub => <div className="catalog-subgroup" key={sub.id}><div className="catalog-subhead"><h3>{sub.name}</h3>{sub.description && <p>{sub.description}</p>}</div>{sub.items.length ? sub.items.map((item, i) => <DishRow key={item.id} dish={item} index={i}/>) : <CatalogEmpty label="Aucune proposition publiée dans cette rubrique."/>}</div>)}
    {!category.items.length && !hasGroups && <CatalogEmpty label="Cette catégorie ne contient pas de proposition publiée pour le moment."/>}
  </section>;
}
function MenuExperience({ item, index }) {
  return <article className="menu-experience"><div className="menu-experience-top"><span className="interior-eyebrow">EXPÉRIENCE {String(index + 1).padStart(2, '0')}</span><span>{money(item.price) || 'Tarif sur demande'}</span></div><h3>{item.name}</h3>{item.subtitle && <p className="menu-experience-sub">{item.subtitle}</p>}{item.description && <p className="menu-experience-description">{item.description}</p>}{Boolean(item.courses?.length) && <ul>{item.courses.map((course, i) => <li key={`${i}-${course}`}>{course}</li>)}</ul>}</article>;
}
export default function Menus() {
  const { query } = useRouter();
  const { data, status, error } = useCatalog(loadMenuCatalog, typeof query.demo === 'string' ? query.demo : 'default');
  return <InteriorShell page="menus" title="Carte & menus" description="Découvrez l'univers de la carte du Florentin à Moissac.">
    <div className="interior-hero menu-page-hero">
      <EditorialHeading chapter="LA CARTE" title="La cuisine" italic="se raconte." subtitle="Des gestes, des saisons, des rencontres. Un récit à savourer à son rythme."/>
      <div className="menu-hero-photo"><Photo name="dark-plate" alt="Présentation culinaire illustrative, photographie d’ambiance" eager /></div>
      <div className="menu-hero-bottom"><span>LA BEAUTÉ DU GESTE</span><span>01 / 04</span></div>
    </div>
    <section className="menu-reading-area">
      <div className="menu-reading-intro"><div><p className="interior-eyebrow">LES INSTANTS À TABLE</p><h2>À découvrir,<br/><em>sans se presser.</em></h2></div><p>Une carte qui se parcourt comme un carnet de saison, entre savoir-faire, inspirations et plaisirs à partager.</p></div>
      <p className="interior-data-disclaimer">Sélection illustrative · plats et tarifs non contractuels</p>
      {status === 'loading' ? <CatalogLoading/> : status === 'error' ? <CatalogError error={error}/> : <>
        {data.menus.length > 0 && <section className="menu-experiences" aria-labelledby="menu-experiences-title"><div className="menu-experiences-heading"><span className="interior-eyebrow">POUR SE LAISSER GUIDER</span><h2 id="menu-experiences-title">Nos <em>parenthèses.</em></h2></div><div className="menu-experiences-grid">{data.menus.map((item, index) => <MenuExperience key={item.id} item={item} index={index}/>)}</div></section>}
        {data.categories.length > 0 ? <div className="menu-reading-layout"><aside className="menu-side-index" aria-label="Catégories de la carte"><p>CHAPITRES</p>{data.categories.map((cat, index) => <a key={cat.id} href={`#carte-${cat.id}`}><span>{String(index + 1).padStart(2, '0')}</span>{cat.subtitle || cat.name}</a>)}<div className="menu-side-ornament" aria-hidden="true">F</div></aside><div className="menu-category-stack">{data.categories.map((cat, index) => <Category key={cat.id} category={cat} index={index}/>)}</div></div> : <CatalogEmpty label="Aucune rubrique à présenter pour le moment."/>}
      </>}
    </section>
    <section className="interior-outro menu-page-outro"><div className="outro-photo"><Photo name="wine-pouring" alt="Service du vin, illustration d’ambiance"/></div><div className="outro-copy"><span className="interior-eyebrow">POUR PROLONGER LE PLAISIR</span><h2>Il ne reste<br/>qu’à <em>se rencontrer.</em></h2><Link href="/reservations" className="interior-primary-link">ENVISAGER UNE TABLE <span aria-hidden="true">↗</span></Link></div></section>
  </InteriorShell>;
}
