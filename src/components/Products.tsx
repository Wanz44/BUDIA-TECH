import { motion } from 'motion/react';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Products = ({ searchTerm = '' }: { searchTerm?: string }) => {
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
      name: 'Caméra Surveillance 4K',
      category: 'Sécurité',
      price: 450,
      image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&q=80&w=600',
      badge: 'Premium'
    },
    {
      id: '3',
      name: 'Unité Centrale Gamer i9',
      category: 'Ordinateurs',
      price: 2599,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=600',
      badge: 'Sur Mesure'
    },
    {
      id: '4',
      name: 'Imprimante Laser Pro',
      category: 'Bureautique',
      price: 899,
      image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=600',
      badge: 'Performance'
    },
    {
      id: '5',
      name: 'Câble Réseau Cat7 20m',
      category: 'Réseau',
      price: 45,
      image: 'https://images.unsplash.com/photo-1515243105021-39f282434057?auto=format&fit=crop&q=80&w=600',
      badge: 'Indispensable'
    },
    {
      id: '6',
      name: 'Kit Puces Électroniques',
      category: 'Composants',
      price: 120,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
      badge: 'Technique'
    }
  ];

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="products" className="py-24 bg-surface-container/30 transition-colors duration-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-4 block">Sélection Exclusive</span>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-on-surface">
              Équipements de <span className="text-primary">haute précision</span>
            </h2>
            <p className="text-lg text-text-dim leading-relaxed">
              Une gamme rigoureusement sélectionnée pour répondre aux besoins des professionnels.
            </p>
          </div>
          <Button className="btn-tonal text-xs font-bold uppercase px-8 h-12 shadow-none border-none">
            Voir le catalogue
          </Button>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col h-full"
              >
                <div className="relative mb-8 overflow-hidden bg-white rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-border/50">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="chip bg-white/90 backdrop-blur-sm shadow-sm border-none py-2 px-4 rounded-2xl">
                      {product.badge}
                    </span>
                  </div>
                  
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                     <Button className="btn-primary scale-90 group-hover:scale-100 transition-transform shadow-xl">
                        Détails
                     </Button>
                  </div>
                </div>

                <div className="space-y-2 px-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">{product.category}</span>
                  <h3 className="text-xl font-bold tracking-tight text-on-surface hover:text-primary transition-colors cursor-pointer">{product.name}</h3>
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-2xl font-bold text-on-surface">{product.price.toLocaleString()} Fc</span>
                    <div className="flex items-center text-accent-yellow">
                      <Star className="w-4 h-4 fill-current mr-1" />
                      <span className="text-sm font-bold text-text-dim">5.0</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface/50 rounded-[3rem] border border-dashed border-border">
            <p className="text-xl font-medium text-text-dim italic">Aucun produit ne correspond à votre recherche "{searchTerm}"</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
