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
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import { toast } from 'sonner';
import { useCurrency } from '@/context/CurrencyContext';

const Inventory = () => {
  const { formatPrice } = useCurrency();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEditProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      let uploadedUrls: string[] = editingProduct.images || [];
      if (selectedFiles.length > 0) {
        const newUrls = await uploadImages(selectedFiles);
        uploadedUrls = newUrls;
      }

      const updatedProduct: any = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price: Number(formData.get('price')),
        stock: Number(formData.get('stock')),
        category: formData.get('category') as string,
        image_url: uploadedUrls.length > 0 ? uploadedUrls[0] : (formData.get('imageUrl') as string),
        images: uploadedUrls
      };
      
      let { error } = await supabase
        .from('products')
        .update(updatedProduct)
        .eq('id', editingProduct.id);

      // Fallback if images column doesn't exist
      if (error && (error.message.includes('column "images" of relation "products" does not exist') || error.code === '42703')) {
        console.warn('Falling back: images column missing during update.');
        const fallbackProduct = { ...updatedProduct };
        delete fallbackProduct.images;
        
        const retry = await supabase
          .from('products')
          .update(fallbackProduct)
          .eq('id', editingProduct.id);
          
        error = retry.error;
        
        if (!error) {
          toast.warning('Mis à jour, mais les images supplémentaires n\'ont pas été enregistrées. Veuillez mettre à jour votre base de données Supabase.');
        }
      }

      if (error) throw error;
      
      fetchProducts();
      toast.success('Produit mis à jour');
      setIsEditDialogOpen(false);
      setEditingProduct(null);
      setSelectedFiles([]);
      setPreviewIndex(0);
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setSubmitting(false);
    }
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setIsEditDialogOpen(true);
    setSelectedFiles([]);
    setPreviewIndex(0);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewIndex, setPreviewIndex] = useState<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 4);
      setSelectedFiles(files);
      setPreviewIndex(0);
    }
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (error) {
        console.error('Storage upload error:', error);
        if (error.message.includes('bucket not found')) {
          toast.error("Le 'bucket' nommé 'products' n'existe pas dans votre compte Supabase Storage. Veuillez le créer avec un accès public.");
        } else {
          toast.error(`Erreur d'upload: ${error.message}`);
        }
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      urls.push(publicUrl);
    }
    return urls;
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const mappedProducts: Product[] = (data || []).map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: Number(p.price),
        stock: p.stock,
        category: p.category,
        imageUrl: p.image_url,
        images: p.images || [],
        createdAt: p.created_at
      }));
      
      setProducts(mappedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Erreur de connexion à Supabase');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      let uploadedUrls: string[] = [];
      if (selectedFiles.length > 0) {
        uploadedUrls = await uploadImages(selectedFiles);
      }

      const newProduct: any = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price: Number(formData.get('price')),
        stock: Number(formData.get('stock')),
        category: formData.get('category') as string,
        image_url: uploadedUrls.length > 0 ? uploadedUrls[0] : (formData.get('imageUrl') as string),
        images: uploadedUrls
      };
      
      let { data, error } = await supabase
        .from('products')
        .insert([newProduct])
        .select();

      // Fallback if images column doesn't exist
      if (error && (error.message.includes('column "images" of relation "products" does not exist') || error.code === '42703')) {
        console.warn('Falling back: images column missing. Please run the SQL schema update.');
        const fallbackProduct = { ...newProduct };
        delete fallbackProduct.images;
        
        const retry = await supabase
          .from('products')
          .insert([fallbackProduct])
          .select();
        
        data = retry.data;
        error = retry.error;
        
        if (!error) {
          toast.warning('Produit ajouté, mais les images supplémentaires n\'ont pas été enregistrées. Veuillez mettre à jour votre base de données Supabase avec le nouveau schéma SQL.');
        }
      }

      if (error) {
        console.error('Supabase error detail:', error);
        throw new Error(error.message || 'Erreur inconnue lors de l\'ajout');
      }
      
      fetchProducts(); // Refresh list
      toast.success('Produit ajouté avec succès');
      setIsAddDialogOpen(false);
      setSelectedFiles([]);
      setPreviewIndex(0);
    } catch (error: any) {
      console.error('Error adding product:', error);
      toast.error(`Erreur: ${error.message || 'Vérifiez votre console'}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
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
                <Label htmlFor="images" className="text-[11px] font-semibold text-gray-500 ml-0.5">Images du produit (Max 4)</Label>
                <div className="flex flex-col gap-2">
                  <Input 
                    id="images" 
                    name="images" 
                    type="file" 
                    accept=".png,.jpeg,.jpg" 
                    multiple 
                    onChange={handleFileChange}
                    className="win-btn-secondary bg-white/50 h-9 p-1 pt-1.5" 
                  />
                  {selectedFiles.length > 0 && (
                    <div className="flex gap-4 mt-2 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                      {/* Gallery Thumbnails */}
                      <div className="flex flex-col gap-2 max-w-[64px]">
                        {selectedFiles.map((file, idx) => (
                          <button 
                            key={idx}
                            type="button"
                            onClick={() => setPreviewIndex(idx)}
                            className={`relative w-12 h-12 border rounded-lg overflow-hidden flex items-center justify-center transition-all ${
                              previewIndex === idx ? 'border-[#0067c0] ring-2 ring-[#0067c0]/10 ring-inset' : 'border-gray-200 opacity-60 hover:opacity-100'
                            }`}
                          >
                            <img 
                              src={URL.createObjectURL(file)} 
                              alt={`Preview ${idx}`} 
                              className="w-full h-full object-cover" 
                            />
                            {previewIndex === idx && (
                              <div className="absolute inset-0 bg-[#0067c0]/5 pointer-events-none" />
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Featured Preview */}
                      <div className="flex-1 aspect-square bg-white border border-gray-200 rounded-xl overflow-hidden flex items-center justify-center relative group">
                        <img 
                          src={URL.createObjectURL(selectedFiles[previewIndex])} 
                          alt="Main Preview" 
                          className="w-full h-full object-contain p-2" 
                        />
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/5 rounded text-[9px] font-bold text-gray-500 uppercase">
                          Apperçu {previewIndex + 1}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="imageUrl" className="text-[11px] font-semibold text-gray-500 ml-0.5">Ou URL de l'image principale</Label>
                <Input id="imageUrl" name="imageUrl" placeholder="https://..." className="win-btn-secondary bg-white/50 h-9" />
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

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px] acrylic border border-white/40 rounded-xl text-[#202124] p-8 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-[#202124]">Modifier le produit</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditProduct} className="space-y-4 pt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="edit-name" className="text-[11px] font-semibold text-gray-500 ml-0.5">Désignation</Label>
                  <Input id="edit-name" name="name" defaultValue={editingProduct?.name} required className="win-btn-secondary bg-white/50 h-9" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="edit-category" className="text-[11px] font-semibold text-gray-500 ml-0.5">Catégorie</Label>
                  <Input id="edit-category" name="category" defaultValue={editingProduct?.category} required className="win-btn-secondary bg-white/50 h-9" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="edit-price" className="text-[11px] font-semibold text-gray-500 ml-0.5">Prix (Fc)</Label>
                  <Input id="edit-price" name="price" type="number" step="0.01" defaultValue={editingProduct?.price} required className="win-btn-secondary bg-white/50 h-9" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="edit-stock" className="text-[11px] font-semibold text-gray-500 ml-0.5">Stock</Label>
                  <Input id="edit-stock" name="stock" type="number" defaultValue={editingProduct?.stock} required className="win-btn-secondary bg-white/50 h-9" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-images" className="text-[11px] font-semibold text-gray-500 ml-0.5">Nouvelles images (Remplace les anciennes, Max 4)</Label>
                <div className="flex flex-col gap-2">
                  <Input 
                    id="edit-images" 
                    name="images" 
                    type="file" 
                    accept=".png,.jpeg,.jpg" 
                    multiple 
                    onChange={handleFileChange}
                    className="win-btn-secondary bg-white/50 h-9 p-1 pt-1.5" 
                  />
                  {selectedFiles.length > 0 ? (
                    <div className="flex gap-4 mt-2 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                      <div className="flex flex-col gap-2 max-w-[64px]">
                        {selectedFiles.map((file, idx) => (
                          <button 
                            key={idx}
                            type="button"
                            onClick={() => setPreviewIndex(idx)}
                            className={`relative w-12 h-12 border rounded-lg overflow-hidden flex items-center justify-center transition-all ${
                              previewIndex === idx ? 'border-[#0067c0] ring-2 ring-[#0067c0]/10 ring-inset' : 'border-gray-200 opacity-60 hover:opacity-100'
                            }`}
                          >
                            <img src={URL.createObjectURL(file)} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                      <div className="flex-1 aspect-square bg-white border border-gray-200 rounded-xl overflow-hidden flex items-center justify-center relative">
                        <img src={URL.createObjectURL(selectedFiles[previewIndex])} alt="Main Preview" className="w-full h-full object-contain p-2" />
                      </div>
                    </div>
                  ) : editingProduct?.images && editingProduct.images.length > 0 ? (
                    <div className="flex gap-2 mt-2">
                      {editingProduct.images.map((url, idx) => (
                        <div key={idx} className="w-10 h-10 border border-gray-200 rounded-md overflow-hidden bg-gray-50">
                          <img src={url} alt={`Existing ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-imageUrl" className="text-[11px] font-semibold text-gray-500 ml-0.5">Ou URL de l'image principale</Label>
                <Input id="edit-imageUrl" name="imageUrl" defaultValue={editingProduct?.imageUrl} placeholder="https://..." className="win-btn-secondary bg-white/50 h-9" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-description" className="text-[11px] font-semibold text-gray-500 ml-0.5">Description</Label>
                <textarea
                  id="edit-description"
                  name="description"
                  rows={2}
                  defaultValue={editingProduct?.description}
                  className="w-full win-btn-secondary bg-white/50 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#0067c0]"
                />
              </div>
              <Button type="submit" disabled={submitting} className="w-full win-btn-primary h-11 mt-4">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Sauvegarder les modifications
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
                      <div className="w-10 h-10 rounded-md bg-gray-50 flex-shrink-0 border border-gray-100 flex items-center justify-center overflow-hidden">
                        {product.imageUrl && product.imageUrl.trim() !== '' ? (
                          <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              (e.target as HTMLImageElement).parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <div className={`fallback-icon ${product.imageUrl && product.imageUrl.trim() !== '' ? 'hidden' : ''} text-gray-300`}>
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      </div>
                      <span className="text-sm font-bold text-[#202124]">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">{product.category}</span>
                  </TableCell>
                  <TableCell className="text-sm font-bold text-[#202124]">{formatPrice(product.price)}</TableCell>
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
                        <DropdownMenuItem 
                          className="cursor-pointer hover:bg-white/40 rounded-md px-3 py-2 text-[11px] font-semibold"
                          onClick={() => openEditDialog(product)}
                        >
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
