// Configuração do Cloudinary para upload de imagens
// INSTRUÇÕES: 
// 1. Crie uma conta em https://cloudinary.com (é grátis)
// 2. Vá para Settings > Upload e crie um UNSIGNED preset chamado 'odontoclass'
// 3. Copie seu Cloud Name do dashboard
// 4. Substitua os valores abaixo:

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dus2qbxmq';
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET || 'odontoclass';

export const uploadToCloudinary = async (file) => {
  // Se CLOUD_NAME não foi configurado, use fallback com localStorage
  if (CLOUD_NAME === 'your-cloud-name') {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }

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
    // Fallback: usar base64
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }
};

export const deleteFromCloudinary = async (publicId) => {
  // Para deletar, seria necessário usar signed uploads ou backend
  console.warn('Delete não implementado - seria necessário backend ou signed uploads');
};

export const isUsingCloudinary = () => {
  return CLOUD_NAME !== 'your-cloud-name';
};
