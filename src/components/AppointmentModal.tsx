import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Appointment {
  id: number;
  petId: number;
  date: string;
  time: string;
  type: string;
  notes: string;
}

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (appointment: Omit<Appointment, 'id'>) => void;
  pets: Array<{ id: number; name: string }>;
  appointment?: Appointment | null;
}

export default function AppointmentModal({
  isOpen,
  onClose,
  onAdd,
  pets,
  appointment
}: AppointmentModalProps) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    type: 'veteriner',
    notes: '',
    petId: '',
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        date: appointment.date,
        time: appointment.time,
        type: appointment.type,
        notes: appointment.notes,
        petId: appointment.petId.toString(),
      });
    } else {
      setFormData({
        date: '',
        time: '',
        type: 'veteriner',
        notes: '',
        petId: '',
      });
    }
  }, [appointment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      petId: parseInt(formData.petId, 10),
    });
    setFormData({ date: '', time: '', type: 'veteriner', notes: '', petId: '' });
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

        <h2 className="text-2xl font-bold mb-6">
          {appointment ? 'Randevu Düzenle' : 'Yeni Randevu Ekle'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Evcil Hayvan
            </label>
            <select
              required
              value={formData.petId}
              onChange={(e) => setFormData({ ...formData, petId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Seçiniz</option>
              {pets.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Randevu Türü
            </label>
            <select
              required
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="veteriner">Veteriner Kontrolü</option>
              <option value="asi">Aşı</option>
              <option value="bakim">Bakım</option>
              <option value="egzersiz">Egzersiz</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tarih
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Saat
            </label>
            <input
              type="time"
              required
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
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
              placeholder="Ek notlar..."
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
              {appointment ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}