import './Dashboard.css';
export default function Dashboard() {
    return (
        <section className='container recette'>
            <div className='newRecette'>
                <h1>Ajouter une recette</h1>
                <label htmlFor='titre'>Titre : </label>
                <input
                    type='text'
                    id='titre'
                    name='titre'
                    placeholder='Ex: Burger classique'
                    required
                />
                <label htmlFor='difficulty'>Difficulté (1-5) : </label>
                <input
                    type='number'
                    id='difficulty'
                    name='difficulty'
                    placeholder='0'
                    min='1'
                    max='5'
                    required
                />
                <label htmlFor='category'>Catégorie : </label>
                <input
                    type='text'
                    id='category'
                    name='category'
                    placeholder='Ex: Burger'
                    required
                />
                <label htmlFor='description'>Description : </label>
                <textarea
                    id='description'
                    name='description'
                    rows='5'
                    placeholder='Décrivez votre recette ici...'
                    required
                    maxLength='500'
                />
                <div className='btn'>
                    <button type='submit'>Ajouter la recette</button>
                    <button type='reset'>Réinitialiser</button>
                </div>
            </div>
            <div className='allRecettes'>
                <h1>Liste des recettes</h1>
            </div>
        </section>
    );
}
