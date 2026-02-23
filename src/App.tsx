import { useState, useEffect } from 'react';
import { useRouter } from './hooks/useRouter';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import BuyerPage from './pages/BuyerPage';
import SellerPage from './pages/SellerPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ThankYou from './components/ThankYou';
import WhatsAppButton from './components/WhatsAppButton';
import CookieBanner from './components/CookieBanner';
import MobileCTA from './components/MobileCTA';
import { trackPageView, trackEvent } from './lib/analytics';

export default function App() {
  const { route, navigate } = useRouter();
  const [refCode, setRefCode] = useState('');
  const [leadType, setLeadType] = useState<'buyer' | 'seller'>('buyer');

  useEffect(() => {
    trackPageView(route);
  }, [route]);

  const handleBuyerComplete = (code: string) => {
    setRefCode(code);
    setLeadType('buyer');
    trackEvent('generate_lead', { lead_type: 'buyer', ref_code: code });
    navigate('/thank-you/buyer');
  };

  const handleSellerComplete = (code: string) => {
    setRefCode(code);
    setLeadType('seller');
    trackEvent('generate_lead', { lead_type: 'seller', ref_code: code });
    navigate('/thank-you/seller');
  };

  const blogSlug = route.startsWith('/blog/') ? route.slice(6) : null;
  const isThankYou = route === '/thank-you' || route === '/thank-you/buyer' || route === '/thank-you/seller';
  const thankYouType = route === '/thank-you/seller' ? 'seller' : route === '/thank-you/buyer' ? 'buyer' : leadType;

  return (
    <div className="font-montserrat">
      <Navigation route={route} navigate={navigate} />
      {route === '/' && <HomePage navigate={navigate} />}
      {route === '/buyers' && <BuyerPage onComplete={handleBuyerComplete} navigate={navigate} />}
      {route === '/sellers' && <SellerPage onComplete={handleSellerComplete} navigate={navigate} />}
      {isThankYou && <ThankYou refCode={refCode} leadType={thankYouType} navigate={navigate} />}
      {route === '/blog' && <BlogPage navigate={navigate} />}
      {blogSlug && <BlogPostPage slug={blogSlug} navigate={navigate} />}
      <WhatsAppButton />
      <MobileCTA navigate={navigate} />
      <CookieBanner />
    </div>
  );
}
