import type { BlogPost } from './blogTypes';
import { blogPosts1 } from './blogPosts1';
import { blogPosts2 } from './blogPosts2';
import { blogPosts3 } from './blogPosts3';
import { blogPosts4 } from './blogPosts4';
import { blogPosts5 } from './blogPosts5';
import { blogPosts6 } from './blogPosts6';

export const blogPosts: BlogPost[] = [
  ...blogPosts1,
  ...blogPosts2,
  ...blogPosts3,
  ...blogPosts4,
  ...blogPosts5,
  ...blogPosts6,
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export type { BlogPost } from './blogTypes';
