/** OFFRES FICTIVES — Démonstration seulement, jamais la carte du Florentin. */
export const demoMenuCatalog = {
  version: 'demo-1', source: 'demo',
  intro: 'Une idée de la saison',
  categories: [
    { id: 'entrees', name: 'Les premières impressions', subtitle: 'Entrées', order: 10, visible: true, items: [
      { id: 'e1', name: 'Truite marinée, agrumes & herbes fraîches', description: 'Crème légère au citron, huile verte et pickles délicats.', price: 19, visible: true, order: 10, tags: ['Frais'] },
      { id: 'e2', name: 'Velouté de courge rôtie', description: 'Noisettes torréfiées, graines et pointe d’épices douces.', price: 16, visible: true, order: 20 },
      { id: 'e3', name: 'Légumes au retour du marché', description: 'Une composition libre qui suit les arrivages et les envies du moment.', price: null, visible: true, order: 30 },
      { id: 'e-hidden', name: 'Plat non publié', price: 99, visible: false, order: 40 }
    ]},
    { id: 'plats', name: 'La cuisine prend la parole', subtitle: 'Plats', order: 20, visible: true, items: [
      { id: 'p1', name: 'Poisson de ligne, beurre aux herbes', description: 'Fenouil confit, condiment aux agrumes et jus réduit.', price: 34, visible: true, order: 10, tags: ['Signature fictive'] },
      { id: 'p2', name: 'Volaille fermière dorée', description: 'Mousseline de pommes de terre, légumes glacés, jus corsé.', price: 32, visible: true, order: 20 },
      { id: 'p3', name: 'Risotto de saison', description: 'Légumes et copeaux de fromage affiné.', price: 27, visible: true, order: 30 }
    ]},
    { id: 'desserts', name: 'Le dernier souvenir', subtitle: 'Douceurs', order: 30, visible: true, items: [
      { id: 'd1', name: 'Poire, vanille et croustillant', description: 'Poire pochée et crème aérienne à la vanille.', price: 14, visible: true, order: 10 },
      { id: 'd2', name: 'Chocolat, café, fleur de sel', description: 'Un contraste de textures et de températures.', price: 15, visible: true, order: 20 }
    ]},
    { id: 'boissons', name: 'À déguster ensemble', subtitle: 'Boissons', order: 40, visible: true, subcategories: [
      { id: 's1', name: 'Sans alcool', visible: true, description: 'Accords de fraîcheur', order: 1, items: [
        { id: 'b1', name: 'Infusion glacée maison', description: 'Selon la saison.', price: 7, visible: true, order: 1 },
        { id: 'b2', name: 'Eau pétillante', price: null, visible: true, order: 2 }
      ]},
      { id: 's2', name: 'La cave', visible: true, order: 2, items: [
        { id: 'b3', name: 'Sélection de vins au verre', description: 'Accords suggérés à table.', price: null, visible: true, order: 1 }
      ]}
    ]},
    { id: 'hidden', name: 'Catégorie non publiée', visible: false, items: [{ id: 'z', name: 'Invisibilité', visible: true }] }
  ],
  menus: [
    { id: 'm1', name: 'Une parenthèse', subtitle: 'Menu dégustation fictif', description: 'Une traversée en plusieurs instants, imaginée pour la démonstration.', price: 65, visible: true, order: 10, courses: ['Une entrée de saison', 'Un plat inspiré du marché', 'Une dernière douceur'] },
    { id: 'm2', name: 'Le temps d’un dîner', subtitle: 'Expérience fictive', description: 'Une autre manière de découvrir notre univers.', price: null, visible: true, order: 20, courses: [] }
  ]
};
