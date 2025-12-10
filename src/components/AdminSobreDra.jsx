import { useState, useEffect } from 'react';
import { X, Edit2, Save, Loader } from 'lucide-react';
import { uploadToCloudinary } from '../utils/cloudinary';

export default function AdminSobreDra() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    nome: 'Dra. Adrieli Dianessa Martins de Souza',
    croms: '5851',
    epao: '519',
    cnpj: '28.768.712/0001-74',
    foto: 'https://via.placeholder.com/224',
    descricao: 'Profissional dedicada a saude bucal, com foco em atendimento humanizado e tecnicas modernas.',
    graduacao: 'Odontologia - Universidade Anhanguera-Uniderp (2015)',
    especializacao_principal: 'Endodontia',
    compromisso: 'Atendimento de excelencia com foco na saude e bem-estar',
  });

  const ADMIN_PASSWORD = 'adrieli2024';

  useEffect(() => {
    const stored = localStorage.getItem('sobre');
    if (stored) {
      setFormData(JSON.parse(stored));
    }
  }, []);

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
      if (file.size > 5 * 1024 * 1024) {
        alert('Arquivo muito grande! Maximo 5MB');
        return;
      }

      setIsUploadingImage(true);
      try {
        const imageUrl = await uploadToCloudinary(file);
        setFormData({ ...formData, foto: imageUrl });
      } catch (error) {
        alert('Erro ao fazer upload da imagem: ' + error.message);
      } finally {
        setIsUploadingImage(false);
      }
    }
  };

  const handleSave = () => {
    if (!formData.nome || !formData.croms || !formData.foto) {
      alert('Preencha todos os campos obrigatorios!');
      return;
    }

    localStorage.setItem('sobre', JSON.stringify(formData));
    setIsEditing(false);
    alert('Dados atualizados com sucesso!');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-32 right-6 z-40 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
        aria-label="Editar perfil da doutora"
        title="Editar Sobre a Dra"
      >
        ✏️
      </button>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-8 w-96 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#5A5755]">Editar Perfil</h2>
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

          <div className="mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Senha"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-screen overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#5A5755]">
            {isEditing ? 'Editar Perfil da Dra' : 'Perfil da Dra'}
          </h2>
          <button
            onClick={() => {
              setIsOpen(false);
              setIsAuthenticated(false);
              setIsEditing(false);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {!isEditing ? (
            <>
              <div className="mb-6 flex justify-center">
                <img
                  src={formData.foto}
                  alt={formData.nome}
                  className="w-48 h-48 rounded-full object-cover shadow-lg"
                />
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Nome</p>
                  <p className="text-lg text-[#5A5755]">{formData.nome}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Especializacao</p>
                  <p className="text-lg text-[#ff8da1]">{formData.especializacao_principal}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Descricao</p>
                  <p className="text-base text-gray-700">{formData.descricao}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">CROMS</p>
                    <p className="text-base text-[#5A5755]">{formData.croms}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">EPAO</p>
                    <p className="text-base text-[#5A5755]">{formData.epao}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-semibold flex items-center justify-center gap-2"
              >
                <Edit2 size={20} />
                Editar Perfil
              </button>
            </>
          ) : (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Foto da Dra</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploadingImage}
                    className="w-full disabled:opacity-50"
                  />
                  {isUploadingImage && (
                    <div className="mt-2 flex items-center gap-2 text-gray-600">
                      <Loader size={20} className="animate-spin" />
                      <span>Enviando imagem...</span>
                    </div>
                  )}
                  {formData.foto && !isUploadingImage && (
                    <img src={formData.foto} alt="Preview" className="mt-4 h-32 rounded-lg object-cover" />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nome *</label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Especializacao Principal</label>
                <input
                  type="text"
                  value={formData.especializacao_principal}
                  onChange={(e) => setFormData({ ...formData, especializacao_principal: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Descricao</label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Formacao/Graduacao</label>
                <input
                  type="text"
                  value={formData.graduacao}
                  onChange={(e) => setFormData({ ...formData, graduacao: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Compromisso Profissional</label>
                <textarea
                  value={formData.compromisso}
                  onChange={(e) => setFormData({ ...formData, compromisso: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-16"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">CROMS *</label>
                  <input
                    type="text"
                    value={formData.croms}
                    onChange={(e) => setFormData({ ...formData, croms: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">EPAO</label>
                  <input
                    type="text"
                    value={formData.epao}
                    onChange={(e) => setFormData({ ...formData, epao: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">CNPJ</label>
                  <input
                    type="text"
                    value={formData.cnpj}
                    onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isUploadingImage}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Save size={20} />
                  Salvar Alteracoes
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
