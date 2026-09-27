import { Persona } from '../types';
import { ShoppingCart, Building2, BarChart3 } from 'lucide-react';

interface HeaderProps {
  persona: Persona;
  onPersonaChange: (persona: Persona) => void;
}

export default function Header({ persona, onPersonaChange }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-border-light shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-accent">⚡</div>
          <h1 className="text-2xl font-bold text-primary">TradeLink</h1>
          <span className="ml-4 px-2 py-1 bg-accent-light text-accent text-xs font-semibold rounded">
            DEMO MODE
          </span>
        </div>

        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => onPersonaChange('buyer')}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-all font-medium ${
              persona === 'buyer'
                ? 'bg-white text-accent shadow-sm'
                : 'text-text-secondary hover:text-primary'
            }`}
          >
            <ShoppingCart size={18} />
            Buyer
          </button>
          <button
            onClick={() => onPersonaChange('seller')}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-all font-medium ${
              persona === 'seller'
                ? 'bg-white text-accent shadow-sm'
                : 'text-text-secondary hover:text-primary'
            }`}
          >
            <Building2 size={18} />
            Seller
          </button>
          <button
            onClick={() => onPersonaChange('admin')}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-all font-medium ${
              persona === 'admin'
                ? 'bg-white text-accent shadow-sm'
                : 'text-text-secondary hover:text-primary'
            }`}
          >
            <BarChart3 size={18} />
            Admin
          </button>
        </div>
      </div>
    </header>
  );
}
