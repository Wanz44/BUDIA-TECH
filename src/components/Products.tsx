import { motion } from 'motion/react';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Products = () => {
  const products = [
    {
      id: '1',
      name: 'MacBook Pro M3 Max',
      category: 'Ordinateurs',
      price: 3499,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600',
      badge: 'Elite'
    },
    {
      id: '2',
      name: 'Système Vidéo 8K',
      category: 'Sécurité',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&q=80&w=600',
      badge: 'Premium'
    },
    {
      id: '3',
      name: 'Station de Travail Pro',
      category: 'Ordinateurs',
      price: 4599,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=600',
      badge: 'Sur Mesure'
    },
    {
      id: '4',
      name: 'iPad Pro OLED',
      category: 'Tablettes',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600',
      badge: 'Elite'
    }
  ];

  return (
    <section id="products" className="py-40 bg-bg-deep dark:bg-card/50 transition-colors duration-700">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 mb-32 items-end">
          <div className="lg:col-span-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent-emerald mb-4 block">Collection Privée</span>
            <h2 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-text-main">
              Objets de <br />
              <span className="text-text-dim italic font-serif font-light lowercase opacity-30">Désir</span> Technique
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <p className="text-text-dim text-sm max-w-sm ml-auto mb-8 font-medium">
              Une sélection rigoureuse des fleurons de l'industrie, conçue pour ceux qui ne font aucun compromis entre performance et esthétique.
            </p>
            <Button variant="ghost" className="group text-[10px] font-bold uppercase tracking-widest p-0 h-auto hover:bg-transparent text-accent-blue hover:text-accent-emerald transition-colors">
              Explorer le catalogue complet
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-2">→</span>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative mb-10 overflow-hidden bg-secondary rounded-[2.5rem] transition-colors shadow-lg hover:shadow-2xl">
                <div className="absolute top-8 left-8 z-10 flex gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-text-main text-bg-deep rounded-full transition-colors">
                    {product.badge}
                  </span>
                  {index === 0 && (
                    <span className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-accent-red text-white rounded-full animate-pulse shadow-[0_0_10px_#EF4444]">
                      Hot
                    </span>
                  )}
                </div>
                
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-[4/5] object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 dark:opacity-80 dark:group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-accent-blue/10 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[2px]">
                   <Button className="bg-text-main text-bg-deep hover:bg-accent-emerald hover:text-white rounded-full px-8 h-14 text-[10px] font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl">
                     Acquérir maintenant
                   </Button>
                </div>
              </div>

              <div className="flex justify-between items-start border-b border-text-main/5 pb-8">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-text-dim mb-2 block">{product.category}</span>
                  <h3 className="text-2xl font-serif font-bold tracking-tight text-text-main group-hover:text-accent-blue transition-colors">{product.name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-text-main">{product.price.toLocaleString()} Fc</span>
                  <div className="flex items-center justify-end mt-1 text-accent-emerald">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    <span className="text-[10px] font-bold ml-1 text-text-main">5.0</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
