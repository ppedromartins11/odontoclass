import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#inicio', label: 'Início' },
    { href: '#servicos', label: 'Serviços' },
    { href: '#dra', label: 'Sobre a Dra' },
    { href: '#especializacoes', label: 'Especializações' },
    { href: '#contato', label: 'Contato' },
  ];

  return (
    <header
      className="sticky top-0 z-40 text-white shadow-lg md:py-4"
      style={{ backgroundColor: '#ff8da1' }}
      role="banner"
    >
      <nav
        className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center"
        aria-label="Navegação principal"
      >
        <div className="text-2xl md:text-3xl font-bold">
          <a href="#inicio" aria-label="Odonto Class - Início">
            Odonto Class
          </a>
        </div>

        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:opacity-80 transition-opacity font-semibold focus:outline-none focus:underline"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Menu de navegação"
          aria-controls="mobile-menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="absolute top-full left-0 right-0 shadow-lg md:hidden"
            style={{ backgroundColor: '#ff8da1' }}
            role="navigation"
            aria-label="Menu mobile"
          >
            <div className="flex flex-col gap-4 p-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:opacity-80 transition-opacity font-semibold focus:outline-none focus:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

