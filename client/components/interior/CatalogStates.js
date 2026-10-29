export function CatalogLoading() { return <p className="interior-catalog-state" role="status">Préparation de la sélection…</p>; }
export function CatalogError({ error }) { return <p className="interior-catalog-state interior-error" role="alert">La sélection ne peut pas être affichée pour le moment. {error}</p>; }
export function CatalogEmpty({ label = 'Aucun élément à présenter actuellement.' }) { return <p className="interior-catalog-state">{label}</p>; }
