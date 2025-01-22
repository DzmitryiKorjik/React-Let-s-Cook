import './Header.css';

import { useState } from 'react';

import logo from '../../assets/icons/logo.svg';
import userIcon from '../../assets/icons/plus.svg';
import banner from '../../assets/img/banner.jpg';

export default function Header({
    view,
    searchQuery,
    onShowMain,
    onShowDashboard,
    onSearch,
}) {
    const titleRecette = 'Toutes le recettes';
    const titleDashboard = 'Dashboard';

    return (
        <>
            <header>
                <div className='header__link-img'>
                    <img src={logo} />
                </div>
                <div className='header__link'>
                    <a
                        href='#'
                        onClick={(e) => {
                            e.preventDefault();
                            onShowMain();
                        }}
                    >
                        Accueil
                    </a>
                </div>
                <div className='header__search'>
                    <input
                        type='text'
                        placeholder='Rechercher...'
                        value={searchQuery} // Lien vers l'état de la recherche
                        onChange={(e) => onSearch(e.target.value)} // Mise à jour de l'état de la recherche
                    />

                    <div className='header__add'>
                        <a
                            href='#'
                            onClick={(e) => {
                                e.preventDefault();
                                onShowDashboard();
                            }}
                        >
                            <img src={userIcon} />
                        </a>
                        <span>Ajouter recette</span>
                    </div>
                </div>
            </header>
            <section className='subheader'>
                <img src={banner} alt='banner' />
                <h1>{view === 'main' ? titleRecette : titleDashboard}</h1>
            </section>
        </>
    );
}
