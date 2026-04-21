import { motion } from 'motion/react';
import { Target, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <section id="about" className="py-32 bg-bg-deep relative overflow-hidden transition-colors duration-200">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-video rounded-lg overflow-hidden border border-border shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1200"
                alt="Digital Innovation"
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="absolute -bottom-6 -right-6 p-8 bg-accent-blue text-white rounded-lg shadow-xl max-w-[200px]">
               <span className="block text-4xl font-bold mb-1">10</span>
               <span className="text-[10px] font-semibold uppercase tracking-wider opacity-80">Ans d'Expertise Digitale</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-4 block">Notre Vision</span>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8">
              L'excellence technologique au service de <span className="text-accent-blue">votre réussite</span>
            </h2>
            
            <p className="text-lg text-text-dim mb-10 leading-relaxed font-normal">
              BUDIA TECH s'engage à fournir des solutions durables et performantes. Nous forgeons l'avenir de votre infrastructure en alliant innovation brute et adaptabilité institutionnelle.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-md bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-1">Précision Technique</h3>
                  <p className="text-xs text-text-dim leading-relaxed">Une sélection rigoureuse des meilleurs outils technologiques du marché.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-md bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-1">Innovation Continue</h3>
                  <p className="text-xs text-text-dim leading-relaxed">Une veille permanente pour anticiper les défis de demain.</p>
                </div>
              </div>
            </div>

            <Button variant="link" className="p-0 h-auto text-accent-blue font-bold group flex items-center gap-2">
              En savoir plus sur nos valeurs
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
