import { Link } from 'react-router-dom';
import { Cpu, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-surface-container/20 text-on-surface pt-24 pb-12 border-t border-border transition-colors duration-200">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img 
                src="https://lbgwlghiwpamhthdgukw.supabase.co/storage/v1/object/sign/PANIER/logo%2001.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYjgxM2U3ZC04NmQwLTQ3YTQtYmJiNy1mNWRmODFhYmY0ZTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQQU5JRVIvbG9nbyAwMS5qcGciLCJpYXQiOjE3NzczNDMxNzcsImV4cCI6MjA5MjcwMzE3N30.zZnA9FZDrcDieaUMmshUXcVbWn68gMMCyBXTTAJLUb4" 
                alt="Logo" 
                className="h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="text-2xl font-bold tracking-tight">
                BUDIA <span className="text-primary">TECH</span>
              </span>
            </Link>
            <p className="text-text-dim text-sm leading-relaxed mb-8 max-w-sm">
              L'excellence technologique et le prestige numérique au service de votre vision professionnelle. Nous construisons l'infrastructure de demain.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-text-dim hover:bg-primary hover:text-white transition-all shadow-sm">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-sm font-bold mb-6 text-on-surface uppercase tracking-widest">Navigation</h3>
              <ul className="space-y-4 text-sm text-text-dim">
                <li><a href="#home" className="hover:text-primary transition-colors">Accueil</a></li>
                <li><a href="#about" className="hover:text-primary transition-colors">À propos</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
                <li><a href="#products" className="hover:text-primary transition-colors">Galerie</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-6 text-on-surface uppercase tracking-widest">Société</h3>
              <ul className="space-y-4 text-sm text-text-dim">
                <li><span className="cursor-pointer hover:text-primary transition-colors">Carrières</span></li>
                <li><span className="cursor-pointer hover:text-primary transition-colors">Actualités</span></li>
                <li><span className="cursor-pointer hover:text-primary transition-colors">Partenaires</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-6 text-on-surface uppercase tracking-widest">Siège</h3>
              <ul className="space-y-4 text-sm text-text-dim">
                <li className="leading-relaxed">Kinshasa, RDC<br/>Huilerie, Lunvungi</li>
                <li>ngoyikalembue.77@gmail.com</li>
                <li>+243 891 229 546</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:row justify-between items-center pt-8 border-t border-border/40 space-y-4 md:space-y-0">
          <p className="text-xs text-text-dim font-medium">
            © {new Date().getFullYear()} BUDIA TECH. Tous droits réservés.
          </p>
          <div className="flex items-center space-x-8 text-xs text-text-dim">
              <a href="#" className="hover:text-primary transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-primary transition-colors">Mentions légales</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
