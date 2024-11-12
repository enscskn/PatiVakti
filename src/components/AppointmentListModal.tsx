import { X, Calendar, Edit2, Trash2 } from 'lucide-react';

interface Appointment {
  id: number;
  petId: number;
  date: string;
  time: string;
  type: string;
  notes: string;
}

interface Pet {
  id: number;
  name: string;
}

interface AppointmentListModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  pets: Pet[];
  onEdit: (appointment: Appointment) => void;
  onDelete: (id: number) => void;
}

export default function AppointmentListModal({
  isOpen,
  onClose,
  appointments,
  pets,
  onEdit,
  onDelete,
}: AppointmentListModalProps) {
  if (!isOpen) return null;

  const sortedAppointments = [...appointments].sort((a, b) => 
    new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime()
  );

  const getPetName = (petId: number) => {
    return pets.find(pet => pet.id === petId)?.name || 'Bilinmeyen';
  };

  const getAppointmentTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      veteriner: 'Veteriner Kontrolü',
      asi: 'Aşı',
      bakim: 'Bakım',
      egzersiz: 'Egzersiz'
    };
    return types[type] || type;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl relative max-h-[90vh] overflow-hidden flex flex-col">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <Calendar className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold">Yaklaşan Randevular</h2>
        </div>

        <div className="overflow-y-auto flex-1">
          {sortedAppointments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Henüz randevu bulunmuyor
            </div>
          ) : (
            <div className="grid gap-4">
              {sortedAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-indigo-100 rounded-full p-2">
                        <Calendar className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {getPetName(appointment.petId)}
                        </h3>
                        <p className="text-gray-600">
                          {getAppointmentTypeLabel(appointment.type)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onEdit(appointment)}
                        className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-indigo-50"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(appointment.id)}
                        className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Tarih</p>
                      <p className="font-medium">{formatDate(appointment.date)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Saat</p>
                      <p className="font-medium">{appointment.time}</p>
                    </div>
                  </div>
                  {appointment.notes && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-500">Notlar</p>
                      <p className="text-gray-700">{appointment.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}