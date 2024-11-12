import { Heart, Github, Mail, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-white border-t">
        <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <span className="text-sm text-gray-600">Sevgiyle yapıldı!</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
        </div>  
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <a 
                    href="mailto:enscskun@gmail.com" 
                    className="text-sm flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                <Mail className="w-4 h-4" />
                    <span>İletişim</span>
                </a>
                <a 
                    href="https://github.com/enscskn/pativakti" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                </a>
                <a 
                    href="https://www.linkedin.com/in/enscskn/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
                </a>

                <span className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} PatiVakti
                </span>
            </div>
        </div>
        </div>
    </footer>
    );
} 