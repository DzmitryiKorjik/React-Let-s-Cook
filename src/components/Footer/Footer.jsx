import './Footer.css';

import facebook from '../../assets/facebook.svg';
import instagram from '../../assets/instagram.svg';
import twitter from '../../assets/twitter.svg';

export default function Footer() {
    return (
        <footer>
            <div className='footer__social'>
                <a href='#'>
                    <img src={facebook} alt='Facebook' />
                </a>
                <a href='#'>
                    <img src={instagram} alt='Instagram' />
                </a>
                <a href='#'>
                    <img src={twitter} alt='Twitter' />
                </a>
            </div>
            <p>&copy; 2025 Let's Cook. Tous droits réservés.</p>
        </footer>
    );
}
