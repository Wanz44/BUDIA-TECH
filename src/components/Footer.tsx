import { Link } from 'react-router-dom';
import { Cpu, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-bg-deep dark:bg-[#201f1e] text-text-main pt-24 pb-12 border-t border-border transition-colors duration-200">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-4">
            <span className="text-2xl font-bold tracking-tight mb-6 block">
              BUDIA <span className="text-accent-blue">TECH</span>
            </span>
            <p className="text-text-dim text-sm leading-relaxed mb-8 max-w-sm">
              L'excellence technologique et le prestige numérique au service de votre vision professionnelle. Nous construisons l'infrastructure de demain.
            </p>
            <div className="flex space-x-5">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-text-dim hover:text-accent-blue transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-sm font-bold mb-6 text-text-main">Navigation</h3>
              <ul className="space-y-4 text-sm text-text-dim">
                <li><a href="#home" className="hover:text-accent-blue transition-colors">Accueil</a></li>
                <li><a href="#about" className="hover:text-accent-blue transition-colors">À propos</a></li>
                <li><a href="#services" className="hover:text-accent-blue transition-colors">Services</a></li>
                <li><a href="#products" className="hover:text-accent-blue transition-colors">Galerie</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-6 text-text-main">Société</h3>
              <ul className="space-y-4 text-sm text-text-dim">
                <li><span className="cursor-pointer hover:text-accent-blue transition-colors">Carrières</span></li>
                <li><span className="cursor-pointer hover:text-accent-blue transition-colors">Actualités</span></li>
                <li><span className="cursor-pointer hover:text-accent-blue transition-colors">Partenaires</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-6 text-text-main">Siège</h3>
              <ul className="space-y-4 text-sm text-text-dim">
                <li className="leading-relaxed">Kinshasa, RDC<br/>Huilerie, Lunvungi</li>
                <li>ngoyikalembue.77@gmail.com</li>
                <li>+243 891 229 546</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:row justify-between items-center pt-8 border-t border-border space-y-4 md:space-y-0">
          <p className="text-xs text-text-dim">
            © {new Date().getFullYear()} BUDIA TECH. Tous droits réservés.
          </p>
          <div className="flex items-center space-x-8 text-xs text-text-dim">
              <a href="#" className="hover:text-accent-blue transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-accent-blue transition-colors">Mentions légales</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
