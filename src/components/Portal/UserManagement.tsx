import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  UserPlus, 
  Trash2, 
  Shield, 
  ShieldCheck, 
  Loader2,
  Mail,
  User as UserIcon,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'staff';
  created_at: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    fullName: '',
    role: 'staff' as 'admin' | 'staff'
  });

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Impossible de charger les utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // 1. Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUser.email,
        password: newUser.password,
        options: {
          data: {
            full_name: newUser.fullName,
            role: newUser.role
          }
        }
      });

      if (authError) throw authError;

      // Note: In Supabase, usually a trigger handles profile creation.
      // If no trigger, we might need to insert manually, but here we assume a trigger 
      // or that policies allow this insert since we just signed up.
      
      // Let's manually ensure the profile exists (useful for demo/immediate feedback)
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: authData.user.id,
            email: newUser.email,
            full_name: newUser.fullName,
            role: newUser.role
          });
        
        if (profileError) console.error('Profile creation error:', profileError);
      }

      toast.success('Utilisateur créé. Un email de confirmation a été envoyé.');
      setNewUser({ email: '', password: '', fullName: '', role: 'staff' });
      fetchUsers();
    } catch (error: any) {
      console.error('Error adding user:', error);
      toast.error(error.message || 'Erreur lors de l\'ajout');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left: Add User Form */}
        <Card className="win-card border-none shadow-sm lg:col-span-2">
          <CardHeader className="flex flex-row items-center gap-3 p-6 pb-2">
            <div className="bg-primary/10 p-2 rounded-md text-primary">
              <UserPlus className="w-5 h-5" />
            </div>
            <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nouvel Utilisateur</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[11px] font-semibold text-gray-500 ml-0.5">Nom Complet</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <Input 
                    required
                    value={newUser.fullName}
                    onChange={(e) => setNewUser({...newUser, fullName: e.target.value})}
                    placeholder="Jean Dupont"
                    className="pl-9 h-9 win-btn-secondary bg-white/50" 
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <Label className="text-[11px] font-semibold text-gray-500 ml-0.5">Email Professionnel</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <Input 
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    placeholder="admin@budiatech.cd"
                    className="pl-9 h-9 win-btn-secondary bg-white/50" 
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[11px] font-semibold text-gray-500 ml-0.5">Mot de passe temporaire</Label>
                <Input 
                  type="password"
                  required
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  className="h-9 win-btn-secondary bg-white/50" 
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[11px] font-semibold text-gray-500 ml-0.5">Rôle</Label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setNewUser({...newUser, role: 'staff'})}
                    className={`flex-1 h-9 rounded-md text-[11px] font-bold border transition-all ${
                      newUser.role === 'staff' 
                        ? 'bg-[#0067c0] border-[#0067c0] text-white shadow-sm' 
                        : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    Staff
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewUser({...newUser, role: 'admin'})}
                    className={`flex-1 h-9 rounded-md text-[11px] font-bold border transition-all ${
                      newUser.role === 'admin' 
                        ? 'bg-[#0067c0] border-[#0067c0] text-white shadow-sm' 
                        : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    Admin
                  </button>
                </div>
              </div>

              <Button disabled={submitting} className="w-full win-btn-primary h-10 mt-4 font-bold text-xs uppercase tracking-widest">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Créer le compte'}
              </Button>
              
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-[#0067c0] mt-0.5 shrink-0" />
                <p className="text-[9px] font-bold text-[#0067c0] leading-tight uppercase">
                  L'utilisateur recevra un e-mail de confirmation. Il devra cliquer sur le lien pour activer son accès.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Right: Users List */}
        <Card className="win-card border-none shadow-sm lg:col-span-3">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-wider">Liste du personnel</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-1">
                {users.map((user) => (
                  <div 
                    key={user.id} 
                    className="flex items-center justify-between p-3 bg-white/40 hover:bg-white/60 rounded-xl transition-all group border border-transparent hover:border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black shadow-sm ${
                        user.role === 'admin' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {user.full_name?.substring(0, 2).toUpperCase() || '??'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-[#202124]">{user.full_name}</h4>
                          {user.role === 'admin' ? (
                            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                          ) : (
                            <Shield className="w-3.5 h-3.5 text-gray-400" />
                          )}
                        </div>
                        <p className="text-[10px] font-medium text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                        user.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {user.role}
                      </div>
                      <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {users.length === 0 && (
                  <div className="text-center p-12 text-gray-400 italic text-xs uppercase tracking-widest">
                    Aucun utilisateur trouvé
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;
