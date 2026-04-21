import { motion } from 'motion/react';
import { ArrowRight, Cpu, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { mockDb } from '@/lib/mockDb';

const Hero = () => {
  const [config, setConfig] = useState<any>({
    companyName: 'BUDIA TECH',
    description: 'L\'Elite Technique',
    heroBgUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000'
  });

  useEffect(() => {
    const fetchConfig = () => {
      const saved = mockDb.getAll('siteConfig').find((c: any) => c.id === 'branding');
      if (saved) setConfig(saved);
    };
    fetchConfig();
    window.addEventListener('siteConfigUpdated', fetchConfig);
    return () => window.removeEventListener('siteConfigUpdated', fetchConfig);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-bg-deep text-on-surface transition-colors duration-200">
      <div className="container mx-auto px-6 relative z-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-widest mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              L'Elite Technique
            </div>
            
            <h1 className="text-5xl lg:text-8xl font-bold leading-[1.1] tracking-tight mb-8 text-on-surface">
              {config.companyName.split(' ')[0]} <span className="text-primary">{config.companyName.split(' ')[1] || 'TECH'}</span>
            </h1>
            
            <p className="text-lg lg:text-2xl text-text-dim font-medium leading-relaxed mb-12 max-w-xl">
              {config.description || "Nous redéfinissons les standards de l'ingénierie numérique pour forger l'avenir de votre infrastructure."}
            </p>
            
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="lg" className="btn-primary h-14 px-10 text-sm shadow-lg shadow-primary/20">
                Démarrer un projet
              </Button>
              <Button size="lg" className="btn-tonal h-14 px-10 text-sm">
                En savoir plus
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 p-4 bg-surface-container rounded-[3rem] overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-700">
              <img
                src={config.heroBgUrl || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000"}
                alt="Technology Visual"
                className="w-full aspect-square object-cover rounded-[2.5rem]"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* MD3 Floating elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 bg-accent p-8 rounded-[2.5rem] shadow-xl z-20 flex flex-col items-center gap-2 max-w-[150px] border-4 border-white"
            >
              <Shield className="w-10 h-10 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-center">Sécurité Totale</span>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-12 -right-12 bg-secondary p-8 rounded-full shadow-xl z-20 flex flex-col items-center gap-2 w-40 h-40 border-4 border-white justify-center"
            >
              <Globe className="w-10 h-10 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-center">Impact Global</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* MD3 Decorative elements */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-accent/30 rounded-full blur-3xl -z-10" />
    </section>
  );
};

export default Hero;
