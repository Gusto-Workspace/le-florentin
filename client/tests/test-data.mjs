import assert from 'node:assert/strict';
import { loadMenuCatalog, loadGiftCatalog, normalizeMenus, normalizeGiftCards } from '../lib/content/catalog.mjs';
for (const scenario of ['default','empty','minimal','many','long','hidden']) {
  const m = await loadMenuCatalog({scenario}); const g=await loadGiftCatalog({scenario});
  assert(Array.isArray(m.categories) && Array.isArray(m.menus));
  assert(Array.isArray(g.groups));
  for (const cat of m.categories) {
    assert(cat.visible !== false);
    for (const item of cat.items) assert(item.visible !== false);
    for (const sub of cat.subcategories) for (const item of sub.items) assert(item.visible !== false);
  }
  for (const group of g.groups) for (const offer of group.offers) assert(offer.visible !== false);
  if (scenario === 'empty') assert.equal(m.categories.length + m.menus.length + g.groups.length, 0);
  if (scenario === 'many') assert(m.categories[0].items.length > 10 && g.groups[0].offers.length > 10);
}
assert.deepEqual(normalizeMenus({ categories:[{id:'a',visible:true,items:[],subcategories:[]}],menus:[]}).categories[0].items, []);
assert.deepEqual(normalizeGiftCards({groups:[{id:'a',offers:[]}]}).groups[0].offers, []);
console.log('OK — menus + cadeaux : 6 scénarios, masquage, catégories vides, champs facultatifs.');
