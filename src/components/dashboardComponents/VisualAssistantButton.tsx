import './VisualAssistantButton.css';
import { useNavigate } from 'react-router-dom';

interface RecipeJSON {
    title: string;
    host: string;
    total_time: number;
    yields: string;
    ingredients: string[];
    instructions: string[];
  }


interface VisualAssistantButtonProps {
    recipeJSON: RecipeJSON;
}

const VisualAssistantButton = ({recipeJSON}: VisualAssistantButtonProps) => {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/vassistant', {state: { recipeJSON }});
    };


    return (

        <div className='visual-assistant-wrapper'>
            <button className='visual-assistant-button' onClick={handleButtonClick} >Try Visual Assistant</button>
        </div>
    );
};

export default VisualAssistantButton;