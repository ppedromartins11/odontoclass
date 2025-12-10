import { useState } from 'react';
import { X } from 'lucide-react';

export default function ImageModal({ isOpen, imageSrc, imageAlt, onClose }) {
  if (!isOpen || !imageSrc) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visualizador de imagem"
    >
      <div
        className="relative max-w-4xl max-h-screen flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition z-10"
          aria-label="Fechar visualizador"
        >
          <X size={24} style={{ color: '#5A5755' }} />
        </button>

        <img
          src={imageSrc}
          alt={imageAlt}
          className="max-w-full max-h-screen object-contain rounded-lg"
        />
      </div>
    </div>
  );
}
