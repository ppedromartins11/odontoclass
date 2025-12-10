import { useState, useRef, useEffect } from 'react';
import ImageModal from './ImageModal';

export default function Servicos() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [servicos, setServicos] = useState([
    { id: 1, nome: 'Limpeza Profissional', descricao: 'Limpeza completa e polimento dos dentes', imagem: '' },
    { id: 2, nome: 'Clareamento Dental', descricao: 'Clareamento profissional para um sorriso mais branco', imagem: '' },
    { id: 3, nome: 'Ortodontia', descricao: 'Correção da posição dos dentes', imagem: '' },
    { id: 4, nome: 'Restaurações', descricao: 'Restauração de dentes danificados', imagem: '' },
    { id: 5, nome: 'Implantes Dentários', descricao: 'Implante de dentes artificiais', imagem: '' },
    { id: 6, nome: 'Endodontia', descricao: 'Tratamento de canal com precisão', imagem: '' },
  ]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem('servicos');
    if (stored) {
      setServicos(JSON.parse(stored));
    }

    // Listener para mudanças no localStorage
    const handleStorageChange = () => {
      const updated = localStorage.getItem('servicos');
      if (updated) {
        setServicos(JSON.parse(updated));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = 320;
    const newPosition = scrollPosition + (direction === 'left' ? -scrollAmount : scrollAmount);
    setScrollPosition(newPosition);

    container?.scrollTo({ left: newPosition, behavior: 'smooth' });
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState('');

  const handleImageClick = (imageSrc, imageName) => {
    setSelectedImage(imageSrc);
    setSelectedImageName(imageName);
  };

  return (
    <>
      <ImageModal
        isOpen={!!selectedImage}
        imageSrc={selectedImage}
        imageAlt={selectedImageName}
        onClose={() => setSelectedImage(null)}
      />
      <section
        id="servicos"
        className="section-container"
      role="region"
      aria-labelledby="servicos-title"
    >
      <h2
        id="servicos-title"
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        style={{ color: '#5A5755' }}
      >
        Serviços Oferecidos
      </h2>

      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicos.map((servico) => (
          <div
            key={servico.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col"
          >
            <div className="rounded-t-2xl h-48 overflow-hidden flex items-center justify-center text-5xl flex-shrink-0" style={{ backgroundColor: 'rgba(231, 111, 127, 0.1)' }}>
              {servico.imagem ? (
                <img
                  src={servico.imagem}
                  alt={servico.nome}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleImageClick(servico.imagem, servico.nome)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleImageClick(servico.imagem, servico.nome)}
                  aria-label={`Visualizar imagem de ${servico.nome}`}
                />
              ) : (
                '🦷'
              )}
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-3" style={{ color: '#5A5755' }}>
                {servico.nome}
              </h3>
              <p style={{ color: 'rgba(90, 87, 85, 0.8)' }} className="flex-grow">
                {servico.descricao}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="md:hidden">
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4"
            role="region"
            aria-label="Carrossel de serviços"
            aria-live="polite"
          >
            {servicos.map((servico) => (
              <div
                key={servico.id}
                className="flex-shrink-0 w-80 bg-white rounded-2xl overflow-hidden shadow-lg snap-center flex flex-col"
              >
                <div className="rounded-t-2xl h-40 flex items-center justify-center text-4xl flex-shrink-0" style={{ backgroundColor: 'rgba(231, 111, 127, 0.1)' }}>
                  {servico.imagem ? (
                    <img
                      src={servico.imagem}
                      alt={servico.nome}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleImageClick(servico.imagem, servico.nome)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleImageClick(servico.imagem, servico.nome)}
                      aria-label={`Visualizar imagem de ${servico.nome}`}
                    />
                  ) : (
                    '🦷'
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#5A5755' }}>
                    {servico.nome}
                  </h3>
                  <p className="text-sm" style={{ color: 'rgba(90, 87, 85, 0.8)' }}>
                    {servico.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ backgroundColor: '#ff8da1' }}
            aria-label="Deslizar serviços para esquerda"
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ backgroundColor: '#ff8da1' }}
            aria-label="Deslizar serviços para direita"
          >
            →
          </button>
        </div>
      </div>
    </section>
    </>
  );
}

