import './Main.css';
import Recettes from '../../data/recettes.json';
import { useState } from 'react';
import Card from '../Card/Card';
import DetailedCard from '../DetailedCard/DetailedCard';

export default function Main() {
    const [selectedRecette, setSelectedRecette] = useState(null);

    const handleCardClick = (e, recette) => {
        e.preventDefault();
        setSelectedRecette(recette);
    };

    const handleBackClick = () => {
        setSelectedRecette(null);
    };

    return (
        <main className='container'>
            {selectedRecette ? (
                <DetailedCard
                    recette={selectedRecette}
                    onBack={handleBackClick}
                />
            ) : Recettes.length > 0 ? (
                Recettes.map((recette) => (
                    <Card
                        key={recette.id}
                        recette={recette}
                        onClick={handleCardClick}
                    />
                ))
            ) : (
                <p>Aucune recette disponible.</p>
            )}
        </main>
    );
}
