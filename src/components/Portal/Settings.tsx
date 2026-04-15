import { motion } from 'motion/react';
import { 
  Bell, 
  Globe, 
  Save,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/Input';
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
        <div className="lg:col-span-2 space-y-10">
          <Card className="glass border-glass-border shadow-xl rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-10 pb-0">
              <div className="flex items-center space-x-4">
                <div className="bg-accent-emerald/10 p-3 rounded-2xl text-accent-emerald">
                  <FileText className="w-5 h-5" />
                </div>
                <CardTitle className="text-[11px] font-bold text-text-main uppercase tracking-widest">Informations Entreprise</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Nom de l'entreprise</Label>
                  <Input defaultValue="BUDIA TECH" className="bg-secondary/50 border-border text-text-main rounded-xl h-12" />
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
