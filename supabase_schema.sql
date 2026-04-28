-- SQL pour initialiser la base de données Supabase pour BUDIA TECH

-- Table Produits
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  stock INTEGER DEFAULT 0,
  category TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table Commandes
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, processing, shipped, delivered, cancelled
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT,
  type TEXT DEFAULT 'info', -- info, success, warning, error
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table Configuration du Site
CREATE TABLE site_config (
  id TEXT PRIMARY KEY, -- 'branding' est l'ID par défaut
  logo_url TEXT,
  hero_bg_url TEXT,
  site_bg_type TEXT DEFAULT 'grid',
  custom_bg_url TEXT,
  company_name TEXT,
  description TEXT
);

-- Données initiales pour la config
INSERT INTO site_config (id, company_name, description, site_bg_type)
VALUES ('branding', 'BUDIA TECH', 'Elite High-Tech Solutions', 'grid')
ON CONFLICT (id) DO NOTHING;

-- Table Contacts/Demandes de Devis
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT,
  type TEXT DEFAULT 'contact', -- contact, quote
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activer RLS pour contacts
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Autoriser tout le monde d'insérer des contacts
CREATE POLICY "Public insert access for contacts" ON contacts FOR INSERT WITH CHECK (true);

-- Note: Pour l'interface admin, vous devriez ajouter des politiques d'écriture limitées à l'admin authentifié.
