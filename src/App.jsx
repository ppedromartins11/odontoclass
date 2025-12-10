import Header from './components/Header';
import Hero from './components/Hero';
import Servicos from './components/Servicos';
import SobreDra from './components/SobreDra';
import Especializacoes from './components/Especializacoes';
import Contato from './components/Contato';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import AdminDashboard from './components/AdminDashboard';
import './index.css';

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Servicos />
      <SobreDra />
      <Especializacoes />
      <Contato />
      <Footer />
      <WhatsAppFloat />
      <AdminDashboard />
    </>
  );
}

export default App;
