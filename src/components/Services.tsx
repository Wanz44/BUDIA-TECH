import { motion } from 'motion/react';
import { Globe, Smartphone, Monitor, Camera, Code, Layout, ArrowUpRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Globe className="w-8 h-8 text-accent-blue" />,
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
      icon: <Monitor className="w-8 h-8 text-accent-blue" />,
      title: "Solutions Desktop",
      description: "Logiciels métier haute performance pour une productivité sans compromis.",
      tags: ["Enterprise", "Security"]
    },
    {
      icon: <Camera className="w-8 h-8 text-accent-silver" />,
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
      icon: <Code className="w-8 h-8 text-accent-blue" />,
      title: "Stratégie IT",
      description: "Audit de sécurité, conseil en infrastructure et transformation digitale d'élite.",
      tags: ["Cybersecurity", "Consulting"]
    }
  ];

  return (
    <section id="services" className="py-40 bg-bg-deep text-text-main relative overflow-hidden transition-colors duration-700">
      {/* Absolute grid background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, var(--color-accent-blue) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-32 gap-12">
          <div className="max-w-3xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent-emerald mb-4 block">Ingénierie & Transformation</span>
            <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              Architectures de <br />
              <span className="text-text-dim/20 italic font-serif font-light lowercase">Haute Précision</span>
            </h2>
          </div>
          <div className="lg:text-right">
            <p className="text-text-dim text-sm max-w-sm ml-auto mb-6 font-medium">
              Nous concevons des écosystèmes numériques où chaque ligne de code est une intention vers l'excellence.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-text-main/5 border border-text-main/5">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="group bg-bg-deep p-12 hover:bg-secondary/50 transition-all duration-700 relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="mb-12 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700">
                  {service.icon}
                </div>
                <h4 className="text-[12px] font-bold mb-6 uppercase tracking-[0.2em] group-hover:text-accent-blue transition-colors">{service.title}</h4>
                <p className="text-text-dim group-hover:text-text-main text-xs leading-relaxed mb-12 font-medium transition-colors duration-500">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, tIndex) => (
                    <span key={tIndex} className="text-[7px] font-bold uppercase tracking-widest text-text-dim border border-text-main/10 px-3 py-1.5 rounded-sm group-hover:border-accent-blue/30 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-text-main/5 group-hover:border-accent-blue transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
