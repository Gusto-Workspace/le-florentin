import { useEffect, useState } from 'react';
export function useCatalog(loader, scenario = 'default') {
  const [state, setState] = useState({ status: 'loading', data: null, error: null });
  useEffect(() => {
    let active = true;
    setState({ status: 'loading', data: null, error: null });
    Promise.resolve().then(() => loader({ scenario })).then(data => {
      if (active) setState({ status: 'ready', data, error: null });
    }).catch(error => {
      if (active) setState({ status: 'error', data: null, error: error?.message || 'Erreur de lecture' });
    });
    return () => { active = false; };
  }, [loader, scenario]);
  return state;
}
