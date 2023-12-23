import './Header.css';
import Logo from '../../assets/whiskLogo.png';
import Link from '../../assets/Link.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();

    const navigateToHomePage = () => {
        navigate('/home');
    };

    return (
        <div className="header">
            <div className="header-content">
                <img src={Link} alt="Link" className='Link-img' />
                <img src={Logo} alt="Logo" className='Logo-img' onClick={navigateToHomePage}/>
            </div>
        </div>
    );
}

export default Header;