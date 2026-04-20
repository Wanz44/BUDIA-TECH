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
    <section id="home" className="relative h-screen min-h-[800px] flex items-center overflow-hidden bg-bg-deep text-text-main transition-colors duration-700">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-deep/20 via-bg-deep/50 to-bg-deep z-10" />
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={config.heroBgUrl || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000"}
          alt="Advanced Hardware"
          className="w-full h-full object-cover opacity-30 dark:opacity-60 grayscale dark:grayscale-0"
          referrerPolicy="no-referrer"
        />
        
        {/* Animated Orbits */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-text-main/5 rounded-full animate-[spin_20s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-text-main/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-4xl mx-auto text-center lg:text-left lg:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-10 justify-center lg:justify-start">
              <div className="inline-block border border-text-main/20 px-6 py-2 rounded-full backdrop-blur-md">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-emerald">
                  Édition Limitée • Excellence {config.companyName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent-red animate-pulse shadow-[0_0_10px_#EF4444]" />
                <span className="text-[8px] font-bold uppercase tracking-widest text-text-dim">Système Actif</span>
              </div>
            </div>
            
            <h1 className="text-[12vw] lg:text-[7vw] font-black leading-[0.85] uppercase tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-text-main to-accent-silver">
              {config.companyName.split(' ')[0]} <br />
              <span className="text-transparent font-outline-2 opacity-50 dark:opacity-20 hover:opacity-100 transition-all">
                {config.companyName.split(' ')[1] || 'TECH'}
              </span>
            </h1>
            
            <div className="grid lg:grid-cols-2 gap-12 items-end">
              <div>
                <p className="text-xl text-text-dim font-medium leading-relaxed mb-10 max-w-md">
                  {config.description || "BUDIA TECH redéfinit les standards de l'ingénierie numérique. Nous forgeons l'avenir de votre infrastructure."}
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="bg-accent-emerald text-white dark:text-black hover:bg-accent-blue hover:text-white transition-all duration-500 px-12 h-16 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-2xl shadow-accent-emerald/20">
                    Découvrir la Collection
                    <ArrowRight className="ml-3 w-4 h-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-text-main/20 text-text-main hover:bg-text-main hover:text-bg-deep transition-all duration-500 px-12 h-16 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-xl">
                    Expertises
                  </Button>
                </div>
              </div>
              
              <div className="hidden lg:flex justify-end">
                <div className="text-right space-y-6">
                  <div className="pb-6 border-b border-text-main/10">
                    <span className="block text-4xl font-serif font-light mb-1">Congo</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-text-dim">Hub Technologique Premium</span>
                  </div>
                  <div className="flex justify-end gap-10">
                    <div>
                      <span className="block text-2xl font-bold">500+</span>
                      <span className="text-[8px] uppercase font-bold tracking-widest text-text-dim">Actifs</span>
                    </div>
                    <div>
                      <span className="block text-2xl font-bold">15+</span>
                      <span className="text-[8px] uppercase font-bold tracking-widest text-text-dim">Pays</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Rail Overlay */}
      <div className="absolute bottom-10 left-10 hidden xl:block">
        <span className="writing-vertical-lr rotate-180 text-[10px] font-bold uppercase tracking-[0.5em] text-text-dim">
          SCROLL TO EXPLORE THE FUTURE
        </span>
      </div>
    </section>
  );
};

export default Hero;
