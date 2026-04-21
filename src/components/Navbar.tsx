import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Cpu, Settings, Sun, Moon, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockDb } from '@/lib/mockDb';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [config, setConfig] = useState<any>({
    companyName: 'BUDIA TECH',
    logoUrl: ''
  });

  useEffect(() => {
    const fetchConfig = () => {
      const saved = mockDb.getAll('siteConfig').find((c: any) => c.id === 'branding');
      if (saved) setConfig(saved);
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
    { name: 'Galerie', href: '#products' },
    { name: 'Contact', href: '#contact' },
  ];

  const brandParts = config.companyName.split(' ');
  const brandMain = brandParts[0] || 'BUDIA';
  const brandSub = brandParts.slice(1).join(' ') || 'TECH';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-[#201f1e]/90 backdrop-blur-md border-b border-border py-2 shadow-sm' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="group flex items-center gap-3">
            {config.logoUrl ? (
              <img src={config.logoUrl} alt="Logo" className="h-8 w-auto object-contain" referrerPolicy="no-referrer" />
            ) : (
              <div className="bg-accent-blue p-1.5 rounded-sm text-white hidden sm:block">
                <Cpu className="w-5 h-5" />
              </div>
            )}
            <span className="text-xl font-bold tracking-tight text-text-main">
              {brandMain}<span className="text-accent-blue">{brandSub}</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold text-text-dim hover:text-accent-blue transition-colors relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent-blue transition-all group-hover:w-full" />
              </a>
            ))}
            
            <div className="flex items-center space-x-4 pl-8 border-l border-border transition-colors duration-300">
              <Link to="/portal" title="Portail Client">
                <Button className="h-10 px-6 rounded-md bg-accent-blue text-white hover:bg-accent-blue/90 text-xs font-bold transition-all shadow-sm">
                  Connexion
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-bg-deep/95 backdrop-blur-2xl z-50 flex flex-col p-8 lg:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-2xl font-black tracking-tighter uppercase text-text-main">
                BUDIA <span className="text-accent-blue">TECH</span>
              </span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-text-main bg-text-main/5 p-4 rounded-full hover:bg-accent-blue hover:text-white transition-all transform hover:rotate-90 duration-500"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, type: 'spring', damping: 20 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center justify-between py-4 border-b border-text-main/5"
                >
                  <span className="text-4xl font-black uppercase tracking-tighter text-text-main group-hover:text-accent-blue transition-colors">
                    {link.name}
                  </span>
                  <div className="w-4 h-4 rounded-full border-2 border-accent-blue opacity-0 group-hover:opacity-100 transition-all transform scale-0 group-hover:scale-100" />
                </motion.a>
              ))}
            </div>
            
            <div className="mt-auto pt-10 border-t border-text-main/10">
               <div className="flex items-center justify-between mb-8 px-4 text-text-dim">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Écosystème Digital</span>
               </div>
               <Link to="/portal" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-accent-blue text-white hover:bg-accent-emerald hover:text-black h-24 rounded-[2.5rem] transition-all shadow-[0_20px_40px_rgba(59,130,246,0.2)] flex items-center justify-center group">
                    <Lock className="w-10 h-10 group-hover:scale-110 transition-transform" />
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
