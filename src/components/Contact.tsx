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
    <section id="contact" className="py-40 bg-secondary/30 dark:bg-card/30 transition-colors duration-700">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-32">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent-emerald mb-4 block">Liaison & Étude</span>
            <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-12 text-text-main">
              Forger Votre <br />
              <span className="text-text-dim/20 italic font-serif font-light lowercase">Avenir</span> Numérique
            </h2>
            <p className="text-text-dim text-sm mb-16 max-w-md font-medium leading-loose uppercase tracking-widest leading-relaxed">
              Nos consultants sont à votre disposition pour transformer vos ambitions techniques en réalités tangibles.
            </p>

            <div className="space-y-12">
              <div className="group flex items-center space-x-8">
                <div className="w-16 h-16 rounded-full border border-text-main/10 flex items-center justify-center group-hover:bg-text-main group-hover:text-bg-deep transition-all duration-500 shadow-sm group-hover:shadow-xl">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                   <span className="text-[9px] font-bold uppercase tracking-widest text-text-dim mb-1 block">Localisation</span>
                   <span className="text-sm font-bold uppercase tracking-tighter text-text-main">Kinshasa, Huilerie</span>
                </div>
              </div>
              <div className="group flex items-center space-x-8">
                <div className="w-16 h-16 rounded-full border border-text-main/10 flex items-center justify-center group-hover:bg-text-main group-hover:text-bg-deep transition-all duration-500 shadow-sm group-hover:shadow-xl">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                   <span className="text-[9px] font-bold uppercase tracking-widest text-text-dim mb-1 block">Assistance</span>
                   <span className="text-sm font-bold uppercase tracking-tighter text-text-main">+243 891 229 546</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-card dark:bg-black p-12 lg:p-20 rounded-[4rem] text-card-foreground dark:text-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] dark:shadow-2xl border border-text-main/5"
          >
            <Tabs defaultValue="contact" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-12 bg-text-main/5 p-1 rounded-full border border-text-main/10">
                <TabsTrigger value="contact" className="rounded-full data-[state=active]:bg-text-main data-[state=active]:text-bg-deep text-[9px] font-bold uppercase tracking-[0.2em] py-4 transition-all">
                  Conversation
                </TabsTrigger>
                <TabsTrigger value="quote" className="rounded-full data-[state=active]:bg-text-main data-[state=active]:text-bg-deep text-[9px] font-bold uppercase tracking-[0.2em] py-4 transition-all">
                  Étude de Projet
                </TabsTrigger>
              </TabsList>

              <TabsContent value="contact">
                <form onSubmit={(e) => handleSubmit(e, 'contact')} className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Label htmlFor="name" className="text-[8px] font-bold uppercase tracking-widest text-text-dim">Identité Nominale</Label>
                      <Input id="name" name="name" placeholder="Votre nom" required className="bg-transparent border-text-main/20 text-text-main placeholder:text-text-dim/40 h-14 rounded-none border-b focus:border-accent-emerald focus:ring-0 px-0 transition-colors" />
                    </div>
                    <div className="space-y-4">
                      <Label htmlFor="email" className="text-[8px] font-bold uppercase tracking-widest text-text-dim">Adresse Sécurisée</Label>
                      <Input id="email" name="email" type="email" placeholder="votre@email.com" required className="bg-transparent border-text-main/20 text-text-main placeholder:text-text-dim/40 h-14 rounded-none border-b focus:border-accent-emerald focus:ring-0 px-0 transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-4 pt-4">
                    <Label htmlFor="message" className="text-[8px] font-bold uppercase tracking-widest text-text-dim">Exposé du Besoin</Label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full bg-transparent border-b border-text-main/20 p-0 py-4 text-sm text-text-main placeholder:text-text-dim/40 focus:outline-none focus:border-accent-emerald transition-all font-medium resize-none"
                      placeholder="Comment BUDIA TECH peut-elle vous accompagner ?"
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-text-main text-bg-deep hover:bg-accent-emerald hover:text-white h-20 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 shadow-xl hover:shadow-2xl">
                    {loading ? 'TRANSMISSION...' : 'TRANSMETTRE LA REQUÊTE'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="quote">
                <form onSubmit={(e) => handleSubmit(e, 'quote')} className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Label htmlFor="q-name" className="text-[8px] font-bold uppercase tracking-widest text-text-dim">Identité Nominale</Label>
                      <Input id="q-name" name="name" placeholder="Votre nom" required className="bg-transparent border-text-main/20 text-text-main placeholder:text-text-dim/40 h-14 rounded-none border-b focus:border-accent-emerald focus:ring-0 px-0 transition-colors" />
                    </div>
                    <div className="space-y-4">
                      <Label htmlFor="q-email" className="text-[8px] font-bold uppercase tracking-widest text-text-dim">Email Professionnel</Label>
                      <Input id="q-email" name="email" type="email" placeholder="nom@entreprise.com" required className="bg-transparent border-text-main/20 text-text-main placeholder:text-text-dim/40 h-14 rounded-none border-b focus:border-accent-emerald focus:ring-0 px-0 transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-4 pt-4">
                    <Label htmlFor="q-message" className="text-[8px] font-bold uppercase tracking-widest text-text-dim">Spécifications Techniques</Label>
                    <textarea
                      id="q-message"
                      name="message"
                      rows={4}
                      required
                      className="w-full bg-transparent border-b border-text-main/20 p-0 py-4 text-sm text-text-main placeholder:text-text-dim/40 focus:outline-none focus:border-accent-emerald transition-all font-medium resize-none"
                      placeholder="Décrivez l'envergure de votre projet..."
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-text-main text-bg-deep hover:bg-accent-emerald hover:text-white h-20 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 shadow-xl hover:shadow-2xl">
                    {loading ? 'CHIFFREMENT...' : 'SOUMETTRE POUR ANALYSE'}
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
