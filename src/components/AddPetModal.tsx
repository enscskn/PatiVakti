import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface AddPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (pet: {
    name: string;
    breed: string;
    age: number;
    imageUrl: string;
  }) => void;
}

export default function AddPetModal({ isOpen, onClose, onAdd }: AddPetModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=500',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      age: parseInt(formData.age, 10),
    });
    setFormData({ name: '', breed: '', age: '', imageUrl: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Yeni Evcil Hayvan Ekle</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              İsim
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Evcil hayvanınızın adı"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tür/Irk
            </label>
            <input
              type="text"
              required
              value={formData.breed}
              onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Örn: Golden Retriever"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Yaş
            </label>
            <input
              type="number"
              required
              min="0"
              max="30"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Yaş"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fotoğraf URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=500"
              />
              <button
                type="button"
                className="btn btn-secondary flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary flex-1"
            >
              İptal
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1"
            >
              Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}