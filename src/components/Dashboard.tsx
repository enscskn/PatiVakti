import { useState, useEffect } from 'react';
import { Plus, Calendar, Heart } from 'lucide-react';
import PetCard from './PetCard';
import AddPetModal from './AddPetModal';
import PetHealthModal from './PetHealthModal';
import AppointmentModal from './AppointmentModal';
import UpdateHealthModal from './UpdateHealthModal';
import AppointmentListModal from './AppointmentListModal';
import Footer from './Footer';
import { getStorageItem, setStorageItem } from '../utils/storage';

interface Pet {
  id: number;
  name: string;
  breed: string;
  age: number;
  imageUrl: string;
  isFavorite: boolean;
}

interface Appointment {
  id: number;
  petId: number;
  date: string;
  time: string;
  type: string;
  notes: string;
}

interface HealthRecord {
  id: number;
  petId: number;
  date: string;
  type: string;
  status: string;
  temperature: number;
  weight: number;
  notes: string;
}

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isAppointmentListOpen, setIsAppointmentListOpen] = useState(false);
  const [isUpdateHealthModalOpen, setIsUpdateHealthModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [pets, setPets] = useState<Pet[]>(() => 
    getStorageItem('pets', [])
  );

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const savedAppointments = localStorage.getItem('appointments');
    return savedAppointments ? JSON.parse(savedAppointments) : [];
  });

  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>(() => {
    const savedHealthRecords = localStorage.getItem('healthRecords');
    return savedHealthRecords ? JSON.parse(savedHealthRecords) : [];
  });

  useEffect(() => {
    setStorageItem('pets', pets);
  }, [pets]);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('healthRecords', JSON.stringify(healthRecords));
  }, [healthRecords]);

  const handleAddPet = (petData: Omit<Pet, 'id' | 'isFavorite'>) => {
    const newPet: Pet = {
      ...petData,
      id: Date.now(),
      isFavorite: false
    };
    setPets(prevPets => [...prevPets, newPet]);
  };

  const handleAddAppointment = (appointmentData: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now(),
    };
    setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
    setIsAppointmentModalOpen(false);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsAppointmentModalOpen(true);
    setIsAppointmentListOpen(false);
  };

  const handleDeleteAppointment = (id: number) => {
    setAppointments(appointments.filter(app => app.id !== id));
  };

  const handleUpdateHealth = (healthData: Omit<HealthRecord, 'id' | 'petId' | 'date'>) => {
    if (!selectedPet) return;

    const newRecord: HealthRecord = {
      ...healthData,
      id: Date.now(),
      petId: selectedPet.id,
      date: new Date().toISOString().split('T')[0],
    };

    setHealthRecords(prevRecords => {
      const existingRecordIndex = prevRecords.findIndex(
        record => record.petId === selectedPet.id && record.date === newRecord.date
      );

      if (existingRecordIndex !== -1) {
        const updatedRecords = [...prevRecords];
        updatedRecords[existingRecordIndex] = newRecord;
        return updatedRecords;
      }
      return [...prevRecords, newRecord];
    });

    setIsUpdateHealthModalOpen(false);
  };

  const handleToggleFavorite = (id: number) => {
    setPets(pets.map(pet =>
      pet.id === id ? { ...pet, isFavorite: !pet.isFavorite } : pet
    ));
  };

  const sortedPets = [...pets].sort((a, b) => {
    if (a.isFavorite === b.isFavorite) return 0;
    return a.isFavorite ? -1 : 1;
  });

  const calculateOverallHealth = () => {
    const latestRecords = pets.map(pet => {
      const records = healthRecords.filter(record => record.petId === pet.id);
      return records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    }).filter(record => record); // undefined kayıtları filtrele

    if (latestRecords.length === 0) return 'Veri Yok';

    const statusCounts = latestRecords.reduce((acc, record) => {
      acc[record.status] = (acc[record.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    if (statusCounts['critical'] > 0) return 'Kritik';
    if (statusCounts['sick'] > 0) return 'Dikkat';
    if (statusCounts['recovering'] > 0) return 'İyileşiyor';
    return 'İyi';
  };

  const getHealthColor = (status: string) => {
    const colors = {
      'İyi': 'from-emerald-500 to-emerald-600',
      'İyileşiyor': 'from-yellow-500 to-yellow-600',
      'Dikkat': 'from-orange-500 to-orange-600',
      'Kritik': 'from-red-500 to-red-600',
      'Veri Yok': 'from-gray-500 to-gray-600'
    } as const;
    return colors[status as keyof typeof colors] || colors['Veri Yok'];
  };

  return (
    <div className="min-h-screen flex flex-col pb-16">
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Hoş Geldiniz 👋</h1>
          <div className="flex space-x-4">
            <button 
              onClick={() => setIsAppointmentModalOpen(true)}
              className="btn btn-primary flex items-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Randevu Ekle</span>
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Evcil Hayvan Ekle</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setIsAppointmentListOpen(true)}
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl p-6 text-white text-left hover:from-indigo-600 hover:to-indigo-700 transition-all"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-6 h-6" />
              <h2 className="text-lg font-semibold">Yaklaşan Randevular</h2>
            </div>
            <p className="text-2xl font-bold">{appointments.length}</p>
            <p className="text-indigo-100">Bu hafta</p>
          </button>

          <div className={`bg-gradient-to-r ${getHealthColor(calculateOverallHealth())} rounded-xl p-6 text-white`}>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-6 h-6" />
              <h2 className="text-lg font-semibold">Sağlık Durumu</h2>
            </div>
            <p className="text-2xl font-bold">{calculateOverallHealth()}</p>
            <p className="text-emerald-100">
              {pets.length} evcil hayvan
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Evcil Hayvanlarım ({pets.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPets.map(pet => (
            <PetCard
              key={pet.id}
              {...pet}
              onToggleFavorite={handleToggleFavorite}
              onHealthClick={() => setSelectedPet(pet)}
            />
          ))}
        </div>

        <AddPetModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddPet}
        />

        <AppointmentModal
          isOpen={isAppointmentModalOpen}
          onClose={() => {
            setIsAppointmentModalOpen(false);
            setSelectedAppointment(null);
          }}
          onAdd={handleAddAppointment}
          pets={pets.map(pet => ({ id: pet.id, name: pet.name }))}
          appointment={selectedAppointment}
        />

        <AppointmentListModal
          isOpen={isAppointmentListOpen}
          onClose={() => setIsAppointmentListOpen(false)}
          appointments={appointments}
          pets={pets}
          onEdit={handleEditAppointment}
          onDelete={handleDeleteAppointment}
        />

        {selectedPet && (
          <PetHealthModal
            isOpen={!!selectedPet}
            onClose={() => setSelectedPet(null)}
            onUpdateHealth={() => {
              setIsUpdateHealthModalOpen(true);
            }}
            pet={selectedPet}
            healthRecords={healthRecords.filter(record => record.petId === selectedPet.id)}
          />
        )}

        {selectedPet && (
          <UpdateHealthModal
            isOpen={isUpdateHealthModalOpen}
            onClose={() => setIsUpdateHealthModalOpen(false)}
            onUpdate={(healthData) => handleUpdateHealth({...healthData, type: 'checkup'})}
            pet={selectedPet}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
