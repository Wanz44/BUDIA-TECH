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
    <section id="products" className="py-32 bg-bg-deep dark:bg-[#201f1e] transition-colors duration-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-4 block">Sélection Exclusive</span>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-text-main">
              Équipements de <span className="text-accent-blue">classe mondiale</span>
            </h2>
            <p className="text-lg text-text-dim leading-relaxed">
              Une gamme rigoureusement sélectionnée pour répondre aux besoins des professionnels les plus exigeants.
            </p>
          </div>
          <Button variant="outline" className="border-border text-xs font-bold uppercase tracking-widest px-8 h-12 rounded-md hover:bg-secondary">
            Tout le catalogue
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className="relative mb-6 overflow-hidden bg-secondary rounded-md transition-all shadow-sm group-hover:shadow-md border border-border">
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 bg-accent-blue text-white rounded-sm">
                    {product.badge}
                  </span>
                </div>
                
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                   <Button className="w-full bg-white text-black hover:bg-white/90 rounded-md h-10 text-xs font-bold shadow-lg">
                     Détails du produit
                   </Button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-accent-blue uppercase tracking-wider">{product.category}</span>
                <h3 className="text-lg font-bold tracking-tight text-text-main group-hover:text-accent-blue transition-colors">{product.name}</h3>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xl font-bold text-text-main">{product.price.toLocaleString()} Fc</span>
                  <div className="flex items-center text-accent-blue">
                    <Star className="w-3 h-3 fill-current mr-1" />
                    <span className="text-xs font-bold">5.0</span>
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
