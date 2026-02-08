import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react';
import { getBlogPost, blogPosts } from '../data/blogPosts';
import Footer from '../components/Footer';
import { usePageMeta } from '../hooks/usePageMeta';
import { useBlogSchema } from '../hooks/useBlogSchema';
import type { Route } from '../hooks/useRouter';

interface BlogPostPageProps {
  slug: string;
  navigate: (to: Route) => void;
}

export default function BlogPostPage({ slug, navigate }: BlogPostPageProps) {
  const post = getBlogPost(slug);

  usePageMeta({
    title: post ? `${post.title} | Calvia Real Estate` : 'Post Not Found | Calvia Real Estate',
    description: post?.metaDescription || '',
  });
  useBlogSchema(post);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-black mb-4">Post Not Found</h1>
          <p className="text-grey mb-8">The blog post you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-dark-blue text-white font-semibold rounded-lg hover:bg-dark-blue-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const related = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <article className="bg-white">
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.featuredImageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-3xl mx-auto">
              <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
                <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
                <span>/</span>
                <button onClick={() => navigate('/blog')} className="hover:text-white transition-colors">Blog</button>
                <span>/</span>
                <span className="text-white/90 truncate max-w-[200px]">{post.title.split(':')[0]}</span>
              </nav>
              <h1 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-10 md:py-16">
          <div className="flex items-center gap-4 text-sm text-grey mb-10 pb-8 border-b border-beige-dark/40">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="w-1 h-1 rounded-full bg-grey-light" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
            <span className="w-1 h-1 rounded-full bg-grey-light" />
            <span className="text-dark-blue font-medium">{post.focusKeyword}</span>
          </div>

          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        <div className="bg-dark-blue py-16">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Find Your Perfect Property?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Whether you're buying, selling, or renting in Calvi&agrave;, we connect you to the right expert agency in minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/buyers')}
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-dark-blue font-semibold rounded-lg transition-all duration-300 hover:bg-beige hover:-translate-y-0.5"
              >
                Find Your Dream Home
              </button>
              <button
                onClick={() => navigate('/sellers')}
                className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-white font-semibold rounded-lg border-2 border-white/50 transition-all duration-300 hover:bg-white hover:text-dark-blue hover:-translate-y-0.5"
              >
                I'm a Home Owner
              </button>
            </div>
          </div>
        </div>

        <div className="bg-warm-grey py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-black mb-10 text-center">
              Continue Reading
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <div
                  key={r.slug}
                  onClick={() => navigate(`/blog/${r.slug}` as Route)}
                  className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-beige-dark/30 hover:shadow-lg hover:border-dark-blue/20 transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={r.featuredImage}
                      alt={r.featuredImageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="font-heading text-lg font-bold text-black mb-2 group-hover:text-dark-blue transition-colors leading-snug">
                      {r.title}
                    </h4>
                    <span className="inline-flex items-center gap-1.5 text-dark-blue font-semibold text-sm">
                      Read More
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
      <Footer navigate={navigate} />
    </>
  );
}
