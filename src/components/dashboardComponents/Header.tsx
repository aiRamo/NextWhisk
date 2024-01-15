import './Header.css';
import Home from '../../assets/Home.png';
import Link from '../../assets/Link.png';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    url: string;
    title: string;
}


const Header = ({ url, title }: HeaderProps) => {

    const navigate = useNavigate();

    const navigateToHomePage = () => {
        navigate('/home');
    };

    const redirectToSource = (url: string) => {
        console.log("Redirecting to:", url); // Add this line to debug
        window.open(url, "_blank");
    };

    return (
        <div className="header">
            <div className="header-content">
                <img src={Link} alt="Link" className='Link-img' onClick={() => redirectToSource(url)}/>
                <h1 className='header-title'>{title}</h1>
                <img src={Home} alt="Logo" className='Logo-img' onClick={navigateToHomePage}/>
            </div>
        </div>
    );
}

export default Header;