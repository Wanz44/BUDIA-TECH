import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Package, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockDb } from '@/lib/mockDb';
import { format, subDays, isSameDay, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const Dashboard = () => {
  const [salesData, setSalesData] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = () => {
      const allOrders = mockDb.getAll('orders');
      const allCustomers = mockDb.getAll('contacts'); // Assuming contacts are customers
      const allInventory = mockDb.getAll('inventory');
      
      setOrders(allOrders.slice(0, 4));

      // Process sales data for the last 7 days
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = subDays(new Date(), i);
        return {
          date: format(date, 'dd MMM', { locale: fr }),
          rawDate: date,
          sales: 0
        };
      }).reverse();

      allOrders.forEach((order: any) => {
        const orderDate = parseISO(order.createdAt);
        const dayMatch = last7Days.find(d => isSameDay(d.rawDate, orderDate));
        if (dayMatch) {
          // Parse amount like "2.499 Fc" or 2499
          let amount = 0;
          if (typeof order.total === 'string') {
            amount = parseInt(order.total.replace(/[^\d]/g, '')) || 0;
          } else {
            amount = order.total || 0;
          }
          dayMatch.sales += amount;
        }
      });

      setSalesData(last7Days);

      // Update stats
      const totalSales = allOrders.reduce((acc: number, curr: any) => {
        let amount = 0;
        if (typeof curr.total === 'string') {
          amount = parseInt(curr.total.replace(/[^\d]/g, '')) || 0;
        } else {
          amount = curr.total || 0;
        }
        return acc + amount;
      }, 0);

      const criticalStock = allInventory.filter((item: any) => item.quantity <= 5).length;

      setStats([
        { name: 'Ventes Totales', value: `${totalSales.toLocaleString()} Fc`, icon: <TrendingUp className="w-5 h-5" />, trend: '+12.5%', isUp: true },
        { name: 'Nouveaux Clients', value: allCustomers.length.toString(), icon: <Users className="w-5 h-5" />, trend: '+8.2%', isUp: true },
        { name: 'Commandes', value: allOrders.length.toString(), icon: <ShoppingCart className="w-5 h-5" />, trend: '-2.4%', isUp: false },
        { name: 'Stock Critique', value: criticalStock.toString(), icon: <Package className="w-5 h-5" />, trend: 'Attention', isUp: false },
      ]);
    };

    fetchData();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered': return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20 uppercase text-[8px] font-bold tracking-widest px-3 py-1 rounded-lg">Livré</Badge>;
      case 'processing': return <Badge className="bg-accent-emerald/10 text-accent-emerald hover:bg-accent-emerald/20 border-accent-emerald/20 uppercase text-[8px] font-bold tracking-widest px-3 py-1 rounded-lg">En cours</Badge>;
      case 'pending': return <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20 uppercase text-[8px] font-bold tracking-widest px-3 py-1 rounded-lg">Attente</Badge>;
      case 'cancelled': return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20 uppercase text-[8px] font-bold tracking-widest px-3 py-1 rounded-lg">Annulé</Badge>;
      default: return <Badge className="bg-accent-silver/10 text-accent-silver uppercase text-[8px] font-bold tracking-widest px-3 py-1 rounded-lg">{status}</Badge>;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass border-glass-border p-5 rounded-2xl shadow-2xl backdrop-blur-2xl">
          <p className="text-[10px] font-black uppercase tracking-widest text-text-dim mb-2">{label}</p>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent-emerald shadow-[0_0_8px_#10B981]" />
            <p className="text-sm font-bold text-text-main">
              {payload[0].value.toLocaleString()} <span className="text-[10px] text-accent-emerald font-black">FC</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-serif font-bold text-text-main tracking-tight">Tableau de Bord</h1>
        <p className="text-text-dim text-[10px] uppercase tracking-widest font-bold mt-2">Bienvenue dans l'écosystème de gestion BUDIA TECH.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass border-glass-border shadow-xl rounded-[2rem] overflow-hidden group hover:border-accent-emerald transition-all duration-500">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-accent-emerald/10 p-4 rounded-2xl text-accent-emerald border border-accent-emerald/20 group-hover:scale-110 transition-transform duration-500">
                    {stat.icon}
                  </div>
                  <div className={`flex items-center text-[10px] font-bold px-2 py-1 rounded-lg ${stat.isUp ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {stat.trend}
                    {stat.isUp ? <ArrowUpRight className="w-3 h-3 ml-1" /> : <ArrowDownRight className="w-3 h-3 ml-1" />}
                  </div>
                </div>
                <p className="text-text-dim text-[9px] font-bold uppercase tracking-widest mb-2">{stat.name}</p>
                <p className="text-3xl font-bold text-text-main tracking-tight">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Sales Evolution Chart */}
      <Card className="glass border-glass-border shadow-xl rounded-[2.5rem] overflow-hidden">
        <CardHeader className="p-10 pb-0">
          <CardTitle className="text-[11px] font-bold text-text-main uppercase tracking-widest">Évolution des Ventes (7 jours)</CardTitle>
        </CardHeader>
        <CardContent className="p-10 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#64748B', fontWeight: 600 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#64748B', fontWeight: 600 }}
                tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ stroke: 'rgba(16, 185, 129, 0.2)', strokeWidth: 2 }}
              />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#10B981" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorSales)"
                activeDot={{ 
                  r: 6, 
                  stroke: '#10B981', 
                  strokeWidth: 2, 
                  fill: 'white',
                  className: "filter drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 glass border-glass-border shadow-xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between p-10 pb-0">
            <CardTitle className="text-[11px] font-bold text-text-main uppercase tracking-widest">Flux de Commandes Récentes</CardTitle>
            <Button variant="ghost" className="text-accent-emerald text-[9px] font-bold uppercase tracking-widest hover:bg-accent-emerald/10 h-10 px-6 rounded-xl">Tout voir</Button>
          </CardHeader>
          <CardContent className="p-10">
            <div className="space-y-8">
              {orders.length > 0 ? orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center space-x-5">
                    <div className="bg-secondary/50 p-4 rounded-2xl group-hover:bg-accent-emerald/10 border border-border group-hover:border-accent-emerald/20 transition-all duration-300">
                      <ShoppingCart className="w-5 h-5 text-text-dim group-hover:text-accent-emerald" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-main group-hover:text-accent-emerald transition-colors">{order.customer || order.name}</p>
                      <p className="text-[9px] text-text-dim uppercase tracking-widest font-bold mt-1">{order.items ? `${order.items.length} articles` : 'Commande'} • {order.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-text-main mb-2">{order.total} Fc</p>
                    <div className="flex items-center justify-end space-x-3">
                      <span className="text-[9px] text-text-dim font-bold uppercase tracking-widest">
                        {format(parseISO(order.createdAt), 'dd/MM HH:mm')}
                      </span>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-10">
                  <p className="text-text-dim text-xs font-bold uppercase tracking-widest">Aucune commande récente</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="glass border-glass-border shadow-xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="p-10 pb-0">
            <CardTitle className="text-[11px] font-bold text-text-main uppercase tracking-widest">Journal d'Activités</CardTitle>
          </CardHeader>
          <CardContent className="p-10">
            <div className="space-y-10 relative before:absolute before:inset-0 before:left-[13px] before:w-[1px] before:bg-border">
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-7 h-7 bg-accent-emerald/10 border border-accent-emerald/20 rounded-full flex items-center justify-center z-10">
                  <Clock className="w-3.5 h-3.5 text-accent-emerald" />
                </div>
                <p className="text-sm font-bold text-text-main">Nouveau produit ajouté</p>
                <p className="text-xs text-text-dim mt-1 font-medium">MacBook Pro M3 Max a été ajouté à l'inventaire.</p>
                <p className="text-[9px] text-accent-emerald font-bold uppercase tracking-widest mt-2">Il y a 10 min</p>
              </div>
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-7 h-7 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center z-10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                </div>
                <p className="text-sm font-bold text-text-main">Commande expédiée</p>
                <p className="text-xs text-text-dim mt-1 font-medium">La commande #ORD-7280 est en route.</p>
                <p className="text-[9px] text-green-500 font-bold uppercase tracking-widest mt-2">Il y a 45 min</p>
              </div>
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-7 h-7 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center z-10">
                  <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                </div>
                <p className="text-sm font-bold text-text-main">Stock critique</p>
                <p className="text-xs text-text-dim mt-1 font-medium">Seulement 2 unités restantes pour "Système 8K".</p>
                <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest mt-2">Il y a 2h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
