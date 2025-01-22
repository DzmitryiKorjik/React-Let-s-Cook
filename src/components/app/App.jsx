import './App.css';
import { useState } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Dashboard from '../Dashboard/Dashboard';
import DetailedCard from '../DetailedCard/DetailedCard';
import Footer from '../Footer/Footer';

export default function App() {
    const [view, setView] = useState('main'); // Statut pour la gestion des pages
    const [selectedRecette, setSelectedRecette] = useState(null); // Pour contrôler la sélection de la recette

    const showMain = () => {
        setView('main');
        setSelectedRecette(null); // Réinitialisation de la recette sélectionnée
    };

    const showDashboard = () => setView('dashboard');
    const showDetailedCard = (recette) => {
        setSelectedRecette(recette);
        setView('detailedCard');
    };

    return (
        <>
            <Header onShowMain={showMain} onShowDashboard={showDashboard} />

            {/* Rendu des pages */}
            {view === 'main' && <Main onSelectRecette={showDetailedCard} />}
            {view === 'dashboard' && <Dashboard />}
            {view === 'detailedCard' && selectedRecette && (
                <DetailedCard recette={selectedRecette} onBack={showMain} />
            )}

            <Footer />
        </>
    );
}
