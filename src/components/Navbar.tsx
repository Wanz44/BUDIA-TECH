import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Cpu, Settings, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'À Propos', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Galerie', href: '#products' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-bg-deep/80 backdrop-blur-2xl border-b border-text-main/5 py-3 shadow-lg' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="group">
            <span className="text-2xl font-black tracking-tighter uppercase transition-colors duration-500 text-text-main">
              BUDIA <span className="text-accent-blue group-hover:text-accent-emerald transition-colors">TECH</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 text-text-dim hover:text-accent-blue"
              >
                {link.name}
              </a>
            ))}
            
            <div className="flex items-center space-x-6 pl-12 border-l border-text-main/10 transition-colors duration-500">
              <button
                onClick={toggleTheme}
                className="p-2 transition-colors text-text-dim hover:text-text-main"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
              
              <Link to="/portal">
                <Button className="rounded-full px-8 h-12 text-[10px] font-bold uppercase tracking-widest transition-all duration-500 bg-text-main text-bg-deep hover:bg-accent-blue hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  Espace Pro
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              className="p-2 transition-colors text-text-dim hover:text-text-main"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
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
                  <div className="flex gap-4">
                    <button onClick={toggleTheme} className="p-3 bg-text-main/5 rounded-2xl">
                      {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </button>
                  </div>
               </div>
               <Link to="/portal" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-accent-blue text-white hover:bg-accent-emerald hover:text-black h-20 rounded-full text-sm font-bold uppercase tracking-widest transition-all shadow-[0_20px_40px_rgba(59,130,246,0.2)]">
                    Portail Client Elite
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
