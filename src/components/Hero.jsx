export default function Hero() {
  return (
    <section
      id="inicio"
      className="text-white py-20 md:py-32 text-center"
      style={{
        background: 'linear-gradient(to bottom, #ff8da1, rgba(231, 111, 127, 0.9))',
      }}
      role="region"
      aria-labelledby="hero-title"
    >
      <div className="max-w-4xl mx-auto px-4">
        <h1 id="hero-title" className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Sorrisos saudáveis começam aqui
        </h1>
        <p className="text-lg md:text-xl opacity-95 mb-8 max-w-2xl mx-auto">
          Cuidado odontológico moderno, humano e especializado para toda a família.
        </p>
        <a
          href="#contato"
          className="inline-block px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:opacity-90"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            border: '2px solid white',
          }}
          aria-label="Agendar consulta"
        >
          Agendar Consulta
        </a>
      </div>
    </section>
  );
}

