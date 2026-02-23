import { ArrowRight, Clock } from 'lucide-react';
import Hero from '../components/Hero';
import MarketTrends from '../components/MarketTrends';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { blogPosts } from '../data/blogPosts';
import { homeFaqs } from '../data/homeFaqs';
import type { Route } from '../hooks/useRouter';

interface HomePageProps {
  navigate: (to: Route) => void;
}

export default function HomePage({ navigate }: HomePageProps) {
  const { ref: blogRef, isVisible: blogVisible } = useScrollReveal(0.05);
  const featured = blogPosts.slice(0, 3);

  return (
    <>
      <Hero navigate={navigate} />
      <MarketTrends />

      <section className="py-14 sm:py-20 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-block text-dark-blue font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase mb-3">
              Latest Insights
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
              Expert Guides for Buyers &amp; Home Owners
            </h2>
            <p className="text-grey text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              In-depth articles on Calvi&agrave; real estate, from tax benefits and immigration
              to neighbourhood guides and investment tips.
            </p>
          </div>

          <div
            ref={blogRef}
            className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 transition-all duration-700 ${
              blogVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {featured.map((post) => (
              <div
                key={post.slug}
                onClick={() => navigate(`/blog/${post.slug}` as Route)}
                className="group cursor-pointer bg-warm-grey rounded-xl overflow-hidden border border-beige-dark/30 hover:shadow-xl hover:shadow-black/8 hover:border-dark-blue/20 transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.featuredImageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 text-xs text-grey-light mb-2 sm:mb-3">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-black mb-2 group-hover:text-dark-blue transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-grey text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-dark-blue font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-dark-blue/5 text-dark-blue font-semibold rounded-lg hover:bg-dark-blue hover:text-white transition-all duration-300"
            >
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our property matching service in Calvia."
        faqs={homeFaqs}
        schemaId="home"
      />

      <section className="py-14 sm:py-20 md:py-24 bg-beige">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-grey text-base sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
            Whether you are looking to buy, sell, or rent property in Calvi&agrave;,
            we connect you to the right expert in minutes &mdash; not weeks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate('/buyers')}
              className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-dark-blue text-white font-semibold rounded-lg text-base sm:text-lg transition-all duration-300 hover:bg-dark-blue-light hover:shadow-[0_0_30px_rgba(0,31,63,0.3)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Find Your Dream Home
            </button>
            <button
              onClick={() => navigate('/sellers')}
              className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-dark-blue font-semibold rounded-lg text-base sm:text-lg border-2 border-dark-blue transition-all duration-300 hover:bg-dark-blue hover:text-white hover:shadow-[0_0_30px_rgba(0,31,63,0.3)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              I'm a Home Owner
            </button>
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </>
  );
}
