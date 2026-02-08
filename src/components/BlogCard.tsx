import { Clock, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import type { BlogPost } from '../data/blogTypes';
import type { Route } from '../hooks/useRouter';

interface BlogCardProps {
  post: BlogPost;
  index: number;
  navigate: (to: Route) => void;
}

export default function BlogCard({ post, index, navigate }: BlogCardProps) {
  const { ref, isVisible } = useScrollReveal(0.05);

  return (
    <div
      ref={ref}
      className={`group cursor-pointer transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
      onClick={() => navigate(`/blog/${post.slug}` as Route)}
    >
      <div className="bg-white rounded-xl overflow-hidden border border-beige-dark/30 hover:shadow-xl hover:shadow-black/8 hover:border-dark-blue/20 transition-all duration-300 h-full flex flex-col">
        <div className="relative overflow-hidden aspect-[16/10]">
          <img
            src={post.featuredImage}
            alt={post.featuredImageAlt}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-3 text-xs text-grey-light mb-3">
            <time dateTime={post.publishDate}>
              {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
            <span className="w-1 h-1 rounded-full bg-grey-light" />
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>
          <h2 className="font-heading text-xl font-bold text-black mb-3 group-hover:text-dark-blue transition-colors leading-snug">
            {post.title}
          </h2>
          <p className="text-grey text-sm leading-relaxed mb-4 flex-1">
            {post.excerpt}
          </p>
          <span className="inline-flex items-center gap-1.5 text-dark-blue font-semibold text-sm group-hover:gap-3 transition-all duration-300">
            Read More
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
}
