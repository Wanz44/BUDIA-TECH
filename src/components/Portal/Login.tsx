import React, { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Loader2, Lock, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      onLoginSuccess();
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Erreur de connexion. Veuillez vérifier vos identifiants.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f3f3] p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md acrylic border border-white/40 rounded-2xl shadow-2xl p-8 overflow-hidden relative"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0067c0] via-[#00b2ff] to-[#0067c0]" />
        
        <div className="flex flex-col items-center mb-8">
          <div className="h-20 mb-4 items-center flex">
            <img 
              src="https://lbgwlghiwpamhthdgukw.supabase.co/storage/v1/object/sign/PANIER/logo%2001.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xYjgxM2U3ZC04NmQwLTQ3YTQtYmJiNy1mNWRmODFhYmY0ZTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQQU5JRVIvbG9nbyAwMS5qcGciLCJpYXQiOjE3NzczNDMxNzcsImV4cCI6MjA5MjcwMzE3N30.zZnA9FZDrcDieaUMmshUXcVbWn68gMMCyBXTTAJLUb4" 
              alt="Logo" 
              className="h-full w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-xl font-black text-[#202124] uppercase tracking-tighter">BUDIA TECH PRO</h1>
          <p className="text-xs font-bold text-primary uppercase tracking-widest mt-1">Espace Administration</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[11px] font-bold text-gray-500 ml-1 uppercase">Email Professionnel</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="admin@budiatech.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 bg-white/50 border-gray-200 h-11 focus-visible:ring-1 focus-visible:ring-[#0067c0] rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[11px] font-bold text-gray-500 ml-1 uppercase">Mot de Passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 pr-10 bg-white/50 border-gray-200 h-11 focus-visible:ring-1 focus-visible:ring-[#0067c0] rounded-xl text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                title={showPassword ? "Masquer" : "Afficher"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3"
            >
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <p className="text-[10px] font-bold text-red-600 leading-tight uppercase">{error}</p>
            </motion.div>
          )}

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-11 win-btn-primary rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#0067c0]/20"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Se Connecter'
            )}
          </Button>

          <p className="text-center text-[10px] text-gray-400 font-medium">
            Accès réservé au personnel autorisé de BUDIA TECH.
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
