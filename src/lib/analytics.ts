const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

let initialized = false;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function initGA() {
  if (initialized || !GA_ID) return;
  initialized = true;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { send_page_view: false });
}

export function trackPageView(path: string) {
  if (!initialized || !window.gtag) return;
  window.gtag('event', 'page_view', { page_path: path });
}

export function trackEvent(name: string, params?: Record<string, string>) {
  if (!initialized || !window.gtag) return;
  window.gtag('event', name, params);
}
