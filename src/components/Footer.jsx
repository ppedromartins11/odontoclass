export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="text-white"
      style={{ backgroundColor: '#ff8da1' }}
      role="contentinfo"
      aria-label="Rodapé"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          <section role="region" aria-labelledby="contato-footer">
            <h3 id="contato-footer" className="text-xl font-bold mb-6">
              Contato
            </h3>
            <div className="space-y-3">
              <p>
                <span className="font-semibold">Telefone:</span>
                <a
                  href="tel:+5565999999999"
                  className="hover:opacity-80 transition-opacity focus:outline-none focus:underline"
                >
                  {' '}(67) 3212-7205
                </a>
              </p>
              <p>
                <span className="font-semibold">WhatsApp:</span>
                <a
                  href="https://wa.me/5567999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity focus:outline-none focus:underline"
                >
                  {' '}(67) 99999-9999
                </a>
              </p>
              <p>
                <span className="font-semibold">Email:</span>
                <a
                  href="mailto:contato@odontoclass.com"
                  className="hover:opacity-80 transition-opacity focus:outline-none focus:underline"
                >
                  {' '}odontoclass@hotmail.com
                </a>
              </p>
            </div>
          </section>

          <section role="region" aria-labelledby="horario-footer" className="text-center">
            <h3 id="horario-footer" className="text-xl font-bold mb-6">
              Horário de Funcionamento
            </h3>
            <div className="space-y-2 text-sm md:text-base">
              <p>Segunda a Sexta: 8h - 18h</p>
              <p>Sábado: 9h - 13h</p>
              <p>Domingo: Fechado</p>
            </div>
          </section>

          <section role="region" aria-labelledby="redes-footer">
            <h3 id="redes-footer" className="text-xl font-bold mb-6">
              Redes Sociais
            </h3>
            <div className="flex gap-4 justify-start md:justify-start">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-white"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 12a11 11 0 11-10.1-10.95v4.2h2.9V9.9h-2.9v2.5c0 .6.3.9.9.9h2v2.8c-.5.1-2.2.3-3.5.3-3.5 0-5.9-2.1-5.9-6V7h-3v-2.8h3v-2c0-3 1.8-4.6 4.5-4.6 1.3 0 2.4.1 2.8.2v3.1h-1.9c-1.5 0-1.8.7-1.8 1.8v2.3h3.6l-.5 2.8h-3.1v6.8c5.2-.4 9.1-5 9.1-10.8z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-white"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.205 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 11.428 2.873 1.44 1.44 0 01-.429-2.873z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-white"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
            </div>
          </section>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Localização</h3>
          <div className="rounded-lg overflow-hidden shadow-lg h-64 md:h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.5742!2d-55.4773!3d-20.4697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sOdonto%20Class!2sRua%20Ana%20Luiza%20de%20Souza%2C%20513%20-%20Pioneiros%2C%20Campo%20Grande%2C%20MS%2079070-140!5e0!3m2!1spt-BR!2sbr!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização de Odonto Class em Campo Grande, MS"
            />
          </div>
        </div>

        <div className="border-t border-white/20 pt-4 pb-3 text-center text-sm md:text-base">
          <p>
            © {currentYear} Odonto Class. Todos os direitos reservados.
          </p>
          <p className="mt-2 opacity-80">
            CNPJ: 28.768.712/0001-74 | CROMS: 5851 | EPAO: 519
          </p>
        </div>
      </div>
    </footer>
  );
}

