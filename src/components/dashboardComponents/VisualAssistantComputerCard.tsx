import './VisualAssistantComputerCard.css';
import VALogo from '../../assets/visualAssistant.png';
import demoImg1 from '../../assets/Img1.jpeg';
import demoImg2 from '../../assets/Img2.jpeg';
import demoImg3 from '../../assets/Img3.jpeg';
import demoRecipeJSON from '../../Demo/demoRecipe.json';

import { callImageToJsonIndexAPI } from '../../handlers/chatGPTAPI';

interface VAComputerCardProps {
    setDemoMode: (demoMode: boolean) => void;
    demoMode: boolean;
}

const VisualAssistantComputerCard: React.FC<VAComputerCardProps> = ({ setDemoMode, demoMode }) => {

    const handleDemoClick = () => {
        setDemoMode(true);
    };

    const handleRadioChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const imageURL = (event.target as HTMLInputElement).value;
        
        try {
            
            const stringArray = demoRecipeJSON.instructions;
            const response = await callImageToJsonIndexAPI(imageURL, stringArray);

            const numberResponse = parseInt(response.content, 10) + 1;
            console.log(numberResponse);
            
        } catch (error) {
            console.error('Error fetching and processing image:', error);
        }
    };

    return (
        <div className="visual-assistant-computer-card">
            {demoMode ? (
                <div className="visual-assistant-demo-section">
                    <p className='visual-assistant-demo-text title'>Select a photo for your next recipe step</p>
                    <label className='demo-choice'>
                        <input type="radio" name="demoPhoto" value="https://i.postimg.cc/d0hwHML3/Img1.jpg" className='demo-radio-button' onChange={handleRadioChange}/>
                        <img src={demoImg1} alt="Demo 1" className='demo-photo'/>
                    </label>
                    <label className='demo-choice'>
                        <input type="radio" name="demoPhoto" value="https://i.postimg.cc/nLNZNdDk/Img2.jpg" className='demo-radio-button' onChange={handleRadioChange}/>
                        <img src={demoImg2} alt="Demo 2" className='demo-photo'/>
                    </label>
                    <label className='demo-choice'>
                        <input type="radio" name="demoPhoto" value="https://i.postimg.cc/Y9gk71Nw/Img3.jpg" className='demo-radio-button' onChange={handleRadioChange}/>
                        <img src={demoImg3} alt="Demo 3" className='demo-photo'/>
                    </label>
                </div>
            ) : (
                <>
                    <img src={VALogo} alt="VALogo" className='VALogo-img' />
                    <p className='visual-assistant-text'> Want to use the visual assistant yourself?</p>
                    <p className='visual-assistant-text'> Use the site on a mobile device!</p>
                    <div className='visual-assistant-demo-button' onClick={handleDemoClick}>
                        <p className='visual-assistant-demo-text'>Try Demo</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default VisualAssistantComputerCard;