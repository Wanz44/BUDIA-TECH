import { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Cpu,
  UserCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Dashboard from '@/components/Portal/Dashboard';
import Inventory from '@/components/Portal/Inventory';
import Orders from '@/components/Portal/Orders';
import SettingsView from '@/components/Portal/Settings';

const Portal = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Tableau de bord', icon: <LayoutDashboard className="w-5 h-5" />, path: '/portal' },
    { name: 'Inventaire', icon: <Package className="w-5 h-5" />, path: '/portal/inventory' },
    { name: 'Commandes', icon: <ShoppingCart className="w-5 h-5" />, path: '/portal/orders' },
    { name: 'Configuration', icon: <Settings className="w-5 h-5" />, path: '/portal/settings' },
  ];

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

        <div className="flex items-center space-x-6">
          <button className="relative text-text-dim hover:text-text-main transition-colors group">
            <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-accent-emerald rounded-full border-2 border-bg-deep"></span>
          </button>
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
