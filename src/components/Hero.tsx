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
    <section id="home" className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-bg-deep text-text-main transition-colors duration-200">
      <div className="container mx-auto px-6 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-semibold text-accent-blue tracking-wide uppercase">
                Expertise & Innovation
              </span>
              <div className="h-[1px] w-12 bg-accent-blue/30" />
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight mb-8">
              {config.companyName.split(' ')[0]} <span className="text-accent-blue">{config.companyName.split(' ')[1] || 'TECH'}</span>
            </h1>
            
            <p className="text-xl text-text-dim font-normal leading-relaxed mb-12 max-w-lg">
              {config.description || "Nous redéfinissons les standards de l'ingénierie numérique pour forger l'avenir de votre infrastructure technologique."}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-accent-blue text-white hover:bg-accent-blue/90 px-10 h-14 rounded-md text-sm font-semibold transition-all">
                Démarrer votre projet
              </Button>
              <Button size="lg" variant="outline" className="border-border text-text-main hover:bg-secondary px-10 h-14 rounded-md text-sm font-semibold">
                Nos expertises
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative z-10 glass-card p-1 bg-white dark:bg-[#2b2a29] shadow-2xl rounded-lg overflow-hidden">
              <img
                src={config.heroBgUrl || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000"}
                alt="Technology Visualization"
                className="w-full aspect-[4/3] object-cover rounded-md"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Subtle floating accent card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 glass shadow-xl p-6 rounded-lg max-w-[200px] z-20"
            >
              <Shield className="w-8 h-8 text-accent-emerald mb-3" />
              <h3 className="text-sm font-bold mb-1 uppercase tracking-tighter">Sécurité</h3>
              <p className="text-[11px] text-text-dim font-medium">Standards institutionnels et cryptage avancé.</p>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-6 -right-6 glass shadow-xl p-6 rounded-lg max-w-[200px] z-20"
            >
              <Globe className="w-8 h-8 text-accent-blue mb-3" />
              <h3 className="text-sm font-bold mb-1 uppercase tracking-tighter">Impact</h3>
              <p className="text-[11px] text-text-dim font-medium">Connectivité globale sans frontières.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
