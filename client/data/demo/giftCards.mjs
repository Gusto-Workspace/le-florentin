/** OFFRES FICTIVES — Démonstration uniquement. Aucune commande/paiement. */
export const demoGiftCatalog = {
  version: 'demo-1', source: 'demo',
  groups: [
    { id: 'valeurs', name: 'Laissez le choix', subtitle: 'Bons d’une valeur', visible: true, order: 10, offers: [
      { id: 'v50', title: 'Le premier plaisir', value: 50, description: 'Un geste à offrir, librement.', visible: true, order: 10, kind: 'value' },
      { id: 'v100', title: 'Une belle occasion', value: 100, description: 'Une invitation à prendre son temps.', visible: true, order: 20, kind: 'value' },
      { id: 'v150', title: 'Un moment à deux', value: 150, description: 'Le plaisir de se retrouver à table.', visible: true, order: 30, kind: 'value' },
      { id: 'vhidden', title: 'Offre non visible', value: 800, visible: false, order: 40, kind: 'value' }
    ]},
    { id: 'experiences', name: 'Offrez une émotion', subtitle: 'Expériences imaginées', visible: true, order: 20, offers: [
      { id: 'x1', title: 'La belle heure', value: 130, description: 'Un repas à partager, pensé comme une parenthèse.', visible: true, order: 10, kind: 'experience', detail: 'Expérience d’illustration, non proposée à la vente.' },
      { id: 'x2', title: 'L’instant rare', value: null, description: 'Une expérience à imaginer ensemble.', visible: true, order: 20, kind: 'experience' }
    ]}
  ]
};
