import { useState, useEffect } from 'react';
import './VisualAssistant.css';
import { useLocation } from 'react-router-dom';
import Header from '../components/dashboardComponents/Header';
import CameraCaptureComponent from '../components/visualAssistantComponents/CameraCaptureComponent';
import InstructionViewer from '../components/visualAssistantComponents/InstructionViewer';
import IngredientModal from '../components/visualAssistantComponents/IngredientModal';
import { useLink } from '../handlers/RecipeLink';


import IngredientIcon from '../assets/Ingredients.png';
import ImagePreview from '../assets/imagePreview.png';

interface RecipeJSON {
    title: string;
    host: string;
    total_time: number;
    yields: string;
    ingredients: string[];
    instructions: string[];
}

const VisualAssistant = () => {

    const { link } = useLink();

    const location = useLocation();
    const recipeJSON: RecipeJSON = location.state?.recipeJSON;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [instructions, setInstructions] = useState<string[]>([]);
    const [ingredients, setIngredients] = useState<string[]>([]);
    
    useEffect(() => {
        if (recipeJSON && recipeJSON.instructions) {
            setInstructions(recipeJSON.instructions);
            setIngredients(recipeJSON.ingredients);
        }
    }, [recipeJSON]);
    
    const handlePopFirstElement = () => {
        if (instructions.length > 0) {
            setInstructions((prevInstructions) => prevInstructions.slice(1));
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <> 
            {isModalOpen && <IngredientModal ingredients={ingredients} setIsModalOpen={setIsModalOpen}/>}

            <div className='visual-assistant-container'>
                <Header url={link} title={recipeJSON.title}/>
                
                <div className='visual-assistant-info-container'>
                    <div className='visual-assistant-camera-row'>
                        <img src={IngredientIcon} alt="Ingredient Icon" className='visual-assistant-ingredient-icon' onClick={toggleModal}/>
                        <div className='style-line'/>
                        <CameraCaptureComponent/>
                        <div className='style-line'/>
                        <img src={ImagePreview} alt="Image Preview" className='visual-assistant-image-preview'/>
                    </div>
                    
                    
                    <button onClick={handlePopFirstElement}>Pop First Element</button>
                    
                    <InstructionViewer instructions={instructions}/>
                    
                </div>  
            </div>
        </>
        
    );
};

export default VisualAssistant;