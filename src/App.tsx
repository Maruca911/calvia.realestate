import { useState } from 'react';
import { useRouter } from './hooks/useRouter';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import BuyerPage from './pages/BuyerPage';
import SellerPage from './pages/SellerPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ThankYou from './components/ThankYou';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  const { route, navigate } = useRouter();
  const [refCode, setRefCode] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const handleComplete = (code: string) => {
    setRefCode(code);
    setShowThankYou(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setShowThankYou(false);
    navigate('/');
  };

  const blogSlug = route.startsWith('/blog/') ? route.slice(6) : null;

  if (showThankYou) {
    return (
      <div className="font-montserrat">
        <Navigation route={route} navigate={navigate} />
        <ThankYou refCode={refCode} onBack={handleBack} />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="font-montserrat">
      <Navigation route={route} navigate={navigate} />
      {route === '/' && <HomePage navigate={navigate} />}
      {route === '/buyers' && <BuyerPage onComplete={handleComplete} navigate={navigate} />}
      {route === '/sellers' && <SellerPage onComplete={handleComplete} navigate={navigate} />}
      {route === '/blog' && <BlogPage navigate={navigate} />}
      {blogSlug && <BlogPostPage slug={blogSlug} navigate={navigate} />}
      <WhatsAppButton />
    </div>
  );
}
