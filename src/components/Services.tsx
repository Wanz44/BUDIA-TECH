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
    <section id="services" className="py-24 bg-surface text-on-surface relative overflow-hidden transition-colors duration-200">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-4 block">Expertise Technique</span>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Des services conçus pour <span className="text-primary">votre ambition</span>
          </h2>
          <p className="text-lg lg:text-xl text-text-dim max-w-2xl leading-relaxed">
            Nous concevons des architectures numériques robustes et élégantes, adaptées aux exigences des leaders.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group md3-card p-10 hover:bg-white transition-all duration-300 flex flex-col h-full hover:border-primary/20"
            >
              <div className="mb-8 p-6 rounded-3xl bg-secondary w-fit group-hover:bg-primary/5 group-hover:scale-110 transition-all duration-500">
                <div className="text-primary">
                  {service.icon}
                </div>
              </div>
              <h4 className="text-xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors">{service.title}</h4>
              <p className="text-text-dim text-sm leading-relaxed mb-10 flex-grow">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-6 border-t border-border/40">
                {service.tags.map((tag, tIndex) => (
                  <span key={tIndex} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
