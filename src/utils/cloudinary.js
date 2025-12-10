// Configuração do Cloudinary para upload de imagens
const CLOUD_NAME = 'your-cloud-name'; // Substitua pelo seu cloud name
const UPLOAD_PRESET = 'odontoclass-images'; // Preset unsigned para uploads

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Erro no upload da imagem');
    }

    const data = await response.json();
    return data.secure_url; // Retorna a URL pública da imagem
  } catch (error) {
    console.error('Erro ao fazer upload para Cloudinary:', error);
    throw error;
  }
};

export const deleteFromCloudinary = async (publicId) => {
  // Para deletar, seria necessário usar signed uploads ou backend
  // Por enquanto, vamos deixar apenas upload
  console.warn('Delete não implementado - seria necessário backend ou signed uploads');
};
