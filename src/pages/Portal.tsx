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
    { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/portal' },
    { name: 'Inventaire', icon: <Package className="w-5 h-5" />, path: '/portal/inventory' },
    { name: 'Commandes', icon: <ShoppingCart className="w-5 h-5" />, path: '/portal/orders' },
    { name: 'Paramètres', icon: <Settings className="w-5 h-5" />, path: '/portal/settings' },
  ];

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'error': return <Circle className="w-4 h-4 text-red-600" />;
      default: return <Info className="w-4 h-4 text-[#0067c0]" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f3f3] font-sans selection:bg-[#0067c0]/20">
      {/* Windows 11 Acrylic Header */}
      <header className="h-14 acrylic sticky top-0 flex items-center justify-between px-6 shrink-0 z-40">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-[#0067c0] rounded-sm flex items-center justify-center p-1 shadow-sm">
              <Cpu className="w-full h-full text-white" />
            </div>
            <span className="text-xs font-semibold text-[#202124]">BUDIA PRO</span>
          </Link>
          <div className="h-4 w-[1px] bg-gray-300" />
          <span className="text-xs text-gray-500 font-medium">Portail de Gestion Urbaine</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <Input
              placeholder="Rechercher..."
              className="pl-9 bg-white/50 border-gray-200 text-xs h-8 rounded-md focus-visible:ring-1 focus-visible:ring-[#0067c0]"
            />
          </div>
          
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className={`relative p-2 rounded-md hover:bg-black/5 transition-colors ${isNotifOpen ? 'bg-black/5' : ''}`}
          >
            <Bell className="w-4 h-4 text-[#202124]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
            )}
          </button>
          
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0067c0] to-[#00b2ff] flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
            AL
          </div>
        </div>

        <AnimatePresence>
          {isNotifOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="absolute top-14 right-4 mt-2 w-80 acrylic rounded-lg overflow-hidden z-50 p-4 shadow-xl border border-gray-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-[#202124]">Notifications</h3>
                <button onClick={markAllRead} className="text-[10px] font-medium text-[#0067c0] hover:underline">Tout lire</button>
              </div>
              
              <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                {notifications.length > 0 ? notifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    className="p-3 rounded-md bg-white/40 border border-white/60 flex gap-3 hover:bg-white/60 transition-colors cursor-pointer"
                  >
                    <div className="shrink-0 mt-0.5">{getNotifIcon(notif.type)}</div>
                    <div>
                      <p className="text-[11px] font-bold text-[#202124]">{notif.title}</p>
                      <p className="text-[10px] text-gray-500 leading-normal">{notif.message}</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <p className="text-[10px] text-gray-400 font-medium italic">Aucune nouvelle notification</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/settings" element={<SettingsView />} />
          </Routes>
        </div>
      </main>

      {/* Windows 11 Centered Taskbar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <nav className="acrylic px-1.5 py-1.5 rounded-xl flex items-center space-x-1 ring-1 ring-black/5 shadow-2xl">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative flex items-center justify-center w-10 h-10 rounded-md transition-all duration-200 group ${
                  isActive
                    ? 'bg-white/80 shadow-sm'
                    : 'hover:bg-white/40'
                }`}
                title={item.name}
              >
                <div className={`transition-transform duration-200 ${isActive ? 'scale-100 text-[#0067c0]' : 'scale-90 text-gray-600 group-hover:scale-100'}`}>
                  {item.icon}
                </div>
                {isActive && (
                  <motion.div 
                    layoutId="taskbar-indicator"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-[#0067c0] rounded-full" 
                  />
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
