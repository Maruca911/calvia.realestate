import { useEffect } from 'react';
import type { BlogPost } from '../data/blogTypes';

export function useBlogSchema(post: BlogPost | undefined) {
  useEffect(() => {
    if (!post) return;

    const schemaId = 'blog-post-schema';
    const existing = document.getElementById(schemaId);
    if (existing) existing.remove();

    const schema = document.createElement('script');
    schema.id = schemaId;
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.metaDescription,
        image: post.featuredImage,
        datePublished: post.publishDate,
        dateModified: post.publishDate,
        author: {
          '@type': 'Organization',
          name: 'Calvia Real Estate',
          url: 'https://www.calvia.realestate',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Calvia Real Estate',
          url: 'https://www.calvia.realestate',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://www.calvia.realestate/#/blog/${post.slug}`,
        },
        keywords: post.focusKeyword,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.calvia.realestate',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: 'https://www.calvia.realestate/#/blog',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `https://www.calvia.realestate/#/blog/${post.slug}`,
          },
        ],
      },
    ]);
    document.head.appendChild(schema);

    return () => {
      const el = document.getElementById(schemaId);
      if (el) el.remove();
    };
  }, [post]);
}
