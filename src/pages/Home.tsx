import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-bg-deep selection:bg-accent-blue/20 selection:text-accent-blue">
      <Navbar onSearch={setSearchTerm} />
      <main>
        <Hero />
        <About />
        <Products searchTerm={searchTerm} />
        <Services searchTerm={searchTerm} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
