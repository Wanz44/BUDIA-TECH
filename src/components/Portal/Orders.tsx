import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  CheckCircle2, 
  XCircle,
  Clock,
  Truck,
  Loader2,
  ShoppingCart
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
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from '@/lib/supabase';
import { Order } from '@/types';
import { toast } from 'sonner';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const mappedOrders: Order[] = (data || []).map(o => ({
        id: o.id,
        customerName: o.customer_name,
        customerEmail: o.customer_email,
        totalAmount: Number(o.total_amount),
        status: o.status,
        createdAt: o.created_at,
        productIds: [] // Supposons que c'est une relation ou JSON, mais on simplifie ici
      }));
      
      setOrders(mappedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Erreur de chargement des commandes');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
      toast.success(`Statut mis à jour: ${status}`);
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none px-2.5 py-1 rounded-md text-[10px] font-bold">LIVRÉ</Badge>;
      case 'processing': return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none px-2.5 py-1 rounded-md text-[10px] font-bold">EN COURS</Badge>;
      case 'pending': return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-none px-2.5 py-1 rounded-md text-[10px] font-bold">ATTENTE</Badge>;
      case 'shipped': return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-none px-2.5 py-1 rounded-md text-[10px] font-bold">EXPÉDIÉ</Badge>;
      case 'cancelled': return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none px-2.5 py-1 rounded-md text-[10px] font-bold">ANNULÉ</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-[10px] font-bold">{(status as string).toUpperCase()}</Badge>;
    }
  };

  const filteredOrders = orders.filter(o => 
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#202124]">Commandes</h1>
        <p className="text-gray-500 text-xs font-medium mt-1">Suivez les transactions et livraisons de vos clients.</p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Rechercher une commande..."
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
            <p className="text-xs font-medium text-gray-500">Synchronisation des commandes...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center text-gray-400">
            <ShoppingCart className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-xs font-semibold">Aucune commande trouvée</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow className="hover:bg-transparent border-gray-100 h-12">
                <TableHead className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-6">ID</TableHead>
                <TableHead className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Client</TableHead>
                <TableHead className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Date</TableHead>
                <TableHead className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Montant</TableHead>
                <TableHead className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Statut</TableHead>
                <TableHead className="text-right text-[11px] font-bold text-gray-500 uppercase tracking-wider pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-gray-50/50 border-gray-100 h-16 group transition-colors">
                  <TableCell className="pl-6 font-bold text-[#0067c0] text-[11px]">#{order.id.slice(0, 8).toUpperCase()}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-bold text-[#202124]">{order.customerName}</p>
                      <p className="text-[10px] text-gray-500 font-medium">{order.customerEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-medium text-gray-500">
                    {order.createdAt ? format(parseISO(order.createdAt), 'dd MMM yyyy, HH:mm', { locale: fr }) : 'N/A'}
                  </TableCell>
                  <TableCell className="text-sm font-bold text-[#202124]">{order.totalAmount.toLocaleString()} Fc</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md hover:bg-gray-100">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end" className="acrylic border border-white/40 rounded-lg p-1 min-w-[160px]">
                        <DropdownMenuItem className="cursor-pointer hover:bg-white/40 rounded-md px-3 py-2 text-[11px] font-semibold">
                          <Eye className="w-3.5 h-3.5 mr-2 text-gray-500" /> Détails
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'processing')} className="cursor-pointer hover:bg-white/40 rounded-md px-3 py-2 text-[11px] font-semibold">
                          <Clock className="w-3.5 h-3.5 mr-2 text-blue-500" /> En cours
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'shipped')} className="cursor-pointer hover:bg-white/40 rounded-md px-3 py-2 text-[11px] font-semibold">
                          <Truck className="w-3.5 h-3.5 mr-2 text-purple-500" /> Expédier
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'delivered')} className="cursor-pointer text-green-600 hover:bg-green-50/50 rounded-md px-3 py-2 text-[11px] font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-2" /> Livrer
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'cancelled')} className="cursor-pointer text-red-600 hover:bg-red-50/50 rounded-md px-3 py-2 text-[11px] font-semibold">
                          <XCircle className="w-3.5 h-3.5 mr-2" /> Annuler
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

export default Orders;
