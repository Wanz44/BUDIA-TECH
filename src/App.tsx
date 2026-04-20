import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Home from './pages/Home';
import Portal from './pages/Portal';
import { mockDb } from '@/lib/mockDb';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  const [siteBg, setSiteBg] = useState<any>({ siteBgType: 'grid', customBgUrl: '' });

  useEffect(() => {
    // Database initialization
    mockDb.seed('notifications', [
      { id: '1', title: 'Système BUDIA opérationnel', message: 'Bienvenue dans votre nouvel espace de gestion digital.', type: 'info', read: false, createdAt: new Date().toISOString() },
      { id: '2', title: 'Mise à jour graphique', message: 'Le dashboard supporte désormais les graphiques interactifs.', type: 'success', read: false, createdAt: new Date().toISOString() },
    ]);

    mockDb.seed('orders', [
      { id: '#ORD-9901', customer: 'Elite Corp', total: '15.500', status: 'delivered', createdAt: new Date().toISOString() },
      { id: '#ORD-9902', customer: 'Tech Haven', total: '8.200', status: 'processing', createdAt: new Date().toISOString() },
    ]);

    mockDb.seed('siteConfig', [
      {
        id: 'branding',
        logoUrl: '',
        heroBgUrl: '',
        siteBgType: 'grid', // grid, solid, custom
        customBgUrl: '',
        companyName: 'BUDIA TECH',
        description: 'Elite High-Tech Solutions'
      }
    ]);

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);

    const updateBgConfig = () => {
      const saved = mockDb.getAll('siteConfig').find((c: any) => c.id === 'branding');
      if (saved) setSiteBg(saved);
    };
    updateBgConfig();
    window.addEventListener('siteConfigUpdated', updateBgConfig);
    return () => window.removeEventListener('siteConfigUpdated', updateBgConfig);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

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
    <div style={bgStyles()} className={`min-h-screen transition-colors duration-700 ${siteBg.siteBgType === 'grid' ? 'bg-grid' : ''}`}>
      <Router>
        <Routes>
          <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/portal/*" element={<Portal />} />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </div>
  );
}
