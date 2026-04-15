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
import { Input } from '@/components/ui/input';
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
import { db } from '@/firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { Product } from '@/types';
import { toast } from 'sonner';

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await addDoc(collection(db, 'products'), {
        name: formData.get('name'),
        description: formData.get('description'),
        price: Number(formData.get('price')),
        stock: Number(formData.get('stock')),
        category: formData.get('category'),
        imageUrl: formData.get('imageUrl') || 'https://images.unsplash.com/photo-1588702547319-f0009307f154?auto=format&fit=crop&q=80&w=200',
        createdAt: serverTimestamp(),
      });
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
        await deleteDoc(doc(db, 'products', id));
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
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-text-main tracking-tight">Inventaire Élite</h1>
          <p className="text-text-dim text-[10px] uppercase tracking-widest font-bold mt-2">Gérez votre catalogue d'exception et suivez les flux de stock.</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-glass text-[10px] font-bold uppercase tracking-widest rounded-xl h-14 px-8">
              <Plus className="w-4 h-4 mr-3" />
              Nouveau Produit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px] glass border-glass-border rounded-[3rem] text-text-main p-10">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif font-bold tracking-tight text-text-main">Ajouter à la Collection</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddProduct} className="space-y-8 pt-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Désignation</Label>
                  <Input id="name" name="name" required placeholder="ex: MacBook Pro M3 Max" className="bg-secondary/50 border-border text-text-main placeholder:text-text-dim/50 rounded-xl h-12 focus:ring-accent-emerald" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="category" className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Catégorie</Label>
                  <Input id="category" name="category" required placeholder="ex: Ordinateurs" className="bg-secondary/50 border-border text-text-main placeholder:text-text-dim/50 rounded-xl h-12 focus:ring-accent-emerald" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="price" className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Prix de Vente (Fc)</Label>
                  <Input id="price" name="price" type="number" step="0.01" required placeholder="0.00" className="bg-secondary/50 border-border text-text-main placeholder:text-text-dim/50 rounded-xl h-12 focus:ring-accent-emerald" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="stock" className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Unités en Stock</Label>
                  <Input id="stock" name="stock" type="number" required placeholder="0" className="bg-secondary/50 border-border text-text-main placeholder:text-text-dim/50 rounded-xl h-12 focus:ring-accent-emerald" />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="imageUrl" className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Lien Visuel (Optionnel)</Label>
                <Input id="imageUrl" name="imageUrl" placeholder="https://..." className="bg-secondary/50 border-border text-text-main placeholder:text-text-dim/50 rounded-xl h-12 focus:ring-accent-emerald" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="description" className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Spécifications</Label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="w-full bg-secondary/50 border border-border rounded-xl p-4 text-sm text-text-main placeholder:text-text-dim/50 focus:outline-none focus:ring-2 focus:ring-accent-emerald transition-all font-medium"
                  placeholder="Détails techniques..."
                />
              </div>
              <Button type="submit" disabled={submitting} className="w-full btn-glass h-14 rounded-xl uppercase font-bold tracking-widest text-[10px]">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Intégrer à l'inventaire
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
          <Input
            placeholder="Rechercher une pièce d'exception..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 bg-secondary/50 border-border text-text-main placeholder:text-text-dim/50 h-14 rounded-2xl focus:ring-accent-emerald font-medium text-xs"
          />
        </div>
        <Button variant="outline" className="rounded-2xl h-14 border-border text-text-dim hover:bg-secondary/50 uppercase text-[10px] font-bold tracking-widest px-8">
          <Filter className="w-4 h-4 mr-3" />
          Filtres Avancés
        </Button>
      </div>

      {/* Table */}
      <div className="glass rounded-[2.5rem] shadow-2xl border border-glass-border overflow-hidden">
        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center text-text-dim">
            <Loader2 className="w-10 h-10 animate-spin mb-6 text-accent-emerald" />
            <p className="uppercase text-[10px] font-bold tracking-widest">Synchronisation de l'inventaire...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center text-text-dim">
            <Package className="w-16 h-16 mb-6 opacity-10" />
            <p className="uppercase text-[10px] font-bold tracking-widest">Aucune pièce trouvée</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-accent-emerald/5">
              <TableRow className="hover:bg-transparent border-glass-border h-16">
                <TableHead className="w-[120px] font-bold text-accent-emerald uppercase text-[9px] tracking-widest pl-10">Visuel</TableHead>
                <TableHead className="font-bold text-accent-emerald uppercase text-[9px] tracking-widest">Désignation</TableHead>
                <TableHead className="font-bold text-accent-emerald uppercase text-[9px] tracking-widest">Catégorie</TableHead>
                <TableHead className="font-bold text-accent-emerald uppercase text-[9px] tracking-widest">Prix Unitaire</TableHead>
                <TableHead className="font-bold text-accent-emerald uppercase text-[9px] tracking-widest">Stock</TableHead>
                <TableHead className="font-bold text-accent-emerald uppercase text-[9px] tracking-widest">Statut</TableHead>
                <TableHead className="text-right font-bold text-accent-emerald uppercase text-[9px] tracking-widest pr-10">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-secondary/50 border-border transition-colors h-24">
                  <TableCell className="pl-10">
                    <div className="w-14 h-14 rounded-2xl bg-secondary/50 overflow-hidden border border-border group cursor-pointer">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-dim/20">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-text-main">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-lg font-bold uppercase text-[8px] tracking-widest border-accent-emerald/20 text-accent-emerald bg-accent-emerald/5 px-3 py-1">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-bold text-text-main">{product.price.toLocaleString()} Fc</TableCell>
                  <TableCell className="font-bold text-text-dim text-xs">{product.stock} unités</TableCell>
                  <TableCell>
                    {product.stock > 10 ? (
                      <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20 uppercase text-[8px] font-bold tracking-widest px-3 py-1 rounded-lg">Disponible</Badge>
                    ) : product.stock > 0 ? (
                      <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20 uppercase text-[8px] font-bold tracking-widest px-3 py-1 rounded-lg">Critique</Badge>
                    ) : (
                      <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20 uppercase text-[8px] font-bold tracking-widest px-3 py-1 rounded-lg">Rupture</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right pr-10">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-secondary/50 text-text-dim h-10 w-10">
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass border-glass-border text-text-main rounded-2xl p-2 min-w-[160px]">
                        <DropdownMenuItem className="cursor-pointer hover:bg-white/10 rounded-xl px-4 py-3 uppercase text-[9px] font-bold tracking-widest">
                          <Edit2 className="w-4 h-4 mr-3 text-accent-emerald" /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer text-red-500 focus:text-red-500 hover:bg-red-500/10 rounded-xl px-4 py-3 uppercase text-[9px] font-bold tracking-widest"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-3" /> Supprimer
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
