import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-bg-deep selection:bg-accent-blue/20 selection:text-accent-blue">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
