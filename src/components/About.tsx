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
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 glass p-3 rounded-[3rem] border-glass-border overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000"
                alt="African Professional"
                className="rounded-[2.5rem] w-full h-[500px] object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 glass p-10 rounded-3xl shadow-2xl z-20 hidden md:block border-glass-border">
              <p className="text-5xl font-serif font-bold mb-1 text-accent-emerald">10+</p>
              <p className="text-[10px] font-bold text-text-dim uppercase tracking-widest">Années d'Excellence</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-accent-emerald font-bold tracking-widest uppercase text-[10px] mb-6">L'Héritage BUDIA TECH</h2>
            <h3 className="text-4xl lg:text-5xl font-serif font-bold text-text-main mb-8 leading-tight">
              L'Union de l'Humain et de la <span className="text-gradient">Haute Technologie</span>
            </h3>
            <p className="text-text-dim mb-10 leading-relaxed font-medium">
              BUDIA TECH transcende la simple distribution de matériel. Nous sommes les architectes de votre transformation numérique, alliant une vision humaniste à une expertise technique de classe mondiale.
            </p>

            <div className="space-y-5 mb-12">
              {[
                "Curated Selection: Matériel informatique d'élite",
                "Intelligence Artificielle & Surveillance Avancée",
                "Développement Software sur mesure",
                "Production Audiovisuelle Cinématographique"
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <CheckCircle2 className="w-5 h-5 text-accent-emerald" />
                  <span className="text-text-dim font-bold text-[11px] uppercase tracking-widest">{item}</span>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <div key={index} className="glass p-8 rounded-2xl border-glass-border hover:border-accent-emerald transition-colors duration-500">
                  <div className="mb-6">{value.icon}</div>
                  <h4 className="font-bold text-text-main text-[10px] mb-3 uppercase tracking-widest">{value.title}</h4>
                  <p className="text-[9px] text-text-dim leading-relaxed font-medium">{value.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
