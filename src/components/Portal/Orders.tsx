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
import { mockDb } from '@/lib/mockDb';
import { Order } from '@/types';
import { toast } from 'sonner';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Initial load
    const data = mockDb.getAll('orders');
    if (data.length === 0) {
      // Seed with some initial data if empty
      const initialOrders = [
        { id: 'ORD-001', customerName: 'Jean Dupont', customerEmail: 'jean@dupont.com', totalAmount: 3500000, status: 'delivered', createdAt: new Date(Date.now() - 7200000).toISOString() },
        { id: 'ORD-002', customerName: 'Marie Curie', customerEmail: 'marie@curie.fr', totalAmount: 1200000, status: 'processing', createdAt: new Date(Date.now() - 18000000).toISOString() }
      ];
      mockDb.collection('orders').set(initialOrders);
      setOrders(initialOrders);
    } else {
      setOrders(data);
    }
    setLoading(false);
  }, []);

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    try {
      mockDb.update('orders', id, { status });
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
      toast.success(`Statut mis à jour: ${status}`);
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20 uppercase text-[8px] font-bold tracking-widest px-3 py-1 rounded-lg">Livré</Badge>;
      case 'processing': return <Badge className="bg-accent-emerald/10 text-accent-emerald hover:bg-accent-emerald/20 border-accent-emerald/20 uppercase text-[8px] font-bold tracking-widest px-3 py-1 rounded-lg">En cours</Badge>;
      case 'pending': return <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20 uppercase text-[8px] font-bold tracking-widest px-3 py-1 rounded-lg">Attente</Badge>;
      case 'shipped': return <Badge className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-purple-500/20 uppercase text-[8px] font-bold tracking-widest px-3 py-1 rounded-lg">Expédié</Badge>;
      case 'cancelled': return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20 uppercase text-[8px] font-bold tracking-widest px-3 py-1 rounded-lg">Annulé</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const filteredOrders = orders.filter(o => 
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-serif font-bold text-text-main tracking-tight">Flux de Commandes</h1>
        <p className="text-text-dim text-[10px] uppercase tracking-widest font-bold mt-2">Suivez et gérez les acquisitions de vos clients en temps réel.</p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
          <Input
            placeholder="Rechercher une acquisition (Nom ou ID)..."
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
            <p className="uppercase text-[10px] font-bold tracking-widest">Synchronisation des commandes...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center text-text-dim">
            <ShoppingCart className="w-16 h-16 mb-6 opacity-10" />
            <p className="uppercase text-[10px] font-bold tracking-widest">Aucune commande trouvée</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-accent-emerald/5">
              <TableRow className="hover:bg-transparent border-glass-border h-16">
                <TableHead className="font-bold text-accent-emerald uppercase text-[9px] tracking-widest pl-10">ID Commande</TableHead>
                <TableHead className="font-bold text-accent-emerald uppercase text-[9px] tracking-widest">Client</TableHead>
                <TableHead className="font-bold text-accent-emerald uppercase text-[9px] tracking-widest">Date</TableHead>
                <TableHead className="font-bold text-accent-emerald uppercase text-[9px] tracking-widest">Montant</TableHead>
                <TableHead className="font-bold text-accent-emerald uppercase text-[9px] tracking-widest">Statut</TableHead>
                <TableHead className="text-right font-bold text-accent-emerald uppercase text-[9px] tracking-widest pr-10">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-secondary/50 border-border transition-colors h-24">
                  <TableCell className="font-bold text-accent-emerald uppercase text-[9px] tracking-widest pl-10">#{order.id.slice(0, 8).toUpperCase()}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-bold text-text-main">{order.customerName}</p>
                      <p className="text-[9px] text-text-dim uppercase tracking-widest font-bold mt-1">{order.customerEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-text-dim text-xs font-bold uppercase tracking-widest">
                    {order.createdAt ? format(parseISO(order.createdAt), 'dd MMM yyyy, HH:mm', { locale: fr }) : 'N/A'}
                  </TableCell>
                  <TableCell className="font-bold text-text-main">{order.totalAmount.toLocaleString()} Fc</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right pr-10">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" size="icon" className="rounded-xl hover:bg-secondary/50 text-text-dim h-10 w-10">
                            <MoreVertical className="w-5 h-5" />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end" className="glass border-glass-border text-text-main rounded-2xl p-2 min-w-[180px]">
                        <DropdownMenuItem className="cursor-pointer hover:bg-white/10 rounded-xl px-4 py-3 uppercase text-[9px] font-bold tracking-widest">
                          <Eye className="w-4 h-4 mr-3 text-accent-emerald" /> Détails
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'processing')} className="cursor-pointer hover:bg-white/10 rounded-xl px-4 py-3 uppercase text-[9px] font-bold tracking-widest">
                          <Clock className="w-4 h-4 mr-3 text-accent-emerald" /> En cours
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'shipped')} className="cursor-pointer hover:bg-white/10 rounded-xl px-4 py-3 uppercase text-[9px] font-bold tracking-widest">
                          <Truck className="w-4 h-4 mr-3 text-accent-emerald" /> Expédier
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'delivered')} className="cursor-pointer text-green-500 focus:text-green-500 hover:bg-green-500/10 rounded-xl px-4 py-3 uppercase text-[9px] font-bold tracking-widest">
                          <CheckCircle2 className="w-4 h-4 mr-3" /> Livrer
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'cancelled')} className="cursor-pointer text-red-500 focus:text-red-500 hover:bg-red-500/10 rounded-xl px-4 py-3 uppercase text-[9px] font-bold tracking-widest">
                          <XCircle className="w-4 h-4 mr-3" /> Annuler
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
