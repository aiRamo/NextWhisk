import './RecipeDashboard.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import RecipeSummarySection from '../components/dashboardComponents/RecipeSummarySection';

interface RecipeJSON {
    title: string;
    host: string;
    total_time: number;
    yields: string;
    ingredients: string[];
    instructions: string[];
  }

const RecipeDashboard = () => {
    const location = useLocation();
    const recipeJSON: RecipeJSON = location.state?.recipeJSON;

    useEffect(() => {    
        console.log(recipeJSON);
    }, [recipeJSON]);

    return (
        <div className="recipe-dashboard-container">
            <div className="recipe-dashboard">
                <div className="recipe-dashboard-info">
                    <RecipeSummarySection response='Success' recipeJSON={recipeJSON} />
                </div>
            </div>
        </div>
    );
};

export default RecipeDashboard;