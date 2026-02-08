import { usePageMeta } from '../hooks/usePageMeta';
import { blogPosts } from '../data/blogPosts';
import BlogCard from '../components/BlogCard';
import Footer from '../components/Footer';
import type { Route } from '../hooks/useRouter';

interface BlogPageProps {
  navigate: (to: Route) => void;
}

export default function BlogPage({ navigate }: BlogPageProps) {
  usePageMeta({
    title: 'Calvia Real Estate Blog | Property Guides & Market Insights | Mallorca',
    description: 'Expert property guides, market insights, and essential information for buyers and home owners in Calvia, Mallorca. Neighbourhood guides, tax advice, and more.',
    keywords: 'Calvia real estate blog, Mallorca property guides, Calvia market insights, buy sell property Mallorca',
  });

  return (
    <>
      <section className="pt-28 pb-20 md:pt-36 md:pb-28 bg-warm-grey min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-dark-blue font-semibold text-sm tracking-[0.15em] uppercase mb-3">
              Insights &amp; Guides
            </span>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
              Calvia Real Estate Blog
            </h1>
            <p className="text-grey text-lg max-w-2xl mx-auto leading-relaxed">
              Expert tips, market insights, and essential guides for property buyers
              and home owners in Calvi&agrave;, Mallorca.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>
      <Footer navigate={navigate} />
    </>
  );
}
