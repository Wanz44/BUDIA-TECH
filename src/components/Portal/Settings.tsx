import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Bell, 
  Globe, 
  Save,
  FileText,
  Image as ImageIcon,
  Layout,
  Type
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { mockDb } from '@/lib/mockDb';

const Settings = () => {
  const [config, setConfig] = useState<any>({
    companyName: 'BUDIA TECH',
    logoUrl: '',
    heroBgUrl: '',
    siteBgType: 'grid',
    customBgUrl: '',
    description: 'Elite High-Tech Solutions'
  });

  useEffect(() => {
    const savedConfig = mockDb.getAll('siteConfig').find((c: any) => c.id === 'branding');
    if (savedConfig) {
      setConfig(savedConfig);
    }
  }, []);

  const handleSave = () => {
    const allConfig = mockDb.getAll('siteConfig');
    const index = allConfig.findIndex((c: any) => c.id === 'branding');
    if (index !== -1) {
      allConfig[index] = config;
      mockDb.set('siteConfig', allConfig);
      toast.success('Configuration visuelle mise à jour');
      // Dispatch a custom event to notify other components to refresh
      window.dispatchEvent(new Event('siteConfigUpdated'));
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif font-bold text-text-main tracking-tight">Configuration</h1>
          <p className="text-text-dim text-[10px] uppercase tracking-widest font-bold mt-2">Personnalisez votre interface et gérez vos préférences BUDIA TECH.</p>
        </div>
        <Button onClick={handleSave} className="btn-glass h-12 px-8 rounded-xl uppercase font-bold tracking-widest text-[10px] gap-3">
          <Save className="w-4 h-4" /> Enregistrer
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Identity Section */}
          <Card className="glass border-glass-border shadow-xl rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-10 pb-0">
              <div className="flex items-center space-x-4">
                <div className="bg-accent-emerald/10 p-3 rounded-2xl text-accent-emerald">
                  <Type className="w-5 h-5" />
                </div>
                <CardTitle className="text-[11px] font-bold text-text-main uppercase tracking-widest">Identité de Marque</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Nom du Magasin</Label>
                  <Input 
                    value={config.companyName} 
                    onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
                    className="bg-secondary/50 border-border text-text-main rounded-xl h-12" 
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Slogan / Sous-titre</Label>
                  <Input 
                    value={config.description} 
                    onChange={(e) => setConfig({ ...config, description: e.target.value })}
                    className="bg-secondary/50 border-border text-text-main rounded-xl h-12" 
                  />
                </div>
                <div className="space-y-3 sm:col-span-2">
                  <Label className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">URL du Logo (Image)</Label>
                  <Input 
                    placeholder="https://example.com/logo.png"
                    value={config.logoUrl} 
                    onChange={(e) => setConfig({ ...config, logoUrl: e.target.value })}
                    className="bg-secondary/50 border-border text-text-main rounded-xl h-12" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Backgrounds Section */}
          <Card className="glass border-glass-border shadow-xl rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-10 pb-0">
              <div className="flex items-center space-x-4">
                <div className="bg-accent-blue/10 p-3 rounded-2xl text-accent-blue">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <CardTitle className="text-[11px] font-bold text-text-main uppercase tracking-widest">Actifs Visuels</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <div className="space-y-4">
                <Label className="text-[9px] font-bold text-accent-blue uppercase tracking-widest ml-1">Arrière-plan Section Hero</Label>
                <div className="flex gap-4 items-center">
                  <Input 
                    placeholder="URL de l'image de fond principale" 
                    value={config.heroBgUrl}
                    onChange={(e) => setConfig({ ...config, heroBgUrl: e.target.value })}
                    className="bg-secondary/50 border-border text-text-main rounded-xl h-12 flex-1" 
                  />
                  {config.heroBgUrl && (
                    <div className="w-12 h-12 rounded-xl border border-border overflow-hidden shrink-0">
                      <img src={config.heroBgUrl} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-[9px] font-bold text-accent-blue uppercase tracking-widest ml-1">Style d'arrière-plan du site</Label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'grid', label: 'Grille Tech' },
                    { id: 'solid', label: 'Uni' },
                    { id: 'custom', label: 'Image Perso' },
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setConfig({ ...config, siteBgType: style.id })}
                      className={`h-12 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${
                        config.siteBgType === style.id 
                          ? 'bg-accent-blue border-accent-blue text-white' 
                          : 'bg-secondary/30 border-border text-text-dim hover:border-accent-blue/50'
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              {config.siteBgType === 'custom' && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                  <Label className="text-[9px] font-bold text-accent-blue uppercase tracking-widest ml-1">URL de l'image d'arrière-plan globale</Label>
                  <Input 
                    value={config.customBgUrl}
                    onChange={(e) => setConfig({ ...config, customBgUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..." 
                    className="bg-secondary/50 border-border text-text-main rounded-xl h-12" 
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <div className="space-y-10">
          <Card className="glass border-glass-border shadow-xl rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-10 pb-0">
              <div className="flex items-center space-x-4">
                <div className="bg-accent-emerald/10 p-3 rounded-2xl text-accent-emerald">
                  <FileText className="w-5 h-5" />
                </div>
                <CardTitle className="text-[11px] font-bold text-text-main uppercase tracking-widest">Coordonnées</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-6">
              <div className="space-y-3">
                <Label className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">RCCM</Label>
                <Input defaultValue="CD/KNG/RCCM/26-A-01430" className="bg-secondary/50 border-border text-text-main rounded-xl h-12" />
              </div>
              <div className="space-y-3">
                <Label className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Localisation</Label>
                <Input defaultValue="Kinshasa, DRC" className="bg-secondary/50 border-border text-text-main rounded-xl h-12" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
