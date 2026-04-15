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
    <section id="products" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-accent-emerald font-bold tracking-widest uppercase text-[10px] mb-6">La Galerie BUDIA</h2>
            <h3 className="text-4xl lg:text-5xl font-serif font-bold text-text-main mb-6 leading-tight">Équipements d'Exception</h3>
            <p className="text-text-dim font-medium leading-relaxed">
              Une collection exclusive d'outils technologiques sélectionnés pour les professionnels les plus exigeants.
            </p>
          </div>
          <Button variant="outline" className="border-glass-border text-text-main hover:bg-glass-bg rounded-xl uppercase text-[10px] font-bold tracking-widest px-8 h-12">Voir toute la collection</Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative glass rounded-[2rem] overflow-hidden mb-6 aspect-[4/5] border-glass-border group-hover:border-accent-emerald transition-all duration-500">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <Badge className="glass bg-white/10 text-text-main backdrop-blur-md border-glass-border shadow-sm uppercase text-[8px] font-bold tracking-widest px-3 py-1">
                    {product.badge}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-accent-blue/0 group-hover:bg-accent-blue/5 transition-colors duration-500" />
                
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <Button size="icon" className="bg-white text-accent-blue hover:bg-accent-emerald hover:text-white rounded-xl shadow-2xl h-12 w-12 transition-all duration-300">
                    <ShoppingCart className="w-5 h-5" />
                  </Button>
                  <Button size="icon" className="bg-white text-accent-blue hover:bg-accent-emerald hover:text-white rounded-xl shadow-2xl h-12 w-12 transition-all duration-300">
                    <Eye className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2 px-4">
                <p className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest">{product.category}</p>
                <h4 className="text-lg font-serif font-bold text-text-main group-hover:text-accent-emerald transition-colors">
                  {product.name}
                </h4>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xl font-bold text-text-main">{product.price.toLocaleString()} Fc</p>
                  <div className="flex items-center text-accent-emerald">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-text-dim text-[10px] ml-1 font-bold">5.0</span>
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
