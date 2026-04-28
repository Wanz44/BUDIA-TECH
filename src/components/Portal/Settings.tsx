import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  Globe, 
  Save,
  FileText,
  Image as ImageIcon,
  Layout,
  Type,
  Users as UsersIcon,
  Settings as SettingsIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import UserManagement from './UserManagement';

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'branding' | 'users'>('branding');
  const [config, setConfig] = useState<any>({
    companyName: 'BUDIA TECH',
    logoUrl: '',
    heroBgUrl: '',
    siteBgType: 'grid',
    customBgUrl: '',
    slogan: 'L\'excellence technologique au service de votre vision',
    contactEmail: '',
    contactPhone: '',
    rccm: 'CD/KNG/RCCM/26-A-01430',
    address: 'Kinshasa, DRC'
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data, error } = await supabase
          .from('site_config')
          .select('*')
          .eq('id', 'branding')
          .single();

        if (error) {
          if (error.code !== 'PGRST116') throw error;
        }

        if (data) {
          setConfig({
            companyName: data.company_name,
            logoUrl: data.logo_url,
            heroBgUrl: data.hero_bg_url,
            siteBgType: data.site_bg_type || 'grid',
            customBgUrl: data.custom_bg_url,
            slogan: data.slogan,
            contactEmail: data.contact_email,
            contactPhone: data.contact_phone,
            rccm: data.rccm,
            address: data.address
          });
        }
      } catch (error) {
        console.error('Error fetching config:', error);
      }
    };
    fetchConfig();
  }, []);

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('site_config')
        .upsert({
          id: 'branding',
          company_name: config.companyName,
          logo_url: config.logoUrl,
          hero_bg_url: config.heroBgUrl,
          site_bg_type: config.siteBgType,
          custom_bg_url: config.customBgUrl,
          slogan: config.slogan,
          contact_email: config.contactEmail,
          contact_phone: config.contactPhone,
          rccm: config.rccm,
          address: config.address
        });

      if (error) throw error;
      
      toast.success('Configuration visuelle mise à jour');
      window.dispatchEvent(new Event('siteConfigUpdated'));
    } catch (error) {
      console.error('Error saving config:', error);
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white/40 p-1 rounded-xl border border-white/60 w-fit">
        <button
          onClick={() => setActiveTab('branding')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'branding' 
              ? 'bg-white text-[#0067c0] shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <SettingsIcon className="w-4 h-4" />
          <span>Personnalisation</span>
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'users' 
              ? 'bg-white text-[#0067c0] shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <UsersIcon className="w-4 h-4" />
          <span>Utilisateurs</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'branding' ? (
          <motion.div
            key="branding"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-[#202124]">Paramètres</h1>
                <p className="text-gray-500 text-xs font-medium mt-1">Personnalisez l'identité visuelle de votre portail.</p>
              </div>
              <Button onClick={handleSave} className="win-btn-primary h-10 px-6 gap-2">
                <Save className="w-4 h-4" /> <span>Enregistrer</span>
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                {/* Identity Section */}
                <Card className="win-card border-none shadow-sm">
                  <CardHeader className="flex flex-row items-center gap-3 p-6 pb-2">
                    <div className="bg-[#0067c0]/10 p-2 rounded-md text-[#0067c0]">
                      <Type className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-wider">Identité</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-[11px] font-semibold text-gray-500 ml-0.5">Nom de l'entreprise</Label>
                        <Input 
                          value={config.companyName} 
                          onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
                          className="win-btn-secondary bg-white/50 h-9" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[11px] font-semibold text-gray-500 ml-0.5">Slogan</Label>
                        <Input 
                          value={config.slogan} 
                          onChange={(e) => setConfig({ ...config, slogan: e.target.value })}
                          className="win-btn-secondary bg-white/50 h-9" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[11px] font-semibold text-gray-500 ml-0.5">Contact Email</Label>
                        <Input 
                          value={config.contactEmail} 
                          onChange={(e) => setConfig({ ...config, contactEmail: e.target.value })}
                          className="win-btn-secondary bg-white/50 h-9" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[11px] font-semibold text-gray-500 ml-0.5">Tél. Contact</Label>
                        <Input 
                          value={config.contactPhone} 
                          onChange={(e) => setConfig({ ...config, contactPhone: e.target.value })}
                          className="win-btn-secondary bg-white/50 h-9" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[11px] font-semibold text-gray-500 ml-0.5">URL du Logo</Label>
                        <Input 
                          placeholder="https://example.com/logo.png"
                          value={config.logoUrl} 
                          onChange={(e) => setConfig({ ...config, logoUrl: e.target.value })}
                          className="win-btn-secondary bg-white/50 h-9" 
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Backgrounds Section */}
                <Card className="win-card border-none shadow-sm">
                  <CardHeader className="flex flex-row items-center gap-3 p-6 pb-2">
                    <div className="bg-blue-500/10 p-2 rounded-md text-blue-600">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-wider">Design du site</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-[11px] font-semibold text-gray-500 ml-0.5">Image Section Hero</Label>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="URL de l'image" 
                          value={config.heroBgUrl}
                          onChange={(e) => setConfig({ ...config, heroBgUrl: e.target.value })}
                          className="win-btn-secondary bg-white/50 h-9 flex-1" 
                        />
                        {config.heroBgUrl && (
                          <div className="w-9 h-9 rounded-md border border-gray-200 overflow-hidden shrink-0">
                            <img src={config.heroBgUrl} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-[11px] font-semibold text-gray-500 ml-0.5">Style d'arrière-plan</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'grid', label: 'Grille' },
                          { id: 'solid', label: 'Uni' },
                          { id: 'custom', label: 'Image' },
                        ].map((style) => (
                          <button
                            key={style.id}
                            onClick={() => setConfig({ ...config, siteBgType: style.id })}
                            className={`h-9 rounded-md text-[11px] font-semibold border transition-all ${
                              config.siteBgType === style.id 
                                ? 'bg-[#0067c0] border-[#0067c0] text-white' 
                                : 'win-btn-secondary bg-white/50 border-gray-200 text-gray-600 hover:border-[#0067c0]/50'
                            }`}
                          >
                            {style.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {config.siteBgType === 'custom' && (
                      <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
                        <Label className="text-[11px] font-semibold text-gray-500 ml-0.5">URL Image Arrière-plan</Label>
                        <Input 
                          value={config.customBgUrl}
                          onChange={(e) => setConfig({ ...config, customBgUrl: e.target.value })}
                          placeholder="https://..." 
                          className="win-btn-secondary bg-white/50 h-9" 
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Info Section */}
              <div className="space-y-6">
                <Card className="win-card border-none shadow-sm">
                  <CardHeader className="flex flex-row items-center gap-3 p-6 pb-2">
                    <div className="bg-green-500/10 p-2 rounded-md text-green-600">
                      <FileText className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-wider">Informations Légales</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-[11px] font-semibold text-gray-500 ml-0.5">RCCM</Label>
                      <Input 
                        value={config.rccm} 
                        onChange={(e) => setConfig({ ...config, rccm: e.target.value })}
                        className="win-btn-secondary bg-white/50 h-9" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[11px] font-semibold text-gray-500 ml-0.5">Localisation</Label>
                      <Input 
                        value={config.address} 
                        onChange={(e) => setConfig({ ...config, address: e.target.value })}
                        className="win-btn-secondary bg-white/50 h-9" 
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="users"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-[#202124]">Gestion des Utilisateurs</h1>
              <p className="text-gray-500 text-xs font-medium mt-1">Gérez les accès administratifs et les rôles du personnel.</p>
            </div>
            <UserManagement />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
