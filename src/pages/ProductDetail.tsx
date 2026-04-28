import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import { 
  ChevronLeft, 
  Star, 
  ShoppingCart, 
  Zap, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  Info,
  Loader2,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        const mappedProduct: Product = {
          id: data.id,
          name: data.name,
          description: data.description,
          price: Number(data.price),
          stock: data.stock,
          category: data.category,
          imageUrl: data.image_url,
          images: data.images || [data.image_url],
          createdAt: data.created_at
        };

        setProduct(mappedProduct);
        setSelectedImage(mappedProduct.imageUrl || mappedProduct.images[0] || '');
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Produit introuvable');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    toast.success(`${quantity} x ${product?.name} ajouté au panier`);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-[#0067c0] mb-4" />
        <p className="text-sm font-medium text-gray-500">Chargement des détails du produit...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-white px-6">
        <div className="text-center">
          <Info className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Produit introuvable</h1>
          <p className="text-gray-500 max-w-md mb-8">Désolé, nous n'avons pas pu trouver le produit que vous recherchez.</p>
          <Link to="/">
            <Button className="win-btn-primary px-8">Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Combine main image and additional images for the gallery
  const allImages = Array.from(new Set([product.imageUrl, ...(product.images || [])])).filter(img => img && img.trim() !== '');

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 selection:bg-[#0067c0]/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-[11px] text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link to="/" className="hover:text-[#0067c0] hover:underline transition-colors uppercase tracking-widest font-bold">ACCUEIL</Link>
          <ArrowRight className="w-3 h-3" />
          <span className="hover:text-[#0067c0] hover:underline transition-colors uppercase tracking-widest font-bold cursor-pointer">{product.category}</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-gray-900 font-bold uppercase tracking-widest truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Image Gallery - Left (column 1-7) */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-6">
            {/* Thumbnails */}
            <div className="order-2 md:order-1 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 scrollbar-hide">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-16 h-16 shrink-0 rounded-md overflow-hidden bg-gray-50 border-2 transition-all ${
                    selectedImage === img ? 'border-[#0067c0] ring-2 ring-[#0067c0]/10' : 'border-gray-100 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="order-1 md:order-2 flex-1 relative aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shadow-sm group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-contain p-8 md:p-12 hover:scale-105 transition-transform duration-700 ease-in-out cursor-zoom-in"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              {/* Zoom badge hint */}
              <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-gray-500 border border-gray-200 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                SURVOLER POUR ZOOMER
              </div>
            </div>
          </div>

          {/* Product Info - Center/Right (column 8-12) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Link to="/" className="text-[11px] font-bold text-[#0067c0] hover:underline uppercase tracking-tighter">BUDIA TECH STORE</Link>
                <div className="h-3 w-[1px] bg-gray-300" />
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < 4 ? 'fill-current' : ''}`} />
                  ))}
                  <span className="text-[10px] text-gray-500 font-bold ml-1.5 mt-0.5">4.2 (128 évaluations)</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase mt-0.5">PRIX ÉLITE</span>
                <span className="text-4xl font-black text-[#0067c0] tracking-tighter">
                  {product.price.toLocaleString()}
                  <span className="text-lg ml-1">Fc</span>
                </span>
              </div>

              <div className="h-[1px] w-full bg-gray-100 mt-6" />
            </div>

            {/* Selection Card (Amazon style) */}
            <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">DISPONIBILITÉ</span>
                  {product.stock > 0 ? (
                    <span className="text-sm font-bold text-green-600">En stock ({product.stock} disponibles)</span>
                  ) : (
                    <span className="text-sm font-bold text-red-600">Actuellement indisponible</span>
                  )}
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                  <span className="text-[10px] font-bold text-gray-600">QTÉ</span>
                  <select 
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="text-xs font-bold focus:outline-none bg-transparent cursor-pointer"
                  >
                    {[...Array(Math.min(10, product.stock || 1))].map((_, i) => (
                      <option key={i+1} value={i+1}>{i+1}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={addToCart}
                  disabled={product.stock === 0}
                  className="win-btn-secondary h-12 flex items-center justify-center gap-2 group transition-all"
                >
                  <ShoppingCart className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-xs font-bold">AJOUTER</span>
                </Button>
                <Button 
                  disabled={product.stock === 0}
                  className="win-btn-primary h-12 flex items-center justify-center gap-2 group transition-all"
                >
                  <Zap className="w-4 h-4 group-hover:scale-110 transition-transform fill-current" />
                  <span className="text-xs font-bold">ACHETER</span>
                </Button>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <Truck className="w-4 h-4 text-[#0067c0]" />
                  <p><span className="font-bold">Livraison Express</span> disponible à Kinshasa</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <RotateCcw className="w-4 h-4 text-[#0067c0]" />
                  <p><span className="font-bold">Retours Gratuits</span> sous 7 jours</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <ShieldCheck className="w-4 h-4 text-[#0067c0]" />
                  <p><span className="font-bold">Garantie BUDIA PRO</span> 1 an incluse</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-2 uppercase tracking-widest">À propos de cet article</h3>
              <div className="prose prose-sm text-gray-600 leading-relaxed max-w-none">
                <p>{product.description}</p>
              </div>
              
              <ul className="space-y-2 mt-4">
                {product.description.split('\n').filter(l => l.trim() !== '').map((line, i) => (
                  <li key={i} className="flex gap-2 text-xs text-gray-600">
                    <span className="text-[#0067c0] font-bold">•</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
