import { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, Eye, EyeOff, Loader } from 'lucide-react';
import { uploadToCloudinary, isUsingCloudinary } from '../utils/cloudinary';

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [especializacoes, setEspecializacoes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ nome: '', descricao: '', imagem: '', ano: new Date().getFullYear() });
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const ADMIN_PASSWORD = 'adrieli2024';

  useEffect(() => {
    const stored = localStorage.getItem('especializacoes');
    if (stored) setEspecializacoes(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('especializacoes', JSON.stringify(especializacoes));
  }, [especializacoes]);

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordInput('');
    } else {
      alert('Senha incorreta!');
      setPasswordInput('');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Arquivo muito grande! Máximo 5MB');
        return;
      }

      setIsUploadingImage(true);
      try {
        const imageUrl = await uploadToCloudinary(file);
        setFormData({ ...formData, imagem: imageUrl });
      } catch (error) {
        alert('Erro ao fazer upload da imagem: ' + error.message);
      } finally {
        setIsUploadingImage(false);
      }
    }
  };

  const handleSave = () => {
    if (!formData.nome || !formData.descricao) {
      alert('Preenchall todos os campos!');
      return;
    }

    if (editingId) {
      setEspecializacoes(
        especializacoes.map((e) =>
          e.id === editingId ? { ...formData, id: editingId } : e
        )
      );
      setEditingId(null);
    } else {
      setEspecializacoes([
        ...especializacoes,
        { ...formData, id: Date.now() },
      ]);
    }

    setFormData({ nome: '', descricao: '', imagem: '', ano: new Date().getFullYear() });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja deletar?')) {
      setEspecializacoes(especializacoes.filter((e) => e.id !== id));
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 z-40 bg-[#ff8da1] text-white p-3 rounded-full shadow-lg hover:bg-[#ff7a94] transition"
        aria-label="Abrir painel de administração"
      >
        ⚙️
      </button>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-8 w-96 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#5A5755]">Admin</h2>
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

          <p className="text-gray-600 mb-4">Digite sua senha de administrador</p>

          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Senha"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8da1]"
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
            className="w-full bg-[#ff8da1] text-white py-2 rounded-lg hover:bg-[#ff7a94] transition font-semibold"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-screen overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#5A5755]">Gerenciar Especializações</h2>
          <button
            onClick={() => {
              setIsOpen(false);
              setIsAuthenticated(false);
              setEditingId(null);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Formulário */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold text-[#5A5755] mb-4">
              {editingId ? 'Editar Especialização' : 'Adicionar Nova Especialização'}
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nome da especialização"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8da1]"
              />

              <textarea
                placeholder="Descrição"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8da1] resize-none h-24"
              />

              <input
                type="number"
                placeholder="Ano"
                value={formData.ano}
                onChange={(e) => setFormData({ ...formData, ano: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8da1]"
              />

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploadingImage}
                  className="w-full disabled:opacity-50"
                />
                {isUploadingImage && (
                  <div className="mt-4 flex items-center gap-2 text-gray-600">
                    <Loader size={20} className="animate-spin" />
                    <span>Enviando imagem...</span>
                  </div>
                )}
                {formData.imagem && !isUploadingImage && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <img src={formData.imagem} alt="Preview" className="h-32 rounded-lg object-cover" />
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={isUploadingImage}
                  className="flex-1 bg-[#ff8da1] text-white py-2 rounded-lg hover:bg-[#ff7a94] transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={20} />
                  {editingId ? 'Atualizar' : 'Adicionar'}
                </button>

                {editingId && (
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setFormData({ nome: '', descricao: '', imagem: '', ano: new Date().getFullYear() });
                    }}
                    className="px-4 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Lista de especializações */}
          <div>
            <h3 className="text-lg font-semibold text-[#5A5755] mb-4">Especializações ({especializacoes.length})</h3>

            {especializacoes.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Nenhuma especialização adicionada ainda</p>
            ) : (
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
                      <p className="text-sm text-gray-600 line-clamp-2">{item.descricao}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.ano}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                        aria-label="Editar"
                      >
                        <Edit2 size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                        aria-label="Deletar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
