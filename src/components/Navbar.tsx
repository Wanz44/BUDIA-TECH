import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Cpu, Search, Lock, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { supabase } from '@/lib/supabase';
import { useCurrency } from '@/context/CurrencyContext';

interface NavbarProps {
  onSearch?: (term: string) => void;
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const { currency, setCurrency } = useCurrency();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [config, setConfig] = useState<any>({
    companyName: 'BUDIA TECH',
    logoUrl: 'https://lbgwlghiwpamhthdgukw.supabase.co/storage/v1/object/sign/PANIER/logo%2001.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYjgxM2U3ZC04NmQwLTQ3YTQtYmJiNy1mNWRmODFhYmY0ZTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQQU5JRVIvbG9nbyAwMS5qcGciLCJpYXQiOjE3NzczNDMxNzcsImV4cCI6MjA5MjcwMzE3N30.zZnA9FZDrcDieaUMmshUXcVbWn68gMMCyBXTTAJLUb4'
  });

  useEffect(() => {
    onSearch?.(searchQuery);
  }, [searchQuery, onSearch]);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data, error } = await supabase
          .from('site_config')
          .select('*')
          .eq('id', 'branding')
          .single();

        if (data) {
          setConfig({
            companyName: data.company_name,
            logoUrl: data.logo_url
          });
        }
      } catch (error) {
        console.error('Error fetching navbar config:', error);
      }
    };
    fetchConfig();
    window.addEventListener('siteConfigUpdated', fetchConfig);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('siteConfigUpdated', fetchConfig);
    };
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'À Propos', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Magasin', href: '#products' },
    { name: 'Contact', href: '#contact' },
  ];

  const brandParts = config.companyName.split(' ');
  const brandMain = brandParts[0] || 'BUDIA';
  const brandSub = brandParts.slice(1).join(' ') || 'TECH';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-surface/80 backdrop-blur-xl border-b border-border/40 py-2 shadow-sm' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center bg-surface/40 lg:bg-transparent rounded-full px-4 lg:px-0 py-2 lg:py-0">
          <Link to="/" className="group flex items-center gap-3">
            {config.logoUrl ? (
              <img src={config.logoUrl} alt="Logo" className="h-20 w-auto object-contain" referrerPolicy="no-referrer" />
            ) : (
              <div className="bg-primary p-2 rounded-xl text-white hidden sm:flex items-center justify-center shadow-sm">
                <Cpu className="w-5 h-5" />
              </div>
            )}
            <span className="text-xl font-bold tracking-tight text-on-surface">
              {brandMain}<span className="text-primary">{brandSub}</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-text-dim hover:text-primary hover:bg-primary/5 rounded-full transition-all"
              >
                {link.name}
              </a>
            ))}
            
            {/* Search Bar */}
            <div className={`flex items-center ml-4 transition-all duration-500 overflow-hidden ${isSearchOpen ? 'w-64' : 'w-10'}`}>
              <div className="relative w-full flex items-center">
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 rounded-full hover:bg-primary/5 text-text-dim hover:text-primary transition-all z-10"
                >
                  <Search className="w-5 h-5" />
                </button>
                <Input 
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`absolute left-0 pl-10 h-10 border-border/40 bg-surface/50 rounded-full focus:ring-primary/20 transition-all duration-500 ${isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                />
              </div>
            </div>
            
            <div className="flex items-center ml-2 pl-4 border-l border-border transition-colors duration-300">
              <Link to="/portal" title="Espace Client">
                <Button className="btn-primary w-11 h-11 p-0 rounded-full shadow-none hover:shadow-md flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="transition-colors text-text-main"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-surface shadow-2xl z-50 flex flex-col p-8 lg:hidden rounded-l-[2.5rem] border-l border-border"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-bold tracking-tight text-on-surface">
                BUDIA<span className="text-primary">PRO</span>
              </span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-secondary text-text-main transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex flex-col space-y-2 mb-8">
              <div className="relative px-6 mb-4">
                <Search className="absolute left-10 top-1/2 -translate-y-1/2 w-5 h-5 text-text-dim" />
                <Input 
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 border-border/40 bg-surface/50 rounded-2xl focus:ring-primary/20 text-lg"
                />
              </div>

              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-6 py-4 rounded-2xl text-lg font-medium text-text-main hover:bg-primary/5 hover:text-primary transition-all flex items-center justify-between group"
                >
                  {link.name}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </motion.a>
              ))}
            </div>
            
            <div className="mt-auto">
               <Link to="/portal" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full btn-primary h-16 rounded-3xl flex items-center justify-center shadow-lg shadow-primary/20 group">
                    <Lock className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  </Button>
               </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
