import './Dashboard.css';

import btnEdit from '../../assets/icons/edit.svg';
import btnDelete from '../../assets/icons/delete.svg';

import { useState, useEffect } from 'react';
export default function Dashboard({ setRecipes }) {
    const [recipe, setRecipe] = useState({
        title: '',
        difficulty: '',
        category: '',
        description: '',
        link: '',
    });

    const [recipes, setLocalRecipes] = useState([]);
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

        if (
            recipe.title &&
            recipe.difficulty &&
            recipe.category &&
            recipe.description
        ) {
            const newRecipe = { ...recipe };

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

            setLocalRecipes(updatedRecipes); // Mise à jour du statut local
            saveToLocalStorage(updatedRecipes); // Enregistrer dans localStorage
            setRecipes(updatedRecipes); // Mettre à jour les recettes dans App.jsx

            // Reset form
            setRecipe({
                title: '',
                difficulty: '',
                category: '',
                description: '',
                link: '',
            });
        }
    };

    // Gestionnaire pour la suppression d'une recette
    const handleDeleteRecipe = (index) => {
        const updatedRecipes = recipes.filter((_, i) => i !== index);
        setLocalRecipes(updatedRecipes); // Mise à jour du statut local
        setRecipes(updatedRecipes); // Mise à jour du statut
        saveToLocalStorage(updatedRecipes); // Enregistrer dans localStorage
    };
    // Gestionnaire pour la modification d'une recette
    const handleEditRecipe = (index) => {
        const selectedRecipe = recipes[index];
        setRecipes(selectedRecipe);
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
                        value={recipe.title}
                        onChange={(e) =>
                            setRecipe({ ...recipe, title: e.target.value })
                        }
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
                        value={recipe.difficulty}
                        onChange={(e) =>
                            setRecipe({
                                ...recipe,
                                difficulty: e.target.value,
                            })
                        }
                        required
                    />
                    <label htmlFor='category'>Catégorie : </label>
                    <input
                        type='text'
                        id='category'
                        name='category'
                        placeholder='Ex: Burger'
                        value={recipe.category}
                        onChange={(e) =>
                            setRecipe({ ...recipe, category: e.target.value })
                        }
                        required
                    />
                    <label htmlFor='description'>Description : </label>
                    <textarea
                        id='description'
                        name='description'
                        rows='5'
                        placeholder='Décrivez votre recette ici...'
                        value={recipe.description}
                        onChange={(e) =>
                            setRecipe({
                                ...recipe,
                                description: e.target.value,
                            })
                        }
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
                            <div className='wrapper' key={index}>
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
