import { useState, useEffect, useCallback } from 'react';

export type Route = '/' | '/buyers' | '/sellers' | '/thank-you' | '/thank-you/buyer' | '/thank-you/seller' | '/blog' | `/blog/${string}`;

const STATIC_ROUTES = ['/', '/buyers', '/sellers', '/thank-you', '/thank-you/buyer', '/thank-you/seller', '/blog'];

function getRouteFromHash(): Route {
  const hash = window.location.hash.slice(1) || '/';
  if (STATIC_ROUTES.includes(hash)) return hash as Route;
  if (hash.startsWith('/blog/')) return hash as Route;
  return '/';
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(getRouteFromHash);

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((to: Route) => {
    window.location.hash = to;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { route, navigate };
}
