import { useState, useEffect } from 'react';
import ImageModal from './ImageModal';

export default function Especializacoes() {
  const [diplomas, setDiplomas] = useState([
    {
      id: 1,
      nome: 'Especialização em Odontopediatria',
      descricao: 'Instituto de Ensino Odontológico de Sinop',
      ano: 2018,
      imagem: '',
    },
    {
      id: 2,
      nome: 'Harmonização Orofacial',
      descricao: 'Instituto de Odontologia Avançada',
      ano: 2019,
      imagem: '',
    },
    {
      id: 3,
      nome: 'Ortodontia e Ortopedia Facial',
      descricao: 'Centro Universitário de Ciências da Saúde',
      ano: 2020,
      imagem: '',
    },
    {
      id: 4,
      nome: 'Implantodontia',
      descricao: 'Associação Brasileira de Implantodontia',
      ano: 2021,
      imagem: '',
    },
    {
      id: 5,
      nome: 'Estética Dentária Avançada',
      descricao: 'Instituto de Odontologia Digital',
      ano: 2022,
      imagem: '',
    },
    {
      id: 6,
      nome: 'Tratamento Digital do Sorriso',
      descricao: 'Centro de Tecnologia Odontológica',
      ano: 2023,
      imagem: '',
    },
  ]);

  useEffect(() => {
    const stored = localStorage.getItem('especializacoes');
    if (stored) {
      setDiplomas(JSON.parse(stored));
    }

    // Listener para mudanças no localStorage
    const handleStorageChange = () => {
      const updated = localStorage.getItem('especializacoes');
      if (updated) {
        setDiplomas(JSON.parse(updated));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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
        id="especializacoes"
        className="section-container bg-gray-50"
        role="region"
        aria-labelledby="especializacoes-title"
      >
      <h2
        id="especializacoes-title"
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        style={{ color: '#5A5755' }}
      >
        Especializações e Certificações
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diplomas.map((diploma) => (
          <article
            key={diploma.id}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow hover:-translate-y-2 overflow-hidden flex flex-col"
          >
            {diploma.imagem && (
              <img
                src={diploma.imagem}
                alt={diploma.nome}
                className="w-full h-40 object-cover rounded-lg mb-4 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleImageClick(diploma.imagem, diploma.nome)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleImageClick(diploma.imagem, diploma.nome)}
                aria-label={`Visualizar certificado de ${diploma.nome}`}
              />
            )}

            <h3 className="text-lg md:text-xl font-bold mb-2" style={{ color: '#5A5755' }}>
              {diploma.nome}
            </h3>

            <p className="text-sm md:text-base mb-3 flex-grow" style={{ color: 'rgba(90, 87, 85, 0.8)' }}>
              {diploma.descricao}
            </p>

            <div className="flex justify-between items-center">
              <p className="text-sm md:text-base font-semibold" style={{ color: '#ff8da1' }}>
                {diploma.ano}
              </p>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs md:text-sm font-semibold"
                style={{ backgroundColor: 'rgba(231, 111, 127, 0.1)', color: '#ff8da1' }}
              >
                ✓ Certificado
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-2xl p-8 text-center shadow-lg">
        <p className="mb-4 text-base md:text-lg" style={{ color: 'rgba(90, 87, 85, 0.8)' }}>
          Todas as certificações são reconhecidas e mantidas em dia com os requisitos
          profissionais vigentes.
        </p>
        <p className="font-semibold" style={{ color: '#ff8da1' }}>
          Comprometida com educação continuada e excelência profissional
        </p>
      </div>
      </section>
    </>
  );
}

