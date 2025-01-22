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
    const [searchQuery, setSearchQuery] = useState(''); // pour la recherche de la recette

    const showMain = () => {
        setView('main');
        setSelectedRecette(null); // Réinitialisation de la recette sélectionnée
        setSearchQuery('');
    };

    const showDashboard = () => setView('dashboard');
    const showDetailedCard = (recette) => {
        setSelectedRecette(recette);
        setView('detailedCard');
    };

    const handleSearch = (query) => {
        setSearchQuery(query); // Mise à jour de la recherche
    };

    return (
        <>
            <Header
                view={view}
                onShowMain={showMain}
                onShowDashboard={showDashboard}
                onSearch={handleSearch} // Transfert de la fonction de recherche
                searchQuery={searchQuery} // Transmission de la requête de recherche à l'en-tête
            />

            {/* Rendu des pages */}
            {view === 'main' && (
                <Main
                    onSelectRecette={showDetailedCard}
                    searchQuery={searchQuery}
                />
            )}
            {view === 'dashboard' && <Dashboard />}
            {view === 'detailedCard' && selectedRecette && (
                <DetailedCard recette={selectedRecette} onBack={showMain} />
            )}

            <Footer />
        </>
    );
}
