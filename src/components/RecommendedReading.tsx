import { ArrowRight, Clock } from 'lucide-react';
import type { BlogPost } from '../data/blogTypes';
import type { Route } from '../hooks/useRouter';

interface RecommendedReadingProps {
  posts: BlogPost[];
  navigate: (to: Route) => void;
}

export default function RecommendedReading({ posts, navigate }: RecommendedReadingProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-warm-grey">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-black mb-3">
            Recommended Reading
          </h3>
          <p className="text-grey max-w-lg mx-auto">
            Expert guides to help you make informed decisions about Calvia real estate.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.slug}
              onClick={() => navigate(`/blog/${post.slug}` as Route)}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-beige-dark/30 hover:shadow-lg hover:border-dark-blue/20 transition-all duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.featuredImage}
                  alt={post.featuredImageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-grey-light mb-2">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </div>
                <h4 className="font-heading text-lg font-bold text-black mb-2 group-hover:text-dark-blue transition-colors leading-snug">
                  {post.title}
                </h4>
                <span className="inline-flex items-center gap-1.5 text-dark-blue font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                  Read More
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
