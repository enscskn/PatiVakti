import React, { useState } from 'react';
import { X } from 'lucide-react';

interface UpdateHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (healthData: {
    temperature: number;
    weight: number;
    status: string;
    notes: string;
  }) => void;
  pet: {
    name: string;
    breed: string;
  };
}

export default function UpdateHealthModal({ isOpen, onClose, onUpdate, pet }: UpdateHealthModalProps) {
  const [formData, setFormData] = useState({
    temperature: '38.5',
    weight: '',
    status: 'healthy',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      ...formData,
      temperature: parseFloat(formData.temperature),
      weight: parseFloat(formData.weight),
    });
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

        <h2 className="text-2xl font-bold mb-6">{pet.name} - Sağlık Durumu Güncelle</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Genel Durum
            </label>
            <select
              required
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="healthy">Sağlıklı</option>
              <option value="sick">Hasta</option>
              <option value="recovering">İyileşiyor</option>
              <option value="critical">Kritik</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vücut Isısı (°C)
            </label>
            <input
              type="number"
              required
              step="0.1"
              min="35"
              max="43"
              value={formData.temperature}
              onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ağırlık (kg)
            </label>
            <input
              type="number"
              required
              step="0.1"
              min="0"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notlar
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows={3}
              placeholder="Sağlık durumu ile ilgili notlar..."
            />
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
              Güncelle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}