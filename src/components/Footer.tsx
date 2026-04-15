import { Link } from 'react-router-dom';
import { Cpu, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass border-t border-glass-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-accent-blue p-2 rounded-lg">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-widest text-accent-blue uppercase font-sans">
                BUDIA <span className="text-accent-emerald font-light">TECH</span>
              </span>
            </Link>
            <p className="text-text-dim text-xs leading-relaxed font-medium">
              L'excellence technologique et le prestige numérique au service de votre vision. Nous forgeons l'avenir de l'infrastructure africaine.
            </p>
            <div className="flex space-x-5">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="bg-accent-emerald/5 p-2.5 rounded-xl border border-accent-emerald/10 text-text-dim hover:text-accent-emerald hover:border-accent-emerald transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-text-main font-serif font-bold uppercase tracking-widest text-[10px] mb-8">Navigation</h3>
            <ul className="space-y-5 text-[10px] font-bold uppercase tracking-widest">
              <li><a href="#home" className="text-text-dim hover:text-accent-emerald transition-colors">Accueil</a></li>
              <li><a href="#about" className="text-text-dim hover:text-accent-emerald transition-colors">À Propos</a></li>
              <li><a href="#services" className="text-text-dim hover:text-accent-emerald transition-colors">Services</a></li>
              <li><a href="#products" className="text-text-dim hover:text-accent-emerald transition-colors">Galerie</a></li>
              <li><a href="#contact" className="text-text-dim hover:text-accent-emerald transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Products & Services */}
          <div>
            <h3 className="text-text-main font-serif font-bold uppercase tracking-widest text-[10px] mb-8">Expertises</h3>
            <ul className="space-y-5 text-[10px] font-bold uppercase tracking-widest">
              <li><span className="text-text-dim hover:text-accent-emerald transition-colors cursor-pointer">Matériel Élite</span></li>
              <li><span className="text-text-dim hover:text-accent-emerald transition-colors cursor-pointer">Sécurité Intelligente</span></li>
              <li><span className="text-text-dim hover:text-accent-emerald transition-colors cursor-pointer">Ingénierie Software</span></li>
              <li><span className="text-text-dim hover:text-accent-emerald transition-colors cursor-pointer">Arts Numériques</span></li>
              <li><span className="text-text-dim hover:text-accent-emerald transition-colors cursor-pointer">Conseil Stratégique</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-text-main font-serif font-bold uppercase tracking-widest text-[10px] mb-8">Contact</h3>
            <ul className="space-y-5 text-[10px] font-bold uppercase tracking-widest">
              <li className="flex items-start space-x-4 text-text-dim">
                <MapPin className="w-5 h-5 text-accent-emerald shrink-0" />
                <span className="leading-relaxed">Avenue Lunvungi, Commune de Kinshasa, Réf : Rond-point Huilerie</span>
              </li>
              <li className="flex items-center space-x-4 text-text-dim">
                <Phone className="w-5 h-5 text-accent-emerald shrink-0" />
                <span>+243 891 229 546</span>
              </li>
              <li className="flex items-center space-x-4 text-text-dim">
                <Mail className="w-5 h-5 text-accent-emerald shrink-0" />
                <span>ngoyikalembue.77.com@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-glass-border pt-10 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p className="text-[9px] font-bold text-text-dim uppercase tracking-widest">
            © {new Date().getFullYear()} BUDIA TECH. Excellence & Innovation.
          </p>
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
              <span className="text-[9px] font-bold text-text-dim uppercase tracking-widest">Systèmes Opérationnels</span>
            </div>
            <a href="#" className="text-text-dim hover:text-text-main text-[9px] font-bold uppercase tracking-widest transition-colors">Mentions Légales</a>
            <a href="#" className="text-text-dim hover:text-text-main text-[9px] font-bold uppercase tracking-widest transition-colors">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
