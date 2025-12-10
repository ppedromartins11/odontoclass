import { useEffect, useState } from 'react';

export default function WhatsAppFloat() {
  const [contato, setContato] = useState({
    whatsapp: '556732127205',
  });

  const message = 'Olá! Gostaria de agendar uma consulta ou tirar dúvidas sobre os serviços.';

  useEffect(() => {
    const stored = localStorage.getItem('contato');
    if (stored) {
      setContato(JSON.parse(stored));
    }

    // Listener para mudanças no localStorage
    const handleStorageChange = () => {
      const updated = localStorage.getItem('contato');
      if (updated) {
        setContato(JSON.parse(updated));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <a
      href={`https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-30 w-14 h-14 md:w-16 md:h-16 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 animate-pulse"
      style={{
        backgroundColor: '#25D366',
        '--tw-ring-color': 'rgba(37, 211, 102, 0.3)',
      }}
      aria-label="Enviar mensagem no WhatsApp para Odonto Class"
      title="Fale conosco no WhatsApp"
    >
      <svg
        className="w-8 h-8 md:w-10 md:h-10"
        viewBox="0 0 32 32"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16 0C7.164 0 0 7.164 0 16c0 2.823.74 5.452 2.021 7.734L0 32l8.39-2.205C10.579 31.26 13.23 32 16 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm8.38 23.632c-.327.92-1.898 1.76-2.66 1.875-.715.11-1.577.155-2.953-.232-3.51-.828-6.622-3.595-8.53-7.148-.353-.618-.747-1.435-.747-2.148 0-.67.215-1.14.455-1.547.123-.2.273-.333.455-.333.164 0 .328.011.472.022.152.013.36-.059.563.432.188.468.64 1.616.697 1.741.055.123.092.268.015.433-.074.165-.108.27-.219.416-.11.147-.236.328-.335.44-.11.124-.223.262-.107.516.116.255.518.84 1.11 1.365.768.648 1.43.839 1.677.933.25.093.395.08.54-.05.146-.131.63-.732.797-.985.168-.254.336-.212.563-.128.23.084 1.448.682 1.697.804.25.123.415.184.478.286.065.102.065.586-.262 1.504z" />
      </svg>
    </a>
  );
}
