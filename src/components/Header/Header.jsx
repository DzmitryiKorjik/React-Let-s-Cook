import './Header.css';

import logo from '../../assets/icons/logo.svg';
import userIcon from '../../assets/icons/plus.svg';
import banner from '../../assets/img/banner.jpg';

export default function Header({ onShowMain, onShowDashboard }) {
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
                    <input type='text' placeholder='Rechercher...' />
                    <button>Rechercher</button>
                    <a
                        href='#'
                        onClick={(e) => {
                            e.preventDefault();
                            onShowDashboard();
                        }}
                    >
                        <img src={userIcon} />
                    </a>
                </div>
            </header>
            <section className='subheader'>
                <img src={banner} alt='banner' />
                <h1>Toutes le recettes</h1>
            </section>
        </>
    );
}
