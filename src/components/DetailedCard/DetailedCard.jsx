import imgDashboard from '../../assets/img/dashboard/recettes-du-monde.jpg';
import './DetailedCard.css';
export default function DetailedCard({ recette, onBack }) {
    return (
        <div className='detailed-card'>
            <button className='back-button' onClick={onBack}>
                Retour
            </button>
            <img
                className='card__img'
                src={recette.imageUrl || imgDashboard}
                alt={recette.title}
            />
            <h1 className='card__title'>{recette.title}</h1>
            <p className='card__diff'>
                <span>Difficulty :</span>
                {'⭐'.repeat(recette.difficulty)}
            </p>
            <p className='card__text'>
                <span>Description : </span>
                {recette.description}
            </p>
            <p className='card__text'>
                <span>Ingredients : </span>
                {Array.isArray(recette.ingredients)
                    ? recette.ingredients.join(', ')
                    : recette.ingredients || (
                          <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Fugit ullam voluptas voluptatem magnam quas
                              quidem aliquam in magni neque corrupti natus
                              eveniet dicta at eum, porro optio quos
                              reprehenderit laudantium!
                          </p>
                      )}
            </p>
            <p className='card__text'>
                <span>Instructions : </span>
                {Array.isArray(recette.instructions)
                    ? recette.instructions.join(', ')
                    : recette.instructions || (
                          <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Fugit ullam voluptas voluptatem magnam quas
                              quidem aliquam in magni neque corrupti natus
                              eveniet dicta at eum, porro optio quos
                              reprehenderit laudantium!
                          </p>
                      )}
            </p>
        </div>
    );
}
