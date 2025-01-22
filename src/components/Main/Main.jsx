import './Main.css';
import Recettes from '../../data/recettes.json';
import Card from '../Card/Card';
import DetailedCard from '../DetailedCard/DetailedCard';

export default function Main({
    onSelectRecette,
    selectedRecette,
    searchQuery,
}) {
    // Filtrer les recettes en fonction de la requête de recherche
    const filteredRecettes = Recettes.filter((recette) =>
        recette.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className='container'>
            {selectedRecette ? (
                // Afficher les détails de la recette sélectionnée
                <DetailedCard
                    recette={selectedRecette}
                    onBack={() => onSelectRecette(null)} // Retour à la liste des recettes
                />
            ) : (
                // Afficher la liste des recettes filtrées
                <>
                    {filteredRecettes.length > 0 ? (
                        filteredRecettes.map((recette) => (
                            <Card
                                key={recette.id}
                                recette={recette}
                                onClick={() => onSelectRecette(recette)} // Passer à la recette sélectionnée
                            />
                        ))
                    ) : (
                        // Message si aucune recette ne correspond à la recherche
                        <p>Aucune recette ne correspond à votre recherche.</p>
                    )}
                </>
            )}
        </main>
    );
}
