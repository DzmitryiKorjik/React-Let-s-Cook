import './App.css';
import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Dashboard from '../Dashboard/Dashboard';
import DetailedCard from '../DetailedCard/DetailedCard';
import Footer from '../Footer/Footer';
import Recettes from '../../data/recettes.json';

export default function App() {
    // Gestion de l'état de la page actuelle ("main", "dashboard" ou "detailedCard")
    const [view, setView] = useState('main');

    // Stocke la recette sélectionnée pour l'affichage détaillé
    const [selectedRecette, setSelectedRecette] = useState(null);

    // Stocke la requête de recherche saisie par l'utilisateur
    const [searchQuery, setSearchQuery] = useState('');

    // État contenant la liste des recettes, initialisé avec les données du localStorage si disponibles
    const [recipes, setRecipes] = useState(() => {
        const storedRecipes = localStorage.getItem('recipes');
        return storedRecipes ? JSON.parse(storedRecipes) : [];
    });

    // Effet pour charger les recettes depuis localStorage au montage du composant
    useEffect(() => {
        const storedRecipes = localStorage.getItem('recipes');
        if (storedRecipes) {
            setRecipes(JSON.parse(storedRecipes));
        }
    }, []);

    // Effet pour sauvegarder les recettes dans localStorage à chaque mise à jour de recipes
    useEffect(() => {
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }, [recipes]);

    // Fonction permettant de mettre à jour la liste des recettes et de les sauvegarder
    const updateRecipes = (newRecipes) => {
        setRecipes(newRecipes);
    };

    // Fonction pour afficher la page principale
    const showMain = () => {
        setView('main');
        setSelectedRecette(null); // Réinitialise la recette sélectionnée
        setSearchQuery(''); // Réinitialise la recherche
    };

    // Fonction pour afficher le tableau de bord (Dashboard)
    const showDashboard = () => setView('dashboard');

    // Fonction pour afficher une recette en détail
    const showDetailedCard = (recette) => {
        setSelectedRecette(recette);
        setView('detailedCard');
    };

    // Fonction pour gérer la recherche de recettes
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <>
            {/* En-tête avec les contrôles de navigation et de recherche */}
            <Header
                view={view}
                onShowMain={showMain}
                onShowDashboard={showDashboard}
                onSearch={handleSearch}
                searchQuery={searchQuery}
            />

            {/* Affichage conditionnel en fonction de la vue actuelle */}
            {view === 'main' && (
                <Main
                    onSelectRecette={showDetailedCard}
                    searchQuery={searchQuery}
                    recipes={[...Recettes, ...recipes]} // Combine les recettes par défaut et celles ajoutées
                />
            )}
            {view === 'dashboard' && (
                <Dashboard setRecipes={setRecipes} recipes={recipes} />
            )}
            {view === 'detailedCard' && selectedRecette && (
                <DetailedCard recette={selectedRecette} onBack={showMain} />
            )}

            {/* Pied de page */}
            <Footer />
        </>
    );
}
