import './Main.css';
import Recettes from '../../data/recettes.json';

function Card({ recette }) {
    return (
        <div className='card'>
            <img
                className='card__img'
                src={recette.imageUrl}
                alt={recette.title}
            />
            <h2 className='card__title'>{recette.title}</h2>
            <p className='card__diff'>{'⭐'.repeat(recette.difficulty)}</p>
            <p className='card__text'>{recette.description}</p>
            <a className='card__lien' href='#'>
                En savoir plus...
            </a>
        </div>
    );
}

export default function Main() {
    return (
        <main className='container'>
            {Recettes.length > 0 ? (
                Recettes.map((recette) => (
                    <Card key={recette.id} recette={recette} />
                ))
            ) : (
                <p>Aucune recette disponible.</p>
            )}
        </main>
    );
}
