import { motion } from 'motion/react';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  Save,
  UserCircle,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const Settings = () => {
  const handleSave = () => {
    toast.success('Paramètres enregistrés avec succès');
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-serif font-bold text-text-main tracking-tight">Configuration</h1>
        <p className="text-text-dim text-[10px] uppercase tracking-widest font-bold mt-2">Personnalisez votre interface et gérez vos préférences BUDIA TECH.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Profile Settings */}
        <div className="lg:col-span-2 space-y-10">
          <Card className="glass border-glass-border shadow-xl rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-10 pb-0">
              <div className="flex items-center space-x-4">
                <div className="bg-accent-emerald/10 p-3 rounded-2xl text-accent-emerald">
                  <User className="w-5 h-5" />
                </div>
                <CardTitle className="text-[11px] font-bold text-text-main uppercase tracking-widest">Profil Administrateur</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8 pb-8 border-b border-white/5">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-3xl bg-accent-emerald/10 border-2 border-accent-emerald/20 overflow-hidden flex items-center justify-center">
                    <UserCircle className="w-16 h-16 text-accent-emerald/40 group-hover:text-accent-emerald transition-colors duration-500" />
                  </div>
                  <button className="absolute -bottom-2 -right-2 bg-accent-emerald text-black p-2 rounded-xl shadow-lg hover:scale-110 transition-transform">
                    <Save className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-bold text-text-main">Patrick NGOYI</h3>
                  <p className="text-xs text-text-dim uppercase tracking-widest font-bold mt-1">Directeur Technique • BUDIA TECH</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Nom Complet</Label>
                  <Input defaultValue="Patrick NGOYI" className="bg-secondary/50 border-border text-text-main rounded-xl h-12" />
                </div>
                <div className="space-y-3">
                  <Label className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Email Professionnel</Label>
                  <Input defaultValue="ngoyikalembue.77.com@gmail.com" className="bg-secondary/50 border-border text-text-main rounded-xl h-12" />
                </div>
                <div className="space-y-3">
                  <Label className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Téléphone</Label>
                  <Input defaultValue="+243 891 229 546" className="bg-secondary/50 border-border text-text-main rounded-xl h-12" />
                </div>
                <div className="space-y-3">
                  <Label className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">RCCM</Label>
                  <Input defaultValue="CD/KNG/RCCM/26-A-01430" className="bg-secondary/50 border-border text-text-main rounded-xl h-12" />
                </div>
                <div className="space-y-3 sm:col-span-2">
                  <Label className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Adresse & Localisation</Label>
                  <Input defaultValue="Avenue Lunvungi, Commune de Kinshasa, Réf : Rond-point Huilerie, en face de l'avenue Nyangwe" className="bg-secondary/50 border-border text-text-main rounded-xl h-12" />
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handleSave} className="btn-glass h-14 px-10 rounded-xl uppercase font-bold tracking-widest text-[10px]">
                  Enregistrer les modifications
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border shadow-xl rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-10 pb-0">
              <div className="flex items-center space-x-4">
                <div className="bg-accent-emerald/10 p-3 rounded-2xl text-accent-emerald">
                  <Shield className="w-5 h-5" />
                </div>
                <CardTitle className="text-[11px] font-bold text-text-main uppercase tracking-widest">Sécurité & Accès</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <div className="flex items-center justify-between p-6 bg-secondary/50 rounded-2xl border border-border">
                <div>
                   <p className="text-sm font-bold text-text-main">Authentification à deux facteurs</p>
                  <p className="text-xs text-text-dim mt-1 font-medium">Ajoutez une couche de sécurité supplémentaire à votre compte.</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-6 bg-secondary/50 rounded-2xl border border-border">
                <div>
                  <p className="text-sm font-bold text-text-main">Alertes de connexion</p>
                  <p className="text-xs text-text-dim mt-1 font-medium">Recevez un email à chaque nouvelle connexion suspecte.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-10">
          <Card className="glass border-glass-border shadow-xl rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-10 pb-0">
              <div className="flex items-center space-x-4">
                <div className="bg-accent-emerald/10 p-3 rounded-2xl text-accent-emerald">
                  <Bell className="w-5 h-5" />
                </div>
                <CardTitle className="text-[11px] font-bold text-text-main uppercase tracking-widest">Notifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-6">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-text-main">Nouvelles commandes</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-text-main">Stock faible</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-text-main">Rapports hebdomadaires</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-text-main">Messages clients</Label>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border shadow-xl rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-10 pb-0">
              <div className="flex items-center space-x-4">
                <div className="bg-accent-emerald/10 p-3 rounded-2xl text-accent-emerald">
                  <Globe className="w-5 h-5" />
                </div>
                <CardTitle className="text-[11px] font-bold text-text-main uppercase tracking-widest">Région & Langue</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-6">
              <div className="space-y-3">
                <Label className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Langue de l'interface</Label>
                <select className="w-full bg-secondary/50 border border-border text-text-main rounded-xl h-12 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent-emerald transition-all">
                  <option value="fr">Français (France)</option>
                  <option value="en">English (UK)</option>
                </select>
              </div>
              <div className="space-y-3">
                <Label className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Fuseau Horaire</Label>
                <select className="w-full bg-secondary/50 border border-border text-text-main rounded-xl h-12 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent-emerald transition-all">
                  <option value="gmt+1">Kinshasa (GMT+1)</option>
                  <option value="gmt">Londres (GMT)</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
