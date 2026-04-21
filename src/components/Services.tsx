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
    <section id="services" className="py-32 bg-bg-deep text-text-main relative overflow-hidden transition-colors duration-200">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-4 block">Expertise Technique</span>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Des services conçus pour <span className="text-accent-blue">votre transformation</span>
          </h2>
          <p className="text-lg text-text-dim max-w-2xl leading-relaxed">
            Nous concevons des architectures numériques robustes et élégantes, adaptées aux exigences des leaders de l'industrie.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group glass-card p-10 hover:border-accent-blue/40 transition-all duration-300 flex flex-col h-full"
            >
              <div className="mb-8 p-3 rounded-md bg-accent-blue/5 w-fit group-hover:bg-accent-blue/10 transition-colors">
                <div className="text-accent-blue">
                  {service.icon}
                </div>
              </div>
              <h4 className="text-lg font-bold mb-4 tracking-tight">{service.title}</h4>
              <p className="text-text-dim text-sm leading-relaxed mb-8 font-normal flex-grow">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2 border-t border-border pt-6 mt-auto">
                {service.tags.map((tag, tIndex) => (
                  <span key={tIndex} className="text-[10px] font-semibold uppercase tracking-wider text-accent-blue opacity-80">
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
