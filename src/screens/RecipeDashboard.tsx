import './RecipeDashboard.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RecipeSummarySection from '../components/dashboardComponents/RecipeSummarySection';
import VisualAssistantComputerCard from '../components/dashboardComponents/VisualAssistantComputerCard';
import VisualAssistantButton from '../components/dashboardComponents/VisualAssistantButton';
import Header from '../components/dashboardComponents/Header';
import { useLink } from '../handlers/RecipeLink';
import demoRecipeJSON from '../Demo/demoRecipe.json';

interface RecipeJSON {
    title: string;
    host: string;
    total_time: number;
    yields: string;
    ingredients: string[];
    instructions: string[];
  }

const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};


const RecipeDashboard = () => {
    const location = useLocation();
    const recipeJSON: RecipeJSON = location.state?.recipeJSON;

    const [demoMode, setDemoMode] = useState(false);
    const [detectedIndex, setDetectedIndex] = useState<number | null>(null);

    const isMobile = isMobileDevice();

    const { link } = useLink();

    useEffect(() => {    
        console.log(recipeJSON);
    }, [recipeJSON]);

    return (
        <div className="recipe-dashboard-container">
            <Header url={link} title={demoMode ? demoRecipeJSON.title : recipeJSON.title}/>
            <div className="recipe-dashboard">
                { isMobile && <VisualAssistantButton recipeJSON={demoMode ? demoRecipeJSON : recipeJSON}/>}
                <div className="recipe-dashboard-info">
                    <RecipeSummarySection response='Success' recipeJSON={demoMode ? demoRecipeJSON : recipeJSON} detectedIndex={detectedIndex} />
                </div>
                { !isMobile && <VisualAssistantComputerCard setDemoMode={setDemoMode} demoMode={demoMode} setDetectedIndex={setDetectedIndex}/> }
            </div>
        </div>
    );
};

export default RecipeDashboard;