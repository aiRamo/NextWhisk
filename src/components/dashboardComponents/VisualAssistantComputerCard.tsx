import './VisualAssistantComputerCard.css';
import VALogo from '../../assets/visualAssistant.png';

const VisualAssistantComputerCard = () => {

    return (
        <div className="visual-assistant-computer-card">  
            <img src={VALogo} alt="VALogo" className='VALogo-img' />
            <p className='visual-assistant-text'> Want to try the visual assistant?</p>
            <p className='visual-assistant-text'> Use the site on a mobile device!</p>
        </div>
    );
};

export default VisualAssistantComputerCard;