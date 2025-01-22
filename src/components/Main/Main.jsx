import './Main.css';
import Recettes from '../../data/recettes.json';
import Card from '../Card/Card';
import DetailedCard from '../DetailedCard/DetailedCard';

export default function Main({ onSelectRecette, selectedRecette }) {
    return (
        <main className='container'>
            {selectedRecette ? (
                // Affichage de la recette sélectionnée
                <DetailedCard
                    recette={selectedRecette}
                    onBack={() => onSelectRecette(null)} // Retour à la liste des recettes
                />
            ) : (
                // Affichage de la liste des recettes
                <>
                    {Recettes.length > 0 ? (
                        Recettes.map((recette) => (
                            <Card
                                key={recette.id}
                                recette={recette}
                                onClick={() => onSelectRecette(recette)} // Passage à la recette sélectionnée
                            />
                        ))
                    ) : (
                        <p>Aucune recette disponible.</p>
                    )}
                </>
            )}
        </main>
    );
}
