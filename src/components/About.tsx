import { motion } from 'motion/react';
import { Target, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <section id="about" className="py-24 bg-bg-deep relative overflow-hidden transition-colors duration-200">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-video rounded-[3rem] overflow-hidden border-8 border-surface shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1200"
                alt="Digital Innovation"
                className="w-full h-full object-cover transition-all duration-1000 hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="absolute -bottom-10 -right-10 p-12 bg-accent text-primary rounded-[3.5rem] shadow-2xl border-4 border-white hidden sm:block">
               <span className="block text-6xl font-bold mb-2">10</span>
               <span className="text-xs font-black uppercase tracking-widest opacity-80">Années d'Excellence</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-6 block">Notre Vision</span>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8 text-on-surface">
              Le futur de la technologie <span className="text-primary">à votre portée</span>
            </h2>
            
            <p className="text-lg lg:text-xl text-text-dim mb-10 leading-relaxed font-medium">
              Chez BUDIA TECH, nous fusionnons créativité et ingénierie pour créer des solutions qui ne se contentent pas de fonctionner, mais qui inspirent.
            </p>

            <div className="grid sm:grid-cols-2 gap-10 mb-12">
              <div className="flex flex-col gap-4">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Target className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Précision Absolute</h3>
                  <p className="text-sm text-text-dim leading-relaxed">Une rigueur d'exécution héritée des plus hauts standards industriels.</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-accent/50 flex items-center justify-center text-primary">
                  <Lightbulb className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Esprit d'Innovation</h3>
                  <p className="text-sm text-text-dim leading-relaxed">Nous explorons sans cesse de nouveaux horizons pour vous offrir le meilleur.</p>
                </div>
              </div>
            </div>

            <Button className="btn-tonal h-14 px-8 text-sm group">
              Découvrir nos valeurs
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
