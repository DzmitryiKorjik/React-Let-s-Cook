import './Dashboard.css';

import btnEdit from '../../assets/icons/edit.svg';
import btnDelete from '../../assets/icons/delete.svg';

import { useState, useEffect } from 'react';
export default function Dashboard() {
    const [recipes, setRecipes] = useState([]);
    const [title, setTitle] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [editIndex, setEditIndex] = useState(null); // Pour suivre l'enregistrement en cours d'édition

    // Charger les données de localStorage lors du montage d'un composant
    useEffect(() => {
        const storedRecipes = localStorage.getItem('recipes');
        if (storedRecipes) {
            setRecipes(JSON.parse(storedRecipes));
        }
    }, []);

    // Enregistrer les données de localStorage lors de la démontage d'un composant
    const saveToLocalStorage = (recipes) => {
        localStorage.setItem('recipes', JSON.stringify(recipes));
    };

    // Gestionnaire pour l'ajout d'une recette
    const handleAddRecipe = (e) => {
        e.preventDefault();

        if (title && difficulty && category && description) {
            const newRecipe = {
                title,
                difficulty,
                category,
                description,
                link,
            };

            // Mettre à jour les recettes avec la nouvelle recette
            let updatedRecipes;
            if (editIndex !== null) {
                // Remplacer la recette éditée par la nouvelle
                updatedRecipes = [...recipes];
                updatedRecipes[editIndex] = newRecipe;
                setEditIndex(null);
            } else {
                // Ajouter une nouvelle recette
                updatedRecipes = [...recipes, newRecipe];
            }

            setRecipes(updatedRecipes); // Mise à jour du statut
            saveToLocalStorage(updatedRecipes); // Enregistrer dans localStorage

            // Réinitialiser les valeurs des champs du formulaire
            setTitle('');
            setDifficulty('');
            setCategory('');
            setDescription('');
        }
    };

    // Gestionnaire pour la suppression d'une recette
    const handleDeleteRecipe = (index) => {
        const updatedRecipes = recipes.filter((_, i) => i !== index);
        setRecipes(updatedRecipes); // Mise à jour du statut
        saveToLocalStorage(updatedRecipes); // Enregistrer dans localStorage
    };
    // Gestionnaire pour la modification d'une recette
    const handleEditRecipe = (index) => {
        const recipe = recipes[index];
        setTitle(recipe.title);
        setDifficulty(recipe.difficulty);
        setCategory(recipe.category);
        setDescription(recipe.description);
        setLink(recipe.link);
        setEditIndex(index); // Réglage de l'index de la recette modifiée
    };

    return (
        <section className='container recette'>
            <div className='new-recette'>
                <h1 className='recette-title'>Ajouter une recette</h1>
                <form onSubmit={handleAddRecipe}>
                    <label htmlFor='titre'>Titre : </label>
                    <input
                        type='text'
                        id='titre'
                        name='titre'
                        placeholder='Ex: Burger classique'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        required
                    />
                    <label htmlFor='category'>Catégorie : </label>
                    <input
                        type='text'
                        id='category'
                        name='category'
                        placeholder='Ex: Burger'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                    <label htmlFor='description'>Description : </label>
                    <textarea
                        id='description'
                        name='description'
                        rows='5'
                        placeholder='Décrivez votre recette ici...'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        maxLength='500'
                    />
                    <div className='btn'>
                        <button type='submit'>
                            {editIndex !== null
                                ? 'Enregistrer les modifications'
                                : 'Ajouter une recette'}
                        </button>
                        <button
                            type='reset'
                            onClick={() => {
                                setTitle('');
                                setDifficulty('');
                                setCategory('');
                                setDescription('');
                                setEditIndex(null); // Annuler le mode d'édition
                            }}
                        >
                            Réinitialiser
                        </button>
                    </div>
                </form>
            </div>
            <div className='all-recettes'>
                <h1 className='recette-title'>Liste des recettes</h1>
                {recipes.length > 0 ? (
                    <section>
                        {recipes.map((recipe, index) => (
                            <div className='wrapper'>
                                <div
                                    className='all-recettes__conatiner'
                                    key={`${recipe.title}-${index}`}
                                >
                                    <h2 className='all-recettes__title'>
                                        {recipe.title}
                                    </h2>
                                    <p className='all-recettes__text'>
                                        <span>Difficulté :</span>
                                        {'⭐'.repeat(recipe.difficulty)}
                                    </p>
                                    <p className='all-recettes__text'>
                                        <span>Catégorie : </span>{' '}
                                        {recipe.category}
                                    </p>
                                    <p className='all-recettes__text'>
                                        <span>Description : </span>
                                        {recipe.description}
                                    </p>
                                </div>
                                <div className='all-recettes__liens'>
                                    <a
                                        className='all-recettes__lien'
                                        href='#'
                                        onClick={() => handleEditRecipe(index)}
                                    >
                                        <img src={btnEdit} alt='edit' />
                                    </a>
                                    <a
                                        className='all-recettes__lien'
                                        href='#'
                                        onClick={() =>
                                            handleDeleteRecipe(index)
                                        }
                                    >
                                        <img src={btnDelete} alt='delete' />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </section>
                ) : (
                    <p>Vous n'avez aucune recette enregistrée.</p>
                )}
            </div>
        </section>
    );
}
