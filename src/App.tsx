import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Home from './pages/Home';
import Portal from './pages/Portal';
import ProductDetail from './pages/ProductDetail';
import { supabase } from '@/lib/supabase';
import { CurrencyProvider } from './context/CurrencyContext';

export default function App() {
  const [siteBg, setSiteBg] = useState<any>({ siteBgType: 'grid', customBgUrl: '', companyName: 'BUDIA TECH', description: 'Elite High-Tech Solutions' });

  useEffect(() => {
    const fetchBgConfig = async () => {
      try {
        const { data, error } = await supabase
          .from('site_config')
          .select('*')
          .eq('id', 'branding')
          .single();

        if (data) {
          setSiteBg({
            siteBgType: data.site_bg_type,
            customBgUrl: data.custom_bg_url,
            companyName: data.company_name,
            description: data.description
          });
        }
      } catch (error) {
        console.error('Error fetching site config:', error);
      }
    };

    fetchBgConfig();
    window.addEventListener('siteConfigUpdated', fetchBgConfig);

    const root = window.document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');
    localStorage.setItem('theme', 'light');

    return () => window.removeEventListener('siteConfigUpdated', fetchBgConfig);
  }, []);

  const bgStyles = () => {
    if (siteBg.siteBgType === 'custom' && siteBg.customBgUrl) {
      return {
        backgroundImage: `url(${siteBg.customBgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      };
    }
    return {};
  };

  return (
    <CurrencyProvider>
      <div style={bgStyles()} className={`min-h-screen transition-colors duration-700 ${siteBg.siteBgType === 'grid' ? 'bg-grid' : ''}`}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/portal/*" element={<Portal />} />
          </Routes>
          <Toaster position="top-right" />
        </Router>
      </div>
    </CurrencyProvider>
  );
}
