import { motion } from 'motion/react';
import { Globe, Smartphone, Monitor, Camera, Code, Layout, ArrowUpRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Globe className="w-8 h-8 text-accent-emerald" />,
      title: "Ingénierie Web",
      description: "Architectures robustes, e-commerce haut de gamme et plateformes de gestion en temps réel.",
      tags: ["Next.js", "Cloud", "Real-time"]
    },
    {
      icon: <Smartphone className="w-8 h-8 text-accent-emerald" />,
      title: "Écosystème Mobile",
      description: "Expériences natives d'exception pour iOS et Android, centrées sur l'utilisateur.",
      tags: ["Native", "Performance"]
    },
    {
      icon: <Monitor className="w-8 h-8 text-accent-emerald" />,
      title: "Solutions Desktop",
      description: "Logiciels métier haute performance pour une productivité sans compromis.",
      tags: ["Enterprise", "Security"]
    },
    {
      icon: <Camera className="w-8 h-8 text-accent-emerald" />,
      title: "Arts Audiovisuels",
      description: "Production cinématographique, post-production et streaming 8K professionnel.",
      tags: ["8K", "Production"]
    },
    {
      icon: <Layout className="w-8 h-8 text-accent-emerald" />,
      title: "Design de Prestige",
      description: "Conception d'interfaces raffinées et parcours utilisateurs mémorables.",
      tags: ["Modern UI", "UX Strategy"]
    },
    {
      icon: <Code className="w-8 h-8 text-accent-emerald" />,
      title: "Stratégie IT",
      description: "Audit de sécurité, conseil en infrastructure et transformation digitale d'élite.",
      tags: ["Cybersecurity", "Consulting"]
    }
  ];

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-accent-emerald font-bold tracking-widest uppercase text-[10px] mb-6">Expertises BUDIA</h2>
          <h3 className="text-4xl lg:text-5xl font-serif font-bold text-text-main mb-8 leading-tight">L'Art de la Solution Numérique</h3>
          <p className="text-text-dim font-medium leading-relaxed">
            Nous fusionnons créativité artistique et rigueur technique pour forger les outils de votre succès.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="glass p-10 rounded-[2.5rem] border-glass-border hover:border-accent-emerald transition-all duration-500 group h-full flex flex-col">
                <div className="flex justify-between items-start mb-10">
                  <div className="bg-accent-emerald/10 p-5 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                    {service.icon}
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-text-dim group-hover:text-accent-emerald transition-colors duration-300" />
                </div>
                <h4 className="text-[11px] font-bold text-text-main mb-6 uppercase tracking-widest">{service.title}</h4>
                <p className="text-text-dim text-xs leading-relaxed mb-10 font-medium flex-1">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {service.tags.map((tag, tIndex) => (
                    <span key={tIndex} className="text-[8px] font-bold uppercase tracking-widest text-accent-emerald bg-accent-emerald/5 px-3 py-1.5 rounded-lg border border-accent-emerald/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
