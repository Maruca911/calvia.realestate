import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
}

export function usePageMeta({ title, description, keywords }: PageMeta) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute('content', description);
      document.head.appendChild(metaDesc);
    }

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    const prevKeywords = metaKeywords?.getAttribute('content') || '';
    if (keywords) {
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      } else {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        metaKeywords.setAttribute('content', keywords);
        document.head.appendChild(metaKeywords);
      }
    }

    return () => {
      document.title = prevTitle;
      const descEl = document.querySelector('meta[name="description"]');
      if (descEl) descEl.setAttribute('content', prevDesc);
      const kwEl = document.querySelector('meta[name="keywords"]');
      if (kwEl) kwEl.setAttribute('content', prevKeywords);
    };
  }, [title, description, keywords]);
}
