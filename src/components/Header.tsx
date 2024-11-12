import logo from '../images/logo.png';

export default function Header() {
  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <img 
              src={logo} 
              alt="PatiVakti Logo" 
              className="w-16 h-16"
            />
            <span className="text-xl font-bold">PatiVakti</span>
          </div>
        </div>
      </div>
    </header>
  );
}