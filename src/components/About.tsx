import { motion } from 'motion/react';
import { CheckCircle2, Target, Lightbulb, Users } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Target className="w-6 h-6 text-accent-emerald" />,
      title: "Précision",
      description: "Une sélection rigoureuse pour une qualité sans compromis."
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-accent-emerald" />,
      title: "Innovation",
      description: "L'avant-garde technologique au service de vos ambitions."
    },
    {
      icon: <Users className="w-6 h-6 text-accent-emerald" />,
      title: "Prestige",
      description: "Un accompagnement sur mesure pour une expérience d'exception."
    }
  ];

  return (
    <section id="about" className="py-40 bg-bg-deep relative overflow-hidden transition-colors duration-700">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] rounded-[5rem] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1200"
                alt="Digital Innovation"
                className="w-full h-full object-cover grayscale transition-all duration-1000 hover:grayscale-0 hover:scale-105 opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-accent-blue/10 mix-blend-multiply transition-colors" />
            </div>
            
            {/* Abstract Floating Element */}
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-text-main rounded-full flex flex-col items-center justify-center border-8 border-bg-deep transition-colors shadow-2xl">
               <span className="text-bg-deep text-6xl font-black mb-1">10</span>
               <span className="text-bg-deep/40 text-[9px] font-bold uppercase tracking-[0.3em]">Ans d'Héritage</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent-emerald mb-8 block font-sans">Genèse & Vision</span>
            <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-12">
              L'Équilibre du <br />
              <span className="text-text-dim italic font-serif font-light lowercase opacity-30">Savoir-Faire</span>
            </h2>
            
            <p className="text-lg text-text-dim mb-12 font-medium leading-relaxed italic border-l-4 border-accent-blue/20 pl-8">
              "Dans un monde hanté par l'éphémère, BUDIA TECH s'érige en bastion de la durabilité et de l'élégance technique. Nous forgeons des liens entre l'innovation brute et le raffinement humain."
            </p>

            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent-blue">Curateur de Technologie</span>
                <p className="text-xs text-text-dim leading-relaxed font-medium">Une sélection impitoyable des meilleurs outils de l'industrie globale.</p>
              </div>
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent-emerald">Hub de Créativité</span>
                <p className="text-xs text-text-dim leading-relaxed font-medium">L'alliance du software d'élite et de la production audiovisuelle 8K.</p>
              </div>
            </div>

            <div className="mt-16 flex flex-wrap gap-12 border-t border-text-main/5 pt-16">
               <div className="flex flex-col group">
                  <Target className="w-5 h-5 text-accent-blue mb-4 group-hover:text-accent-red transition-colors" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-main">Précision</span>
               </div>
               <div className="flex flex-col group">
                  <Lightbulb className="w-5 h-5 text-accent-emerald mb-4 group-hover:text-accent-blue transition-colors" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-main">Avant-Garde</span>
               </div>
               <div className="flex flex-col group">
                  <Users className="w-5 h-5 text-accent-silver mb-4 group-hover:text-accent-emerald transition-colors" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-main">Privilège</span>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
