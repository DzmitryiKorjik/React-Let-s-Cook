import './Main.css';
import Card from '../Card/Card';
import DetailedCard from '../DetailedCard/DetailedCard';

export default function Main({
    onSelectRecette,
    selectedRecette,
    searchQuery,
    recipes, // Ajout de la réception des recettes combinées
}) {
    // Filtrer les recettes en fonction de la requête de recherche
    const filteredRecettes = recipes.filter((recette) =>
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
                        filteredRecettes.map((recette, index) => (
                            <Card
                                key={
                                    recette.id ? recette.id : `recette-${index}`
                                } // Génère un key unique si id est absent
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
