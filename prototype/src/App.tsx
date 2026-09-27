import { useState, useCallback } from 'react';
import { AppState, Persona } from './types';
import { generateMockData } from './mockData';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import BuyerView from './pages/BuyerView';
import SellerView from './pages/SellerView';
import AdminView from './pages/AdminView';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'app'>('landing');
  const [persona, setPersona] = useState<Persona>('buyer');
  const [appState, setAppState] = useState<AppState>(generateMockData());

  const handlePersonaChange = (newPersona: Persona) => {
    setPersona(newPersona);
  };

  const handleStartDemo = () => {
    setCurrentPage('app');
  };

  const updateAppState = useCallback((updates: Partial<AppState>) => {
    setAppState(prev => ({ ...prev, ...updates }));
  }, []);

  if (currentPage === 'landing') {
    return <LandingPage onStartDemo={handleStartDemo} />;
  }

  return (
    <div className="bg-bg-light min-h-screen">
      <Header persona={persona} onPersonaChange={handlePersonaChange} />
      <main className="pt-20">
        {persona === 'buyer' && (
          <BuyerView appState={appState} updateAppState={updateAppState} />
        )}
        {persona === 'seller' && (
          <SellerView appState={appState} updateAppState={updateAppState} />
        )}
        {persona === 'admin' && (
          <AdminView appState={appState} updateAppState={updateAppState} />
        )}
      </main>
    </div>
  );
}

export default App;
