import { Link } from 'react-router-dom';
import { Cpu, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-bg-deep text-text-main pt-32 pb-16 transition-colors duration-700">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-32 gap-20">
          <div className="max-w-md">
            <span className="text-4xl font-black tracking-tighter uppercase mb-6 block">
              BUDIA <span className="text-accent-blue hover:text-accent-emerald transition-colors cursor-default">TECH</span>
            </span>
            <p className="text-text-dim text-[11px] leading-loose uppercase tracking-widest font-bold mb-10">
              L'excellence technologique et le prestige numérique au service de votre vision. Nous forgeons l'avenir de l'infrastructure africaine par le biais de l'ingénierie d'élite.
            </p>
            <div className="flex space-x-6">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-text-dim hover:text-accent-blue transition-all hover:scale-110">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-20 gap-y-12">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-main underline underline-offset-8 mb-8 decoration-accent-blue">Navigation</h3>
              <ul className="space-y-4 text-[9px] font-bold uppercase tracking-widest text-text-dim">
                <li><a href="#home" className="hover:text-accent-blue transition-colors">Accueil</a></li>
                <li><a href="#about" className="hover:text-accent-blue transition-colors">L'Héritage</a></li>
                <li><a href="#services" className="hover:text-accent-blue transition-colors">Expertises</a></li>
                <li><a href="#products" className="hover:text-accent-blue transition-colors">Galerie</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-main underline underline-offset-8 mb-8 decoration-accent-emerald">Société</h3>
              <ul className="space-y-4 text-[9px] font-bold uppercase tracking-widest text-text-dim">
                <li><span className="cursor-pointer hover:text-accent-emerald transition-colors">Carrières E-lite</span></li>
                <li><span className="cursor-pointer hover:text-accent-emerald transition-colors">Presse</span></li>
                <li><span className="cursor-pointer hover:text-accent-emerald transition-colors">Partenaires</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-main underline underline-offset-8 mb-8 decoration-text-dim">Siège</h3>
              <ul className="space-y-4 text-[9px] font-bold uppercase tracking-widest text-text-dim">
                <li className="leading-relaxed text-xs text-text-main">Kinshasa, RDC<br/>Huilerie, Lunvungi</li>
                <li className="text-[9px]">ngoyikalembue.77@gmail.com</li>
                <li className="text-[9px]">+243 891 229 546</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-text-main/5 space-y-6 md:space-y-0">
          <p className="text-[9px] font-bold text-text-dim/40 uppercase tracking-[0.5em]">
            © {new Date().getFullYear()} BUDIA TECH • TOUS DROITS RÉSERVÉS
          </p>
          <div className="flex items-center space-x-12">
              <span className="text-[9px] font-bold text-text-dim/40 uppercase tracking-widest">DESIGNED FOR EXCELLENCE</span>
              <div className="flex items-center space-x-2">
                 <div className="w-1.5 h-1.5 bg-accent-red rounded-full animate-pulse shadow-[0_0_8px_#EF4444]" />
                 <span className="text-[8px] font-bold uppercase text-accent-red tracking-widest">Core Status: Secure</span>
              </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
