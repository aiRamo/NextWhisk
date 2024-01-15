import './RecipeDashboard.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import RecipeSummarySection from '../components/dashboardComponents/RecipeSummarySection';
import VisualAssistantComputerCard from '../components/dashboardComponents/VisualAssistantComputerCard';
import VisualAssistantButton from '../components/dashboardComponents/VisualAssistantButton';
import Header from '../components/dashboardComponents/Header';
import { useLink } from '../handlers/RecipeLink';

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

    const isMobile = isMobileDevice();

    const { link } = useLink();

    useEffect(() => {    
        console.log(recipeJSON);
    }, [recipeJSON]);

    return (
        <div className="recipe-dashboard-container">
            <Header url={link} title={recipeJSON.title}/>
            <div className="recipe-dashboard">
                { isMobile && <VisualAssistantButton recipeJSON={recipeJSON}/>}
                <div className="recipe-dashboard-info">
                    <RecipeSummarySection response='Success' recipeJSON={recipeJSON} />
                </div>
                { !isMobile && <VisualAssistantComputerCard/>}
            </div>
        </div>
    );
};

export default RecipeDashboard;