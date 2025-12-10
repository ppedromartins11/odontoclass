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
import { reportWebVitals } from './utils/webVitals';

function App() {
  // Chama Web Vitals quando o App monta
  reportWebVitals();

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
      {/* AdminDashboard deve ser protegido, renderize apenas se estiver logado */}
      {/* <AdminDashboard /> */}
    </>
  );
}

export default App;
