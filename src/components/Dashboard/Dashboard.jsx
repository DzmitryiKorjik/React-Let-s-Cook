import './Dashboard.css';

import btnEdit from '../../assets/icons/edit.svg';
import btnDelete from '../../assets/icons/delete.svg';
import imgDashboard from '../../assets/img/dashboard/recettes-du-monde.jpg';

import { useState, useEffect } from 'react';

export default function Dashboard({ recipes, setRecipes }) {
    // Définition de l'état pour stocker les informations d'une recette
    const [recipe, setRecipe] = useState({
        title: '',
        difficulty: '',
        category: '',
        description: '',
        ingredients: '',
        instructions: '',
        link: '',
        image: '',
    });

    // État pour suivre l'index de la recette en cours d'édition
    const [editIndex, setEditIndex] = useState(null);

    // État permettant de suivre le chargement de l'image
    const [imageUploaded, setImageUploaded] = useState(false);

    // Charger les données depuis le localStorage lors du montage du composant
    useEffect(() => {
        const storedRecipes = localStorage.getItem('recipes');
        console.log(
            'Type de recipes:',
            typeof recipes,
            Array.isArray(recipes) ? '✅ Tableau' : '❌ Pas un tableau'
        );
        if (storedRecipes) {
            setRecipes(JSON.parse(storedRecipes));
        }
    }, []);

    // Gestion de l'ajout et de la modification d'une recette
    const handleAddRecipe = (e) => {
        e.preventDefault();

        if (
            recipe.title &&
            recipe.difficulty &&
            recipe.category &&
            recipe.description
        ) {
            // Ajouter l'image par défaut si elle est absente
            if (!recipe.image) {
                recipe.image = imgDashboard;
            }

            // Vérifier si recipes est bien un tableau
            const newRecipes = Array.isArray(recipes) ? [...recipes] : [];

            if (editIndex !== null) {
                newRecipes[editIndex] = recipe; // Modification d'une recette existante
                setEditIndex(null);
            } else {
                newRecipes.push(recipe); // Ajout d'une nouvelle recette
            }

            setRecipes(newRecipes); // Mise à jour de l'état global
            setRecipe({
                title: '',
                difficulty: '',
                category: '',
                description: '',
                link: '',
                image: '',
            });
        }
    };

    // Gestion de la suppression d'une recette
    const handleDeleteRecipe = (index) => {
        const updatedRecipes = recipes.filter((_, i) => i !== index);
        setRecipes(updatedRecipes);
    };

    // Gestion de l'édition d'une recette
    const handleEditRecipe = (index) => {
        setRecipe(recipes[index]);
        setEditIndex(index);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0]; // Récupère le fichier sélectionné
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file); // Convertit le fichier en Base64
            reader.onloadend = () => {
                setRecipe((prevRecipe) => ({
                    ...prevRecipe,
                    image: reader.result, // Stocke l'image en Base64
                }));
            };
            setImageUploaded(true);
        }
    };

    return (
        <section className='container recette'>
            <div className='new-recette'>
                <h1 className='recette-title'>Ajouter une recette</h1>
                <form onSubmit={handleAddRecipe}>
                    <input
                        type='file'
                        id='image'
                        className='input__image'
                        accept='image/*'
                        onChange={(e) => handleImageUpload(e)}
                    />
                    <button
                        className='custom-file-button'
                        onClick={() => document.getElementById('image').click()}
                    >
                        Ajouter image
                    </button>
                    {imageUploaded && (
                        <p>L'image a été ajoutée avec succès !</p>
                    )}
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
                    <label htmlFor='description'>Ingredients : </label>
                    <textarea
                        id='ingredients'
                        name='ingredients'
                        rows='2'
                        placeholder='Les ingrédients de votre recette sont ici...'
                        value={recipe.ingredients}
                        onChange={(e) =>
                            setRecipe({
                                ...recipe,
                                ingredients: e.target.value,
                            })
                        }
                        required
                        maxLength='300'
                    />
                    <label htmlFor='description'>Instructions : </label>
                    <textarea
                        id='instructions'
                        name='instructions'
                        rows='2'
                        placeholder='Les instructions de votre recette sont ici...'
                        value={recipe.instructions}
                        onChange={(e) =>
                            setRecipe({
                                ...recipe,
                                instructions: e.target.value,
                            })
                        }
                        required
                        maxLength='300'
                    />
                    <div className='btn'>
                        <button type='submit'>
                            {editIndex !== null
                                ? 'Enregistrer les modifications'
                                : 'Ajouter une recette'}
                        </button>
                        <button
                            type='reset'
                            onClick={() =>
                                setRecipe({
                                    title: '',
                                    difficulty: '',
                                    category: '',
                                    description: '',
                                    link: '',
                                })
                            }
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
                                <img
                                    className='recipe-image'
                                    src={recipe.image || imgDashboard} // Si pas d'image, on utilise imgDashboard
                                    alt={recipe.title}
                                />
                                <div
                                    className='all-recettes__container'
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
                                        <img src={btnEdit} alt='Modifier' />
                                    </a>
                                    <a
                                        className='all-recettes__lien'
                                        href='#'
                                        onClick={() =>
                                            handleDeleteRecipe(index)
                                        }
                                    >
                                        <img src={btnDelete} alt='Supprimer' />
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
