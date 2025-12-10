import { useEffect, useState } from 'react';

export default function SobreDra() {
  const [sobre, setSobre] = useState({
    nome: 'Dra. Adrieli Dianessa Martins de Souza',
    croms: '5851',
    epao: '519',
    cnpj: '28.768.712/0001-74',
    foto: 'https://via.placeholder.com/224',
    descricao: 'Profissional dedicada à saúde bucal, com foco em atendimento humanizado e técnicas modernas para resultados naturais e seguros. Com mais de 10 anos de experiência, a Dra. Adrieli é especializada em diversos procedimentos odontológicos e se dedica a oferecer o melhor atendimento.',
    graduacao: 'Odontologia — Universidade Anhanguera-Uniderp (2015)',
    especializacao_principal: 'Endodontia',
    compromisso: 'Atendimento de excelência com foco na saúde e bem-estar do paciente',
  });

  useEffect(() => {
    const stored = localStorage.getItem('sobre');
    if (stored) {
      setSobre(JSON.parse(stored));
    }

    // Listener para mudanças no localStorage
    const handleStorageChange = () => {
      const updated = localStorage.getItem('sobre');
      if (updated) {
        setSobre(JSON.parse(updated));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <section
      id="dra"
      className="section-container"
      role="region"
      aria-labelledby="dra-title"
    >
      <h2
        id="dra-title"
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        style={{ color: '#5A5755' }}
      >
        Sobre a Dra
      </h2>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-12">
          <div className="flex justify-center items-center">
            <div
              className="w-64 h-64 rounded-full flex items-center justify-center overflow-hidden shadow-xl"
              role="img"
              aria-label={`Foto da ${sobre.nome}`}
              style={{
                background: 'linear-gradient(to bottom-right, rgba(231, 111, 127, 0.2), rgba(231, 111, 127, 0.1))',
              }}
            >
              <img
                src={sobre.foto || 'https://via.placeholder.com/224'}
                alt={sobre.nome}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#5A5755' }}>
              {sobre.nome}
            </h3>
            
            {sobre.especializacao_principal && (
              <p className="text-lg mb-4" style={{ color: '#ff8da1' }}>
                Especialista em {sobre.especializacao_principal}
              </p>
            )}

            <p className="mb-6 leading-relaxed text-base md:text-lg" style={{ color: 'rgba(90, 87, 85, 0.9)' }}>
              {sobre.descricao}
            </p>

            <div className="grid grid-cols-1 gap-4">
              {sobre.graduacao && (
                <article
                  className="rounded-xl p-4"
                  style={{ backgroundColor: '#FDF8F4' }}
                >
                  <h4 className="text-lg font-bold mb-2" style={{ color: '#ff8da1' }}>
                    🎓 Formação
                  </h4>
                  <p style={{ color: '#5A5755' }}>
                    {sobre.graduacao}
                  </p>
                </article>
              )}

              {sobre.especializacao_principal && (
                <article
                  className="rounded-xl p-4"
                  style={{ backgroundColor: '#FDF8F4' }}
                >
                  <h4 className="text-lg font-bold mb-2" style={{ color: '#ff8da1' }}>
                    🦷 Especialização Principal
                  </h4>
                  <p style={{ color: '#5A5755' }}>{sobre.especializacao_principal}</p>
                </article>
              )}

              {sobre.compromisso && (
                <article
                  className="rounded-xl p-4"
                  style={{ backgroundColor: '#FDF8F4' }}
                >
                  <h4 className="text-lg font-bold mb-2" style={{ color: '#ff8da1' }}>
                    ⭐ Compromisso Profissional
                  </h4>
                  <p style={{ color: '#5A5755' }}>
                    {sobre.compromisso}
                  </p>
                </article>
              )}

              <article
                className="rounded-xl p-4"
                style={{ backgroundColor: '#FDF8F4' }}
              >
                <h4 className="text-lg font-bold mb-2" style={{ color: '#ff8da1' }}>
                  📋 Registros Profissionais
                </h4>
                <p style={{ color: '#5A5755' }}>
                  <strong>CROMS:</strong> {sobre.croms}<br />
                  <strong>EPAO:</strong> {sobre.epao}<br />
                  <strong>CNPJ:</strong> {sobre.cnpj}
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

