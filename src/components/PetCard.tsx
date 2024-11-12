import { Heart, Calendar, Activity } from 'lucide-react';

interface PetCardProps {
  id: number;
  name: string;
  breed: string;
  age: number;
  imageUrl: string;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onHealthClick: () => void;
}

export default function PetCard({
  id,
  name,
  breed,
  age,
  imageUrl,
  isFavorite,
  onToggleFavorite,
  onHealthClick
}: PetCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={() => onToggleFavorite(id)}
            className="p-2 bg-white/90 rounded-full hover:bg-white"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? 'fill-rose-500 text-rose-500' : 'text-gray-400'
              }`}
            />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600">{breed}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-1 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{age} yaşında</span>
          </div>
          <button
            onClick={onHealthClick}
            className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800"
          >
            <Activity className="w-4 h-4" />
            <span className="text-sm">Sağlık Durumu</span>
          </button>
        </div>
      </div>
    </div>
  );
}