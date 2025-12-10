import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

// Funções de validação
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePhone = (phone) => {
  const regex = /^[\d\-\(\)\s]{10,}$/;
  return regex.test(phone);
};

const validateName = (name) => {
  return name.trim().length >= 3;
};

const validateMessage = (message) => {
  return message.trim().length >= 10;
};

export default function Contato() {
  const [contato, setContato] = useState({
    telefone: '(67) 3212-7205',
    whatsapp: '556732127205',
    email: 'contato@odontoclass.com.br',
    endereco: 'Rua Ana Luiza de Souza, 513, Pioneiros, Campo Grande, MS 79.070-140',
    horarios: 'Seg-Sex: 08:00-18:00 | Sábado: 08:00-14:00',
  });

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpar erro quando usuário começa a digitar
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar todos os campos
    const newErrors = {};
    
    if (!validateName(formData.nome)) {
      newErrors.nome = 'Nome deve ter pelo menos 3 caracteres';
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (formData.telefone && !validatePhone(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido';
    }
    if (!validateMessage(formData.mensagem)) {
      newErrors.mensagem = 'Mensagem deve ter pelo menos 10 caracteres';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Se passou em todas as validações
    console.log('Formulário enviado com validação:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ nome: '', email: '', telefone: '', mensagem: '' });
      setIsSubmitted(false);
      setErrors({});
    }, 3000);
  };

  return (
    <section
      id="contato"
      className="section-container bg-gray-50"
      role="region"
      aria-labelledby="contato-title"
    >
      <h2
        id="contato-title"
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        style={{ color: '#5A5755' }}
      >
        Entre em Contato
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-6" style={{ color: '#5A5755' }}>
            Envie sua Mensagem
          </h3>

          {isSubmitted ? (
            <div
              className="rounded-lg p-6 text-center"
              role="status"
              aria-live="polite"
              style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '2px solid #22c55e', color: '#166534' }}
            >
              <p className="text-lg font-semibold mb-2">✓ Mensagem Enviada com Sucesso!</p>
              <p>Responderemos em breve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="nome"
                  className="block text-sm font-semibold mb-2"
                  style={{ color: '#5A5755' }}
                >
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                    errors.nome ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-[#ff8da1]'
                  }`}
                  aria-required="true"
                  aria-invalid={errors.nome ? 'true' : 'false'}
                />
                {errors.nome && (
                  <p className="flex items-center gap-2 mt-1 text-sm text-red-600">
                    <AlertCircle size={16} /> {errors.nome}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-2"
                  style={{ color: '#5A5755' }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                    errors.email ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-[#ff8da1]'
                  }`}
                  aria-required="true"
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && (
                  <p className="flex items-center gap-2 mt-1 text-sm text-red-600">
                    <AlertCircle size={16} /> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="telefone"
                  className="block text-sm font-semibold mb-2"
                  style={{ color: '#5A5755' }}
                >
                  Telefone/WhatsApp
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(XX) 9XXXX-XXXX"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                    errors.telefone ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-[#ff8da1]'
                  }`}
                  aria-invalid={errors.telefone ? 'true' : 'false'}
                />
                {errors.telefone && (
                  <p className="flex items-center gap-2 mt-1 text-sm text-red-600">
                    <AlertCircle size={16} /> {errors.telefone}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="mensagem"
                  className="block text-sm font-semibold mb-2"
                  style={{ color: '#5A5755' }}
                >
                  Mensagem *
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Descreva sua dúvida ou solicitação..."
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors resize-none ${
                    errors.mensagem ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-[#ff8da1]'
                  }`}
                  aria-required="true"
                  aria-invalid={errors.mensagem ? 'true' : 'false'}
                />
                {errors.mensagem && (
                  <p className="flex items-center gap-2 mt-1 text-sm text-red-600">
                    <AlertCircle size={16} /> {errors.mensagem}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-lg text-white text-lg font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2"
                style={{ backgroundColor: '#ff8da1' }}
              >
                Enviar Mensagem
              </button>

              <p className="text-xs text-gray-500 text-center">
                * Campos obrigatórios
              </p>
            </form>
          )}
        </div>

        <div className="space-y-8">
          <article className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#ff8da1' }}>
              📞 Telefone
            </h3>
            <a
              href={`tel:+55${contato.telefone?.replace(/\D/g, '')}`}
              className="text-lg hover:opacity-80 transition-opacity focus:outline-none focus:underline"
              style={{ color: '#5A5755' }}
            >
              {contato.telefone}
            </a>
          </article>

          <article className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#ff8da1' }}>
              💬 WhatsApp
            </h3>
            <a
              href={`https://wa.me/${contato.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg hover:opacity-80 transition-opacity focus:outline-none focus:underline flex items-center gap-2"
              style={{ color: '#5A5755' }}
            >
              {contato.telefone}
            </a>
          </article>

          <article className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#ff8da1' }}>
              ✉️ Email
            </h3>
            <a
              href={`mailto:${contato.email}`}
              className="text-lg hover:opacity-80 transition-opacity focus:outline-none focus:underline"
              style={{ color: '#5A5755' }}
            >
              {contato.email}
            </a>
          </article>

          <article className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#ff8da1' }}>
              📍 Endereço
            </h3>
            <p className="text-lg leading-relaxed" style={{ color: '#5A5755' }}>
              {contato.endereco}
            </p>
          </article>

          <article className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#ff8da1' }}>
              🕐 Horários
            </h3>
            <p className="text-lg" style={{ color: '#5A5755' }}>
              {contato.horarios}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

