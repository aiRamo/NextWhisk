import { useState, useEffect } from 'react';
import './VisualAssistant.css';
import Header from '../components/dashboardComponents/Header';
import CameraCaptureComponent from '../components/visualAssistantComponents/CameraCaptureComponent';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface RecipeJSON {
    title: string;
    host: string;
    total_time: number;
    yields: string;
    ingredients: string[];
    instructions: string[];
}
const listVariants = {
    firstItem: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    secondItem: { opacity: 0.4, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.2, ease: "linear" } }
};

const VisualAssistant = () => {

    const location = useLocation();
    const recipeJSON: RecipeJSON = location.state?.recipeJSON;

    // Create a state variable for instructions
    const [instructions, setInstructions] = useState<string[]>([]);
    

    // Update the instructions state when recipeJSON changes
    useEffect(() => {
        if (recipeJSON && recipeJSON.instructions) {
            setInstructions(recipeJSON.instructions);
        }
    }, [recipeJSON]);
    
    // Function to pop the first element from the instructions
    const handlePopFirstElement = () => {
        if (instructions.length > 0) {
            // Trigger the removal animation by setting state
            setInstructions((prevInstructions) => prevInstructions.slice(1));
        }
    };

    return (

        <div className='visual-assistant-container'>
            <Header/>
            
            <div className='visual-assistant-info-container'>
                <CameraCaptureComponent/>
                
                <button onClick={handlePopFirstElement}>Pop First Element</button>
                <div className='visual-assistant-recipe-info'>
                    <AnimatePresence>
                        {instructions.slice(0, 2).map((instruction, index) => (
                            <motion.ul 
                                key={instruction}
                                layout
                                className={`visual-assistant-list-entity`}
                                initial={index === 0 ? "firstItem" : "secondItem"}
                                animate={index === 0 ? "firstItem" : "secondItem"}
                                exit="exit"
                                variants={listVariants}
                            >
                                {instruction}
                            </motion.ul>
                        ))}
                    </AnimatePresence>
                </div>

                
            </div>

            
            
        </div>
    );
};

export default VisualAssistant;