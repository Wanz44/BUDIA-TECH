import { motion } from 'motion/react';
import { ArrowRight, Cpu, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-emerald/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-accent-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 glass border-glass-border text-accent-blue px-4 py-1.5 rounded-full text-[10px] font-bold mb-8 uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald"></span>
              </span>
              <span>L'excellence technologique au service de l'Afrique</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-serif font-black text-text-main leading-[1.1] mb-8 tracking-tight">
              L'Innovation <br />
              <span className="text-gradient">Redéfinie</span>.
            </h1>
            <p className="text-lg text-text-dim mb-12 max-w-lg leading-relaxed font-medium">
              BUDIA TECH fusionne l'élégance et la puissance de la technologie pour propulser votre infrastructure vers de nouveaux sommets.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="btn-glass px-10 h-16 text-[10px] font-bold uppercase tracking-widest rounded-xl">
                Explorer le catalogue
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-glass-border text-text-main hover:bg-glass-bg px-10 h-16 text-[10px] font-bold uppercase tracking-widest rounded-xl backdrop-blur-md">
                Nos expertises
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-glass-border pt-10">
              <div className="flex flex-col">
                <span className="text-3xl font-serif font-bold text-accent-blue">500+</span>
                <span className="text-[9px] text-text-dim uppercase tracking-widest font-bold mt-1">Équipements</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-serif font-bold text-accent-blue">150+</span>
                <span className="text-[9px] text-text-dim uppercase tracking-widest font-bold mt-1">Solutions Web</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-serif font-bold text-accent-blue">99%</span>
                <span className="text-[9px] text-text-dim uppercase tracking-widest font-bold mt-1">Disponibilité</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 glass p-3 rounded-[2.5rem] shadow-2xl border-glass-border overflow-hidden group">
              <div className="absolute inset-0 bg-accent-blue/10 mix-blend-overlay group-hover:bg-accent-emerald/10 transition-colors duration-500" />
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200"
                alt="African Tech Professional"
                className="rounded-[2rem] w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -right-8 glass p-5 rounded-2xl shadow-2xl border-glass-border hidden xl:block"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-accent-emerald/20 p-3 rounded-xl">
                    <Shield className="w-6 h-6 text-accent-emerald" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-text-main uppercase tracking-widest">Prestige & Sécurité</p>
                    <p className="text-[9px] text-text-dim uppercase font-bold">Protection Elite 24/7</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 -left-8 glass p-5 rounded-2xl shadow-2xl border-glass-border hidden xl:block"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-accent-blue/20 p-3 rounded-xl">
                    <Globe className="w-6 h-6 text-accent-blue" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-text-main uppercase tracking-widest">Impact Global</p>
                    <p className="text-[9px] text-text-dim uppercase font-bold">Ingénierie de pointe</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-32 h-32 border-l-2 border-t-2 border-accent-emerald/30 rounded-tl-[3rem]" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 border-r-2 border-b-2 border-accent-blue/30 rounded-br-[3rem]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
