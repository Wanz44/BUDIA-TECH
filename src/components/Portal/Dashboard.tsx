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
import { supabase } from '@/lib/supabase';
import { format, subDays, isSameDay, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const Dashboard = () => {
  const [salesData, setSalesData] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Parallelly
        const [ordersRes, productsRes, contactsRes] = await Promise.all([
          supabase.from('orders').select('*'),
          supabase.from('products').select('*'),
          supabase.from('contacts').select('*') // Ensure this table exists or fallback
        ]);

        const allOrders = ordersRes.data || [];
        const allProducts = productsRes.data || [];
        const allContacts = contactsRes.data || [];

        setOrders(allOrders.slice(0, 4).map(o => ({
          id: o.id,
          customer: o.customer_name,
          total: Number(o.total_amount).toLocaleString(),
          status: o.status,
          createdAt: o.created_at
        })));

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
          const orderDate = parseISO(order.created_at);
          const dayMatch = last7Days.find(d => isSameDay(d.rawDate, orderDate));
          if (dayMatch) {
            dayMatch.sales += Number(order.total_amount) || 0;
          }
        });

        setSalesData(last7Days);

        // Stats calculation
        const totalSales = allOrders.reduce((acc, curr) => acc + (Number(curr.total_amount) || 0), 0);
        const criticalStock = allProducts.filter((p: any) => p.stock <= 5).length;

        setStats([
          { name: 'Ventes Totales', value: `${totalSales.toLocaleString()} Fc`, icon: <TrendingUp className="w-5 h-5" />, trend: '+12.5%', isUp: true },
          { name: 'Nouveaux Clients', value: allContacts.length.toString(), icon: <Users className="w-5 h-5" />, trend: '+8.2%', isUp: true },
          { name: 'Commandes', value: allOrders.length.toString(), icon: <ShoppingCart className="w-5 h-5" />, trend: '-2.4%', isUp: false },
          { name: 'Stock Critique', value: criticalStock.toString(), icon: <Package className="w-5 h-5" />, trend: 'Attention', isUp: false },
        ]);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered': return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none px-2.5 py-0.5 rounded-full text-[10px] font-semibold">Livré</Badge>;
      case 'processing': return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none px-2.5 py-0.5 rounded-full text-[10px] font-semibold">En cours</Badge>;
      case 'pending': return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-none px-2.5 py-0.5 rounded-full text-[10px] font-semibold">Attente</Badge>;
      case 'cancelled': return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none px-2.5 py-0.5 rounded-full text-[10px] font-semibold">Annulé</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">{status}</Badge>;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="acrylic border border-white/40 p-4 rounded-lg shadow-xl">
          <p className="text-[10px] font-bold text-gray-500 mb-1">{label}</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#0067c0]" />
            <p className="text-sm font-bold text-[#202124]">
              {payload[0].value.toLocaleString()} <span className="text-[10px] text-gray-400 font-bold">FC</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#202124]">Tableau de Bord</h1>
        <p className="text-gray-500 text-xs font-medium mt-1">Surveillez l'activité de votre écosystème technologique.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="win-card border-none shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-[#0067c0]/10 p-2.5 rounded-md text-[#0067c0]">
                    {stat.icon}
                  </div>
                  <div className={`flex items-center text-[10px] font-bold px-2 py-0.5 rounded-sm ${stat.isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {stat.trend}
                  </div>
                </div>
                <p className="text-gray-500 text-[11px] font-semibold mb-1">{stat.name}</p>
                <p className="text-2xl font-bold text-[#202124] tracking-tight">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Sales Evolution Chart */}
      <Card className="win-card border-none">
        <CardHeader className="p-6 pb-2">
          <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-wider">Performance des Ventes</CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0 h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0067c0" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#0067c0" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#6B7280', fontWeight: 500 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#6B7280', fontWeight: 500 }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ stroke: '#0067c0', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#0067c0" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorSales)"
                activeDot={{ 
                  r: 5, 
                  stroke: '#0067c0', 
                  strokeWidth: 2, 
                  fill: 'white'
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="win-card border-none">
          <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
            <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-wider">Flux de Commandes</CardTitle>
            <Button variant="ghost" className="text-[#0067c0] text-[10px] font-bold hover:bg-[#0067c0]/5 h-8 px-4 rounded-md">Tout voir</Button>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {orders.length > 0 ? orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-md hover:bg-black/5 transition-colors cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 group-hover:text-[#0067c0] group-hover:bg-[#0067c0]/10 transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#202124]">{order.customer || order.name}</p>
                    <p className="text-[10px] text-gray-500 font-medium">{order.id} • {format(parseISO(order.createdAt), 'dd MMMM', { locale: fr })}</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1.5">
                  <p className="text-sm font-bold text-[#202124]">{order.total} Fc</p>
                  {getStatusBadge(order.status)}
                </div>
              </div>
            )) : (
              <p className="text-center py-6 text-xs text-gray-400 font-medium">Aucune commande récente</p>
            )}
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="win-card border-none">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-wider">Activités Récentes</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-[11px] before:w-[1px] before:bg-gray-200">
              <div className="relative pl-8">
                <div className="absolute left-0 top-0.5 w-6 h-6 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center z-10 shadow-sm">
                  <Clock className="w-3 h-3 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#202124]">Nouvel article en stock</p>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">MacBook Pro M3 Max a été inventorié.</p>
                  <span className="text-[9px] text-gray-400 font-bold uppercase mt-1 inline-block">10 min</span>
                </div>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-0 top-0.5 w-6 h-6 bg-green-50 border border-green-100 rounded-full flex items-center justify-center z-10 shadow-sm">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#202124]">Expédition confirmée</p>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">Commande #ORD-7280 envoyée au client.</p>
                  <span className="text-[9px] text-gray-400 font-bold uppercase mt-1 inline-block">45 min</span>
                </div>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-0 top-0.5 w-6 h-6 bg-red-50 border border-red-100 rounded-full flex items-center justify-center z-10 shadow-sm">
                  <AlertCircle className="w-3 h-3 text-red-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#202124]">Alerte stock bas</p>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">Stock limité pour "Caméra Surveillance 4K".</p>
                  <span className="text-[9px] text-gray-400 font-bold uppercase mt-1 inline-block">Il y a 2h</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
