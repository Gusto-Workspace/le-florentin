import { demoMenuCatalog } from '../../data/demo/menus.mjs';
import { demoGiftCatalog } from '../../data/demo/giftCards.mjs';

const copy = value => JSON.parse(JSON.stringify(value));
const byOrder = (a, b) => (a.order ?? 0) - (b.order ?? 0);
const visible = item => item?.visible !== false;
function normalizeItems(items = []) { return items.filter(visible).sort(byOrder); }
export function normalizeMenus(raw) {
  if (!raw || !Array.isArray(raw.categories) || !Array.isArray(raw.menus)) throw Error('Catalogue de carte invalide');
  return { source: raw.source || 'demo', intro: raw.intro || '',
    categories: raw.categories.filter(visible).sort(byOrder).map(cat => ({ ...cat,
      items: normalizeItems(cat.items),
      subcategories: (cat.subcategories || []).filter(visible).sort(byOrder).map(sub => ({ ...sub, items: normalizeItems(sub.items) }))
    })), menus: normalizeItems(raw.menus) };
}
export function normalizeGiftCards(raw) {
  if (!raw || !Array.isArray(raw.groups)) throw Error('Catalogue cadeaux invalide');
  return { source: raw.source || 'demo', groups: raw.groups.filter(visible).sort(byOrder).map(group => ({ ...group, offers: normalizeItems(group.offers) })) };
}
/** Variants used only in QA, never published as actual restaurant data. */
function scenarioData(catalog, scenario, kind) {
  const x = copy(catalog);
  if (scenario === 'empty') { if (kind === 'menus') { x.categories = []; x.menus = []; } else x.groups = []; }
  if (scenario === 'minimal') {
    if (kind === 'menus') { x.categories = x.categories.slice(0, 1); x.categories[0].items = x.categories[0].items.slice(0, 1); x.menus = []; }
    else { x.groups = x.groups.slice(0, 1); x.groups[0].offers = x.groups[0].offers.slice(0, 1); }
  }
  if (scenario === 'many') {
    if (kind === 'menus') for (const cat of x.categories) {
      if (cat.items?.length) for (let n = 1; n <= 12; n++) cat.items.push({ ...cat.items[0], id: `${cat.id}-extra-${n}`, name: `Variation gastronomique numéro ${n} — textures et légumes du moment`, order: 100 + n });
    } else for (const group of x.groups) {
      if (group.offers?.length) for (let n = 1; n <= 10; n++) group.offers.push({ ...group.offers[0], id: `${group.id}-extra-${n}`, title: `Expérience de démonstration ${n}`, order: 100 + n });
    }
  }
  if (scenario === 'long') {
    if (kind === 'menus') { x.categories[0].name = 'Un chapitre de dégustation particulièrement long, avec un titre destiné à tester les dimensions les plus contraignantes'; x.categories[0].items[0].description = 'Une description volontairement longue. '.repeat(20); }
    else { x.groups[0].name = 'Une sélection de présents spécialement imaginés pour toutes les célébrations importantes et les instants que l’on souhaite prolonger'; x.groups[0].offers[0].description = 'Texte long pour tester la mise en page. '.repeat(18); }
  }
  if (scenario === 'hidden') {
    if (kind === 'menus') { x.categories[0].items.forEach(item => { item.visible = false; }); }
    else x.groups[0].offers.forEach(item => { item.visible = false; });
  }
  return x;
}
/** Replace only these two loaders with authenticated Gusto Manager adapters later. No invented endpoint. */
export async function loadMenuCatalog({ scenario = 'default' } = {}) {
  return normalizeMenus(scenarioData(demoMenuCatalog, scenario, 'menus'));
}
export async function loadGiftCatalog({ scenario = 'default' } = {}) {
  return normalizeGiftCards(scenarioData(demoGiftCatalog, scenario, 'gifts'));
}
