import { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  LogOut,
  Settings,
  FileDown,
  FileUp,
  History,
  Lock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionToken, setSessionToken] = useState(null);
  const [activeTab, setActiveTab] = useState('especializacoes');
  const [message, setMessage] = useState(null);

  // Estados para dados
  const [especializacoes, setEspecializacoes] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [contato, setContato] = useState({});
  const [sobre, setSobre] = useState({});

  // Estados de edição
  const [editingId, setEditingId] = useState(null);
  const [editingTab, setEditingTab] = useState(null);
  const [formData, setFormData] = useState({});

  // Senha correta (em produção, usar backend)
  const ADMIN_PASSWORD = 'adrieli2024';
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutos

  useEffect(() => {
    if (isAuthenticated) {
      carregarDados();
      
      // Timeout de sessão
      const timeout = setTimeout(() => {
        handleLogout();
        mostrarMensagem('Sessão expirada por segurança', 'warning');
      }, SESSION_TIMEOUT);

      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated]);

  const mostrarMensagem = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
      setSessionToken(token);
      setIsAuthenticated(true);
      setPasswordInput('');
      mostrarMensagem('Login realizado com sucesso!');
    } else {
      mostrarMensagem('Senha incorreta!', 'error');
      setPasswordInput('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSessionToken(null);
    setPasswordInput('');
    setEditingId(null);
    setEditingTab(null);
    mostrarMensagem('Desconectado');
  };

  const carregarDados = () => {
    const esp = JSON.parse(localStorage.getItem('especializacoes') || '[]');
    const srv = JSON.parse(localStorage.getItem('servicos') || '[]');
    const con = JSON.parse(localStorage.getItem('contato') || '{}');
    const sob = JSON.parse(localStorage.getItem('sobre') || '{}');

    setEspecializacoes(esp.length > 0 ? esp : getDadosPadraoEspecializacoes());
    setServicos(srv.length > 0 ? srv : getDadosPadraoServicos());
    setContato(Object.keys(con).length > 0 ? con : getDadosPadraoContato());
    setSobre(Object.keys(sob).length > 0 ? sob : getDadosPadraoSobre());
  };

  const getDadosPadraoEspecializacoes = () => [
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
  ];

  const getDadosPadraoServicos = () => [
    { id: 1, nome: 'Limpeza Profissional', descricao: 'Limpeza completa e polimento dos dentes', imagem: '' },
    { id: 2, nome: 'Clareamento Dental', descricao: 'Clareamento profissional para um sorriso mais branco', imagem: '' },
    { id: 3, nome: 'Ortodontia', descricao: 'Correção da posição dos dentes', imagem: '' },
    { id: 4, nome: 'Restaurações', descricao: 'Restauração de dentes danificados', imagem: '' },
    { id: 5, nome: 'Implantes Dentários', descricao: 'Implante de dentes artificiais', imagem: '' },
    { id: 6, nome: 'Endodontia', descricao: 'Tratamento de canal com precisão', imagem: '' },
  ];

  const getDadosPadraoContato = () => ({
    telefone: '(67) 3212-7205',
    whatsapp: '556732127205',
    email: 'contato@odontoclass.com.br',
    endereco: 'Rua Ana Luiza de Souza, 513, Pioneiros, Campo Grande, MS 79.070-140',
    horarios: 'Seg-Sex: 08:00-18:00 | Sábado: 08:00-14:00',
  });

  const getDadosPadraoSobre = () => ({
    nome: 'Dra. Adrieli Dianessa Martins de Souza',
    croms: '5851',
    epao: '519',
    cnpj: '28.768.712/0001-74',
    foto: '',
    descricao: 'Profissional dedicada à saúde bucal, com foco em atendimento humanizado e técnicas modernas para resultados naturais e seguros. Com mais de 10 anos de experiência, a Dra. Adrieli é especializada em diversos procedimentos odontológicos e se dedica a oferecer o melhor atendimento.',
    graduacao: 'Odontologia — Universidade Anhanguera-Uniderp (2015)',
    especializacao_principal: 'Endodontia',
    compromisso: 'Atendimento de excelência com foco na saúde e bem-estar do paciente',
    certificacoes: [],
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imagem: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEspecializacao = () => {
    if (!formData.nome || !formData.descricao) {
      mostrarMensagem('Preencha todos os campos obrigatórios', 'error');
      return;
    }

    let updated;
    if (editingId) {
      updated = especializacoes.map((e) =>
        e.id === editingId ? { ...formData, id: editingId } : e
      );
      mostrarMensagem('Especialização atualizada!');
    } else {
      updated = [...especializacoes, { ...formData, id: Date.now() }];
      mostrarMensagem('Especialização adicionada!');
    }

    setEspecializacoes(updated);
    localStorage.setItem('especializacoes', JSON.stringify(updated));
    setEditingId(null);
    setFormData({});
  };

  const handleSaveServico = () => {
    if (!formData.nome || !formData.descricao) {
      mostrarMensagem('Preencha todos os campos obrigatórios', 'error');
      return;
    }

    let updated;
    if (editingId) {
      updated = servicos.map((s) =>
        s.id === editingId ? { ...formData, id: editingId } : s
      );
      mostrarMensagem('Serviço atualizado!');
    } else {
      updated = [...servicos, { ...formData, id: Date.now() }];
      mostrarMensagem('Serviço adicionado!');
    }

    setServicos(updated);
    localStorage.setItem('servicos', JSON.stringify(updated));
    setEditingId(null);
    setFormData({});
  };

  const handleSaveContato = () => {
    localStorage.setItem('contato', JSON.stringify(formData));
    setContato(formData);
    setEditingTab(null);
    mostrarMensagem('Dados de contato atualizados!');
  };

  const handleSaveSobre = () => {
    localStorage.setItem('sobre', JSON.stringify(formData));
    setSobre(formData);
    setEditingTab(null);
    mostrarMensagem('Informações atualizadas!');
  };

  const handleDelete = (id, type) => {
    if (confirm('Tem certeza que deseja deletar?')) {
      if (type === 'especializacao') {
        const updated = especializacoes.filter((e) => e.id !== id);
        setEspecializacoes(updated);
        localStorage.setItem('especializacoes', JSON.stringify(updated));
        mostrarMensagem('Especialização removida!');
      } else if (type === 'servico') {
        const updated = servicos.filter((s) => s.id !== id);
        setServicos(updated);
        localStorage.setItem('servicos', JSON.stringify(updated));
        mostrarMensagem('Serviço removido!');
      }
    }
  };

  const handleDownloadBackup = () => {
    const backup = {
      timestamp: new Date().toISOString(),
      especializacoes,
      servicos,
      contato,
      sobre,
    };

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2)));
    element.setAttribute('download', `backup-odontoclass-${Date.now()}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    mostrarMensagem('Backup baixado com sucesso!');
  };

  const handleRestoreBackup = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const backup = JSON.parse(event.target.result);
          setEspecializacoes(backup.especializacoes);
          setServicos(backup.servicos);
          setContato(backup.contato);
          setSobre(backup.sobre);

          localStorage.setItem('especializacoes', JSON.stringify(backup.especializacoes));
          localStorage.setItem('servicos', JSON.stringify(backup.servicos));
          localStorage.setItem('contato', JSON.stringify(backup.contato));
          localStorage.setItem('sobre', JSON.stringify(backup.sobre));

          mostrarMensagem('Backup restaurado com sucesso!');
        } catch (error) {
          mostrarMensagem('Erro ao restaurar backup', 'error');
        }
      };
      reader.readAsText(file);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 bg-[#5A5755] text-white p-3 rounded-full shadow-lg hover:bg-[#4a4644] transition"
        aria-label="Abrir painel administrativo"
        title="Painel Administrativo"
      >
        👩‍💼
      </button>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Lock size={28} style={{ color: '#ff8da1' }} />
              <h2 className="text-2xl font-bold text-[#5A5755]">Admin</h2>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setPasswordInput('');
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <p className="text-gray-600 mb-6">Digite sua senha de administrador</p>

          <div className="relative mb-6">
            <input
              type={showPassword ? 'text' : 'password'}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Senha"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#ff8da1] transition"
              autoFocus
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-[#ff8da1] text-white py-3 rounded-lg hover:bg-[#ff7a94] transition font-semibold text-lg"
          >
            Entrar
          </button>

          <p className="text-center text-xs text-gray-500 mt-4">
            ⏱️ Sessão expira em 30 minutos
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#ff8da1] to-[#ff7a94] text-white p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Settings size={28} />
            <h2 className="text-2xl font-bold">Painel Administrativo</h2>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition"
            title="Sair"
          >
            <LogOut size={20} />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>

        {/* Mensagem */}
        {message && (
          <div
            className={`px-6 py-3 ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800'
                : message.type === 'error'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            } flex items-center gap-2`}
          >
            {message.type === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="border-b bg-gray-50 overflow-x-auto">
          <div className="flex">
            {['especializacoes', 'servicos', 'contato', 'sobre', 'backup'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setEditingId(null);
                  setEditingTab(null);
                }}
                className={`px-6 py-3 font-semibold transition whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-b-4 border-[#ff8da1] text-[#ff8da1]'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* ESPECIALIZAÇÕES */}
          {activeTab === 'especializacoes' && (
            <div>
              <button
                onClick={() => {
                  setEditingId(null);
                  setFormData({ nome: '', descricao: '', ano: new Date().getFullYear(), imagem: '' });
                  setEditingTab('form');
                }}
                className="mb-6 bg-[#ff8da1] text-white px-6 py-2 rounded-lg hover:bg-[#ff7a94] transition flex items-center gap-2"
              >
                <Plus size={20} />
                Nova Especialização
              </button>

              {editingTab === 'form' && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold mb-4 text-[#5A5755]">
                    {editingId ? 'Editar' : 'Adicionar'} Especialização
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Nome"
                      value={formData.nome || ''}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8da1]"
                    />
                    <textarea
                      placeholder="Descrição"
                      value={formData.descricao || ''}
                      onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8da1] resize-none h-20"
                    />
                    <input
                      type="number"
                      placeholder="Ano"
                      value={formData.ano || new Date().getFullYear()}
                      onChange={(e) => setFormData({ ...formData, ano: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8da1]"
                    />
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full"
                      />
                      {formData.imagem && (
                        <img src={formData.imagem} alt="Preview" className="h-24 mt-3 rounded-lg object-cover" />
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEspecializacao}
                        className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => {
                          setEditingTab(null);
                          setEditingId(null);
                        }}
                        className="px-6 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {especializacoes.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 flex gap-4">
                    {item.imagem && (
                      <img
                        src={item.imagem}
                        alt={item.nome}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#5A5755]">{item.nome}</h4>
                      <p className="text-sm text-gray-600">{item.descricao}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.ano}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(item.id);
                          setFormData(item);
                          setEditingTab('form');
                        }}
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, 'especializacao')}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SERVIÇOS */}
          {activeTab === 'servicos' && (
            <div>
              <button
                onClick={() => {
                  setEditingId(null);
                  setFormData({ nome: '', descricao: '' });
                  setEditingTab('form');
                }}
                className="mb-6 bg-[#ff8da1] text-white px-6 py-2 rounded-lg hover:bg-[#ff7a94] transition flex items-center gap-2"
              >
                <Plus size={20} />
                Novo Serviço
              </button>

              {editingTab === 'form' && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold mb-4 text-[#5A5755]">
                    {editingId ? 'Editar' : 'Adicionar'} Serviço
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Nome do serviço"
                      value={formData.nome || ''}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8da1]"
                    />
                    <textarea
                      placeholder="Descrição"
                      value={formData.descricao || ''}
                      onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8da1] resize-none h-20"
                    />
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        📸 Imagem do Serviço
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormData({ ...formData, imagem: reader.result });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full"
                      />
                      {formData.imagem && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-600 mb-2">Preview:</p>
                          <img src={formData.imagem} alt="Preview" className="h-32 rounded-lg object-cover w-full" />
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveServico}
                        className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => {
                          setEditingTab(null);
                          setEditingId(null);
                        }}
                        className="px-6 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {servicos.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 flex gap-4">
                    {item.imagem && (
                      <img
                        src={item.imagem}
                        alt={item.nome}
                        className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#5A5755]">{item.nome}</h4>
                      <p className="text-sm text-gray-600">{item.descricao}</p>
                      {!item.imagem && (
                        <p className="text-xs text-gray-400 mt-2">📸 Clique em editar para adicionar imagem</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(item.id);
                          setFormData(item);
                          setEditingTab('form');
                        }}
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, 'servico')}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTATO */}
          {activeTab === 'contato' && (
            <div>
              {editingTab !== 'contato' ? (
                <button
                  onClick={() => {
                    setFormData(contato);
                    setEditingTab('contato');
                  }}
                  className="mb-6 bg-[#ff8da1] text-white px-6 py-2 rounded-lg hover:bg-[#ff7a94] transition flex items-center gap-2"
                >
                  <Edit2 size={20} />
                  Editar Informações
                </button>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold mb-4 text-[#5A5755]">Editar Contato</h3>
                  <div className="space-y-4">
                    <input
                      type="tel"
                      placeholder="Telefone"
                      value={formData.telefone || ''}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8da1]"
                    />
                    <input
                      type="tel"
                      placeholder="WhatsApp"
                      value={formData.whatsapp || ''}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8da1]"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8da1]"
                    />
                    <input
                      type="text"
                      placeholder="Endereço"
                      value={formData.endereco || ''}
                      onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8da1]"
                    />
                    <input
                      type="text"
                      placeholder="Horários"
                      value={formData.horarios || ''}
                      onChange={(e) => setFormData({ ...formData, horarios: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8da1]"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveContato}
                        className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => setEditingTab(null)}
                        className="px-6 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Telefone</p>
                  <p className="font-semibold text-[#5A5755]">{contato.telefone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">WhatsApp</p>
                  <p className="font-semibold text-[#5A5755]">{contato.whatsapp}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-[#5A5755]">{contato.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Endereço</p>
                  <p className="font-semibold text-[#5A5755]">{contato.endereco}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Horários</p>
                  <p className="font-semibold text-[#5A5755]">{contato.horarios}</p>
                </div>
              </div>
            </div>
          )}

          {/* SOBRE */}
          {activeTab === 'sobre' && (
            <div>
              {editingTab !== 'sobre' ? (
                <button
                  onClick={() => {
                    setFormData(sobre);
                    setEditingTab('sobre');
                  }}
                  className="mb-6 bg-[#ff8da1] text-white px-6 py-2 rounded-lg hover:bg-[#ff7a94] transition flex items-center gap-2"
                >
                  <Edit2 size={20} />
                  Editar Informações
                </button>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg mb-6 space-y-4 max-h-screen overflow-y-auto">
                  <h3 className="font-semibold mb-6 text-[#5A5755] text-lg sticky top-0 bg-gray-50 pb-2">📋 Editar Informações Profissionais</h3>
                  
                  {/* Foto */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">📸 Foto de Perfil</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormData({ ...formData, foto: reader.result });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full"
                      />
                      {formData.foto && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-600 mb-2">Preview:</p>
                          <img src={formData.foto} alt="Preview" className="h-40 rounded-lg object-cover w-40" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dados Pessoais */}
                  <div>
                    <h4 className="font-semibold text-[#5A5755] mb-3 flex items-center gap-2">👤 Dados Pessoais</h4>
                    <input
                      type="text"
                      placeholder="Nome completo"
                      value={formData.nome || ''}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8da1] mb-2"
                    />
                  </div>

                  {/* Formação Acadêmica */}
                  <div>
                    <h4 className="font-semibold text-[#5A5755] mb-3 flex items-center gap-2">🎓 Formação Acadêmica</h4>
                    <textarea
                      placeholder="Ex: Odontologia — Universidade Anhanguera-Uniderp (2015)"
                      value={formData.graduacao || ''}
                      onChange={(e) => setFormData({ ...formData, graduacao: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8da1] resize-none h-20 mb-2"
                    />
                    <p className="text-xs text-gray-500">Descreva o curso de graduação e instituição</p>
                  </div>

                  {/* Especialização Principal */}
                  <div>
                    <h4 className="font-semibold text-[#5A5755] mb-3 flex items-center gap-2">🦷 Especialização Principal</h4>
                    <input
                      type="text"
                      placeholder="Ex: Endodontia"
                      value={formData.especializacao_principal || ''}
                      onChange={(e) => setFormData({ ...formData, especializacao_principal: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8da1] mb-2"
                    />
                  </div>

                  {/* Descrição Profissional */}
                  <div>
                    <h4 className="font-semibold text-[#5A5755] mb-3 flex items-center gap-2">📝 Sobre Você (Bio Profissional)</h4>
                    <textarea
                      placeholder="Descreva sua experiência, filosofia profissional e traços marcantes..."
                      value={formData.descricao || ''}
                      onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8da1] resize-none h-24 mb-2"
                    />
                  </div>

                  {/* Compromisso Profissional */}
                  <div>
                    <h4 className="font-semibold text-[#5A5755] mb-3 flex items-center gap-2">⭐ Compromisso Profissional</h4>
                    <textarea
                      placeholder="Ex: Atendimento de excelência com foco na saúde e bem-estar do paciente"
                      value={formData.compromisso || ''}
                      onChange={(e) => setFormData({ ...formData, compromisso: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8da1] resize-none h-16 mb-2"
                    />
                  </div>

                  {/* Registros Profissionais */}
                  <div>
                    <h4 className="font-semibold text-[#5A5755] mb-3 flex items-center gap-2">📋 Registros Profissionais</h4>
                    <div className="space-y-2 mb-3">
                      <input
                        type="text"
                        placeholder="CROMS (ex: 5851)"
                        value={formData.croms || ''}
                        onChange={(e) => setFormData({ ...formData, croms: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8da1]"
                      />
                      <input
                        type="text"
                        placeholder="EPAO (ex: 519)"
                        value={formData.epao || ''}
                        onChange={(e) => setFormData({ ...formData, epao: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8da1]"
                      />
                      <input
                        type="text"
                        placeholder="CNPJ (ex: 28.768.712/0001-74)"
                        value={formData.cnpj || ''}
                        onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8da1]"
                      />
                    </div>
                  </div>

                  {/* Botões */}
                  <div className="flex gap-2 sticky bottom-0 bg-gray-50 pt-4">
                    <button
                      onClick={handleSaveSobre}
                      className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition font-semibold"
                    >
                      ✓ Salvar Tudo
                    </button>
                    <button
                      onClick={() => setEditingTab(null)}
                      className="px-6 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                <div className="flex gap-4 pb-6 border-b">
                  {sobre.foto && (
                    <img src={sobre.foto} alt={sobre.nome} className="w-32 h-32 rounded-full object-cover flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#5A5755] mb-1">{sobre.nome}</h3>
                    <p className="text-sm text-gray-600 mb-2">{sobre.especializacao_principal}</p>
                    <div className="flex gap-3 flex-wrap">
                      <span className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-700">CROMS: {sobre.croms}</span>
                      <span className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-700">EPAO: {sobre.epao}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 font-semibold">🎓 Graduação</p>
                  <p className="text-[#5A5755]">{sobre.graduacao}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 font-semibold">📝 Bio</p>
                  <p className="text-[#5A5755]">{sobre.descricao}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 font-semibold">⭐ Compromisso</p>
                  <p className="text-[#5A5755]">{sobre.compromisso}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 font-semibold">📋 CNPJ</p>
                  <p className="text-[#5A5755]">{sobre.cnpj}</p>
                </div>
              </div>
            </div>
          )}

          {/* BACKUP */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  💾 Faça backup regularmente de seus dados para evitar perdas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={handleDownloadBackup}
                  className="bg-green-500 text-white p-6 rounded-lg hover:bg-green-600 transition flex flex-col items-center gap-3"
                >
                  <FileDown size={32} />
                  <span className="font-semibold">Baixar Backup</span>
                  <span className="text-xs">Salvar dados localmente</span>
                </button>

                <label className="bg-blue-500 text-white p-6 rounded-lg hover:bg-blue-600 transition flex flex-col items-center gap-3 cursor-pointer">
                  <FileUp size={32} />
                  <span className="font-semibold">Restaurar Backup</span>
                  <span className="text-xs">Carregar arquivo de backup</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleRestoreBackup}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-[#5A5755] mb-4 flex items-center gap-2">
                  <History size={20} />
                  Informações do Backup
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📋 Especializações: {especializacoes.length}</p>
                  <p>🦷 Serviços: {servicos.length}</p>
                  <p>📱 Informações de contato: Configuradas</p>
                  <p>👤 Informações profissionais: Configuradas</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
