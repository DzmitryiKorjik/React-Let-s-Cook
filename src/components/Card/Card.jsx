export default function Card({ recette, onClick }) {
    return (
        <div className='card'>
            <img
                className='card__img'
                src={recette.imageUrl}
                alt={recette.title}
            />
            <h2 className='card__title'>{recette.title}</h2>
            <p className='card__diff'>
                <span>Difficulty :</span>
                {'⭐'.repeat(recette.difficulty)}
            </p>
            <p className='card__text'>
                <span>Description : </span>
                {recette.description}
            </p>
            <a
                className='card__lien'
                href='#'
                onClick={(e) => onClick(e, recette)}
            >
                En savoir plus...
            </a>
        </div>
    );
}
