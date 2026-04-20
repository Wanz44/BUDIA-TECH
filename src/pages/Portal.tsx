import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Settings, 
  Bell, 
  Search,
  Cpu,
  X,
  Info,
  CheckCircle2,
  AlertTriangle,
  Circle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import Dashboard from '@/components/Portal/Dashboard';
import Inventory from '@/components/Portal/Inventory';
import Orders from '@/components/Portal/Orders';
import SettingsView from '@/components/Portal/Settings';
import { mockDb } from '@/lib/mockDb';
import { motion, AnimatePresence } from 'motion/react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const Portal = () => {
  const location = useLocation();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchNotifs = () => {
      setNotifications(mockDb.getAll('notifications'));
    };
    fetchNotifs();
    // Refresh every minute
    const interval = setInterval(fetchNotifs, 60000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    mockDb.set('notifications', updated);
    setNotifications(updated);
  };

  const menuItems = [
    { name: 'Tableau de bord', icon: <LayoutDashboard className="w-5 h-5" />, path: '/portal' },
    { name: 'Inventaire', icon: <Package className="w-5 h-5" />, path: '/portal/inventory' },
    { name: 'Commandes', icon: <ShoppingCart className="w-5 h-5" />, path: '/portal/orders' },
    { name: 'Configuration', icon: <Settings className="w-5 h-5" />, path: '/portal/settings' },
  ];

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <Circle className="w-4 h-4 text-red-500" />;
      default: return <Info className="w-4 h-4 text-accent-blue" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-bg-deep font-sans">
      {/* Header */}
      <header className="h-20 glass border-b border-glass-border flex items-center justify-between px-10 shrink-0 z-40">
        <div className="flex items-center flex-1 max-w-2xl">
          <Link to="/" className="flex items-center space-x-4 mr-10">
            <div className="bg-accent-emerald p-2 rounded-xl shrink-0 shadow-lg shadow-accent-emerald/20">
              <Cpu className="w-5 h-5 text-black" />
            </div>
            <span className="text-lg font-serif font-bold text-text-main tracking-tight whitespace-nowrap hidden sm:block">
              BUDIA <span className="text-accent-emerald italic">PRO</span>
            </span>
          </Link>
          <div className="relative w-full hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
            <Input
              placeholder="Rechercher dans l'écosystème BUDIA..."
              className="pl-12 bg-secondary/50 border-border text-text-main placeholder:text-text-dim/50 focus-visible:ring-1 focus-visible:ring-accent-emerald h-10 rounded-xl font-medium text-xs border-none"
            />
          </div>
        </div>

        <div className="flex items-center space-x-6 relative">
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className={`relative text-text-dim hover:text-text-main transition-colors group p-3 rounded-2xl ${isNotifOpen ? 'bg-accent-emerald/10 text-accent-emerald' : 'hover:bg-secondary'}`}
          >
            <Bell className={`w-5 h-5 ${unreadCount > 0 ? 'animate-bounce' : ''}`} />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-white text-[8px] font-black flex items-center justify-center rounded-full border-2 border-bg-deep">
                {unreadCount}
              </span>
            )}
          </button>
          
          <AnimatePresence>
            {isNotifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full right-0 mt-4 w-96 glass border-glass-border shadow-2xl rounded-[2.5rem] overflow-hidden z-50 p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[11px] font-black uppercase tracking-widest text-text-main">Centrale de Notifications</h3>
                  <button onClick={markAllRead} className="text-[9px] font-bold text-accent-emerald uppercase hover:underline">Marquer comme lu</button>
                </div>
                
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar space-y-4 pr-2">
                  {notifications.length > 0 ? notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`p-4 rounded-2xl border transition-all duration-300 flex gap-4 ${
                        notif.read ? 'bg-transparent border-text-main/5' : 'bg-accent-emerald/5 border-accent-emerald/20 shadow-lg shadow-accent-emerald/5'
                      }`}
                    >
                      <div className="shrink-0 mt-1">
                        {getNotifIcon(notif.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-text-main mb-1">{notif.title}</p>
                        <p className="text-[10px] text-text-dim leading-relaxed">{notif.message}</p>
                        <p className="text-[8px] text-text-dim/50 uppercase font-bold mt-2">
                          {format(parseISO(notif.createdAt), "dd MMM HH:mm", { locale: fr })}
                        </p>
                      </div>
                      {!notif.read && (
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-emerald shrink-0 mt-1"></div>
                      )}
                    </div>
                  )) : (
                    <div className="text-center py-10">
                      <Bell className="w-8 h-8 text-text-dim/20 mx-auto mb-4" />
                      <p className="text-[10px] text-text-dim uppercase font-bold tracking-widest">Aucune notification</p>
                    </div>
                  )}
                </div>
                
                <Button variant="ghost" className="w-full mt-6 text-[9px] font-bold uppercase tracking-widest h-12 bg-text-main/5 rounded-2xl text-text-dim hover:text-text-main">
                  Voir tout l'historique
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Viewport */}
      <main className="flex-1 overflow-y-auto p-6 pb-32 custom-scrollbar">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/settings" element={<SettingsView />} />
          <Route path="*" element={<div className="text-center py-32 text-text-dim uppercase tracking-widest text-[10px] font-bold">Module en cours de déploiement...</div>} />
        </Routes>
      </main>

      {/* Floating Bottom Navigation (Windows 11 Style) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <nav className="bg-white/90 dark:bg-black/80 border border-border px-4 py-3 rounded-[30px] shadow-xl backdrop-blur-2xl flex items-center space-x-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-5 py-3 rounded-[24px] transition-all duration-300 group relative ${
                  isActive
                    ? 'bg-accent-emerald text-white dark:text-black shadow-lg shadow-accent-emerald/20 font-bold'
                    : 'hover:bg-accent-emerald/5 text-text-dim hover:text-accent-emerald'
                }`}
              >
                <div className={`shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {item.icon}
                </div>
                <span className={`text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${isActive ? 'w-auto opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
                  {item.name}
                </span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Portal;
