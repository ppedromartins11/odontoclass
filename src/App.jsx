import Header from './components/Header';
import Hero from './components/Hero';
import Servicos from './components/Servicos';
import SobreDra from './components/SobreDra';
import Especializacoes from './components/Especializacoes';
import Contato from './components/Contato';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import AdminDashboard from './components/AdminDashboard';
import AdminSobreDra from './components/AdminSobreDra';
import './index.css';
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <>
      <SpeedInsights />
      <Header />
      <Hero />
      <Servicos />
      <SobreDra />
      <Especializacoes />
      <Contato />
      <Footer />
      <WhatsAppFloat />
      <AdminDashboard />
      <AdminSobreDra />
    </>
  );
}

export default App;
