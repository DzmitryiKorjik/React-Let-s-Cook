import './Header.css';

import logo from '../../assets/logo.svg';
import userIcon from '../../assets/user.svg';
import banner from '../../assets/banner.jpg';

export default function Header() {
    return (
        <>
            <header>
                <div className='header__link-img'>
                    <img src={logo} />
                </div>
                <div className='header__link'>
                    <a href=''>Accueil</a>
                </div>
                <div className='header__search'>
                    <input type='text' placeholder='Rechercher...' />
                    <button>Rechercher</button>
                    <a href='#'>
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
