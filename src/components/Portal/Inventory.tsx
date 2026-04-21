import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Package,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockDb } from '@/lib/mockDb';
import { Product } from '@/types';
import { toast } from 'sonner';

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Initial load
    const data = mockDb.getAll('products');
    if (data.length === 0) {
      // Seed with some initial data if empty
      const initialProducts = [
        { id: '1', name: 'MacBook Pro M3 Max', description: 'Le summum de la puissance Apple', price: 3500000, stock: 5, category: 'Ordinateurs', imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=200', createdAt: new Date().toISOString() },
        { id: '2', name: 'iPhone 15 Pro', description: 'Titane de qualité spatiale', price: 1200000, stock: 12, category: 'Mobiles', imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=200', createdAt: new Date().toISOString() }
      ];
      mockDb.collection('products').set(initialProducts);
      setProducts(initialProducts);
    } else {
      setProducts(data);
    }
    setLoading(false);
  }, []);

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      const newProduct = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price: Number(formData.get('price')),
        stock: Number(formData.get('stock')),
        category: formData.get('category') as string,
        imageUrl: (formData.get('imageUrl') as string) || 'https://images.unsplash.com/photo-1588702547319-f0009307f154?auto=format&fit=crop&q=80&w=200',
      };
      
      const addedProduct = mockDb.add('products', newProduct);
      setProducts(prev => [addedProduct, ...prev]);
      
      toast.success('Produit ajouté avec succès');
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Erreur lors de l\'ajout du produit');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        mockDb.delete('products', id);
        setProducts(prev => prev.filter(p => p.id !== id));
        toast.success('Produit supprimé');
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#202124]">Inventaire</h1>
          <p className="text-gray-500 text-xs font-medium mt-1">Gérez vos stocks et produits en temps réel.</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger
            render={
              <Button className="win-btn-primary flex items-center justify-center gap-2 h-10 px-6">
                <Plus className="w-4 h-4" />
                <span>Nouveau Produit</span>
              </Button>
            }
          />
          <DialogContent className="sm:max-w-[500px] acrylic border border-white/40 rounded-xl text-[#202124] p-8 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-[#202124]">Ajouter un produit</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddProduct} className="space-y-4 pt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-[11px] font-semibold text-gray-500 ml-0.5">Désignation</Label>
                  <Input id="name" name="name" required className="win-btn-secondary bg-white/50 h-9" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="category" className="text-[11px] font-semibold text-gray-500 ml-0.5">Catégorie</Label>
                  <Input id="category" name="category" required className="win-btn-secondary bg-white/50 h-9" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="price" className="text-[11px] font-semibold text-gray-500 ml-0.5">Prix (Fc)</Label>
                  <Input id="price" name="price" type="number" step="0.01" required className="win-btn-secondary bg-white/50 h-9" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="stock" className="text-[11px] font-semibold text-gray-500 ml-0.5">Stock</Label>
                  <Input id="stock" name="stock" type="number" required className="win-btn-secondary bg-white/50 h-9" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="imageUrl" className="text-[11px] font-semibold text-gray-500 ml-0.5">Image URL</Label>
                <Input id="imageUrl" name="imageUrl" className="win-btn-secondary bg-white/50 h-9" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="description" className="text-[11px] font-semibold text-gray-500 ml-0.5">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  rows={2}
                  className="w-full win-btn-secondary bg-white/50 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#0067c0]"
                />
              </div>
              <Button type="submit" disabled={submitting} className="w-full win-btn-primary h-11 mt-4">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Valider l'ajout
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 win-btn-secondary bg-white/60 h-10 border-gray-200"
          />
        </div>
        <Button className="win-btn-secondary flex items-center justify-center gap-2 h-10 px-6">
          <Filter className="w-4 h-4" />
          <span>Filtres</span>
        </Button>
      </div>

      {/* Table */}
      <div className="win-card overflow-hidden border-none shadow-sm">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#0067c0]" />
            <p className="text-xs font-medium text-gray-500">Chargement des données...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center text-gray-400">
            <Package className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-xs font-semibold">Aucun article trouvé</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow className="hover:bg-transparent border-gray-100 h-12">
                <TableHead className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-6">Produit</TableHead>
                <TableHead className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Catégorie</TableHead>
                <TableHead className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Prix</TableHead>
                <TableHead className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Stock</TableHead>
                <TableHead className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Statut</TableHead>
                <TableHead className="text-right text-[11px] font-bold text-gray-500 uppercase tracking-wider pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-gray-50/50 border-gray-100 h-16 group">
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-bold text-[#202124]">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">{product.category}</span>
                  </TableCell>
                  <TableCell className="text-sm font-bold text-[#202124]">{product.price.toLocaleString()} Fc</TableCell>
                  <TableCell className="text-xs font-semibold text-gray-500">{product.stock} pcs</TableCell>
                  <TableCell>
                    {product.stock > 10 ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none px-2.5 py-1 rounded-md text-[10px] font-bold">DISPONIBLE</Badge>
                    ) : product.stock > 0 ? (
                      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-none px-2.5 py-1 rounded-md text-[10px] font-bold">ALERTE</Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none px-2.5 py-1 rounded-md text-[10px] font-bold">RUPTURE</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md hover:bg-gray-100">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end" className="acrylic border border-white/40 rounded-lg p-1 min-w-[140px]">
                        <DropdownMenuItem className="cursor-pointer hover:bg-white/40 rounded-md px-3 py-2 text-[11px] font-semibold">
                          <Edit2 className="w-3.5 h-3.5 mr-2 text-[#0067c0]" /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer text-red-600 hover:bg-red-50/50 rounded-md px-3 py-2 text-[11px] font-semibold"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-2" /> Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Inventory;
