export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id?: string;
  image_url: string;
  images: string[];
  badge?: string;
  specifications?: any;
  visible: boolean;
  created_at: string;
  updated_at: string;
  category?: Category; // Joined category
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items?: any; // Optional JSON storage
  created_at: string;
  order_items?: OrderItem[]; // Joined items
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: number;
  product?: Product;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'staff';
  created_at: string;
}

export interface SiteConfig {
  id: string;
  company_name: string;
  slogan?: string;
  logo_url?: string;
  hero_bg_url?: string;
  site_bg_type: 'grid' | 'solid' | 'custom';
  custom_bg_url?: string;
  contact_email?: string;
  contact_phone?: string;
  rccm?: string;
  address?: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  is_read: boolean;
  created_at: string;
}
