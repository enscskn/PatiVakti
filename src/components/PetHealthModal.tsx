import { X, Activity, Thermometer, Plus } from 'lucide-react';

interface HealthRecord {
  id: number;
  date: string;
  type: string;
  status: string;
  temperature: number;
  weight: number;
  notes: string;
}

interface PetHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateHealth: () => void;
  pet: {
    name: string;
    breed: string;
    imageUrl: string;
  };
  healthRecords: HealthRecord[];
}

export default function PetHealthModal({
  isOpen,
  onClose,
  onUpdateHealth,
  pet,
  healthRecords
}: PetHealthModalProps) {
  if (!isOpen) return null;

  const sortedRecords = [...healthRecords].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getStatusColor = (status: string) => {
    const colors = {
      healthy: 'bg-green-100 text-green-800',
      sick: 'bg-red-100 text-red-800',
      recovering: 'bg-yellow-100 text-yellow-800',
      critical: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      healthy: 'Sağlıklı',
      sick: 'Hasta',
      recovering: 'İyileşiyor',
      critical: 'Kritik'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const latestRecord = sortedRecords[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl relative max-h-[90vh] overflow-hidden flex flex-col">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={pet.imageUrl}
              alt={pet.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold">{pet.name} Sağlık Durumu</h2>
              <p className="text-gray-600">{pet.breed}</p>
            </div>
          </div>
          <button
            onClick={onUpdateHealth}
            className="btn btn-primary flex items-center space-x-2 mr-8"
          >
            <Plus className="w-4 h-4 fap" />
            <span>Durum Güncelle</span>
          </button>
        </div>

        {latestRecord && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-green-700 mb-2">
                <Activity className="w-5 h-5" />
                <span className="font-semibold">Genel Durum</span>
              </div>
              <p className={`inline-flex px-2 py-1 rounded-full text-sm ${getStatusColor(latestRecord.status)}`}>
                {getStatusLabel(latestRecord.status)}
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-blue-700 mb-2">
                <Thermometer className="w-5 h-5" />
                <span className="font-semibold">Son Ölçümler</span>
              </div>
              <div className="space-y-1">
                <p className="text-blue-800">{latestRecord.temperature}°C</p>
                <p className="text-blue-800">{latestRecord.weight} kg</p>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-y-auto flex-1">
          <h3 className="font-semibold text-lg mb-4">Sağlık Geçmişi</h3>
          <div className="bg-white border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlem
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ölçümler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(record.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status)}`}>
                        {getStatusLabel(record.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.temperature}°C, {record.weight} kg
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}