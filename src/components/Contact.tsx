import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { mockDb } from '@/lib/mockDb';

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, type: 'contact' | 'quote') => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      mockDb.add('contacts', {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject') || (type === 'quote' ? 'Demande de Devis' : 'Contact'),
        message: formData.get('message'),
        type,
      });
      toast.success(type === 'quote' ? 'Votre demande de devis a été envoyée !' : 'Votre message a été envoyé !');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Une erreur est survenue lors de l'envoi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-accent-emerald font-bold tracking-widest uppercase text-[10px] mb-6">Contactez l'Élite</h2>
            <h3 className="text-4xl lg:text-5xl font-serif font-bold text-text-main mb-8 leading-tight">Prêt à Bâtir le Futur ?</h3>
            <p className="text-text-dim mb-12 max-w-lg leading-relaxed font-medium">
              Que ce soit pour une acquisition technologique ou un projet d'ingénierie complexe, notre équipe d'experts est à votre entière disposition.
            </p>

            <div className="space-y-10">
              <div className="flex items-start space-x-5">
                <div className="bg-accent-emerald/10 p-4 rounded-2xl border border-accent-emerald/20">
                  <MapPin className="w-6 h-6 text-accent-emerald" />
                </div>
                <div>
                  <h4 className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest mb-2">Siège Social</h4>
                  <p className="text-text-main font-bold text-sm">Avenue Lunvungi, Commune de Kinshasa, Réf : Rond-point Huilerie</p>
                </div>
              </div>
              <div className="flex items-start space-x-5">
                <div className="bg-accent-emerald/10 p-4 rounded-2xl border border-accent-emerald/20">
                  <Phone className="w-6 h-6 text-accent-emerald" />
                </div>
                <div>
                  <h4 className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest mb-2">Ligne Directe</h4>
                  <p className="text-text-main font-bold text-sm">+243 891 229 546</p>
                </div>
              </div>
              <div className="flex items-start space-x-5">
                <div className="bg-accent-emerald/10 p-4 rounded-2xl border border-accent-emerald/20">
                  <Mail className="w-6 h-6 text-accent-emerald" />
                </div>
                <div>
                  <h4 className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest mb-2">Correspondance</h4>
                  <p className="text-text-main font-bold text-sm">ngoyikalembue.77.com@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="mt-16 glass p-10 rounded-[2.5rem] relative overflow-hidden border-glass-border">
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
                  <span className="text-[10px] font-bold text-text-main uppercase tracking-widest">Conciergerie technique active</span>
                </div>
                <p className="text-text-dim text-xs mb-8 font-medium">Nos ingénieurs sont en ligne pour une assistance immédiate.</p>
                <Button variant="outline" className="w-full border-glass-border text-text-main hover:bg-glass-bg uppercase text-[10px] font-bold tracking-widest h-14 rounded-xl">
                  Démarrer une session live
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-10 sm:p-16 rounded-[3rem] border-glass-border shadow-2xl"
          >
            <Tabs defaultValue="contact" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-10 bg-accent-emerald/5 p-1.5 rounded-2xl border border-accent-emerald/10">
                <TabsTrigger value="contact" className="rounded-xl data-[state=active]:bg-accent-emerald data-[state=active]:text-white uppercase text-[9px] font-bold tracking-widest py-4 transition-all">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </TabsTrigger>
                <TabsTrigger value="quote" className="rounded-xl data-[state=active]:bg-accent-emerald data-[state=active]:text-white uppercase text-[9px] font-bold tracking-widest py-4 transition-all">
                  <FileText className="w-4 h-4 mr-2" />
                  Devis Pro
                </TabsTrigger>
              </TabsList>

              <TabsContent value="contact">
                <form onSubmit={(e) => handleSubmit(e, 'contact')} className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Identité</Label>
                      <Input id="name" name="name" placeholder="Votre nom" required className="bg-secondary/50 border-border text-text-main placeholder:text-text-dim/50 h-14 rounded-xl focus:ring-accent-emerald" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Adresse Email</Label>
                      <Input id="email" name="email" type="email" placeholder="votre@email.com" required className="bg-secondary/50 border-border text-text-main placeholder:text-text-dim/50 h-14 rounded-xl focus:ring-accent-emerald" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="subject" className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Objet de la demande</Label>
                    <Input id="subject" name="subject" placeholder="Comment pouvons-nous vous aider ?" required className="bg-secondary/50 border-border text-text-main placeholder:text-text-dim/50 h-14 rounded-xl focus:ring-accent-emerald" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Message</Label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full bg-secondary/50 border border-border rounded-xl p-5 text-sm text-text-main placeholder:text-text-dim/50 focus:outline-none focus:ring-2 focus:ring-accent-emerald transition-all font-medium"
                      placeholder="Votre message ici..."
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full btn-glass h-16 rounded-xl uppercase font-bold tracking-widest text-[10px]">
                    {loading ? 'Transmission...' : 'Envoyer le message'}
                    <Send className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="quote">
                <form onSubmit={(e) => handleSubmit(e, 'quote')} className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="q-name" className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Identité</Label>
                      <Input id="q-name" name="name" placeholder="Votre nom" required className="bg-secondary/50 border-border text-text-main placeholder:text-text-dim/50 h-14 rounded-xl focus:ring-accent-emerald" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="q-email" className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Email Professionnel</Label>
                      <Input id="q-email" name="email" type="email" placeholder="nom@entreprise.com" required className="bg-secondary/50 border-border text-text-main placeholder:text-text-dim/50 h-14 rounded-xl focus:ring-accent-emerald" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="service" className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Solution Recherchée</Label>
                    <select
                      id="service"
                      name="subject"
                      className="w-full bg-secondary/50 border border-border rounded-xl h-14 px-5 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-accent-emerald transition-all appearance-none font-medium"
                    >
                      <option className="bg-bg-deep">Ingénierie Web & Cloud</option>
                      <option className="bg-bg-deep">Écosystème Mobile</option>
                      <option className="bg-bg-deep">Vidéosurveillance Elite</option>
                      <option className="bg-bg-deep">Production Audiovisuelle</option>
                      <option className="bg-bg-deep">Consulting Stratégique</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="q-message" className="text-[9px] font-bold text-accent-emerald uppercase tracking-widest ml-1">Cahier des Charges</Label>
                    <textarea
                      id="q-message"
                      name="message"
                      rows={4}
                      required
                      className="w-full bg-secondary/50 border border-border rounded-xl p-5 text-sm text-text-main placeholder:text-text-dim/50 focus:outline-none focus:ring-2 focus:ring-accent-emerald transition-all font-medium"
                      placeholder="Décrivez brièvement vos besoins..."
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full btn-glass h-16 rounded-xl uppercase font-bold tracking-widest text-[10px]">
                    {loading ? 'Transmission...' : 'Demander une Étude'}
                    <FileText className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
