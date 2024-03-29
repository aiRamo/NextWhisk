import { useEffect, useState, useRef } from 'react';
import './SearchResultCard.css';
import { handleUrlRecipeParser } from '../../handlers/recipeHandlerAPI';
import { useNavigate } from 'react-router-dom';
import NutrientData from './NutrientData';
import { useLink } from '../../handlers/RecipeLink';


interface SearchResultItem {
    link: string;
    thumbnail?: string;
}

interface SearchResultCardProps {
    result: SearchResultItem;
}

interface NutrientInfo {
    servingSize: string;
    calories: string;
    carbohydrateContent: string;
    proteinContent: string;
    fatContent: string;
    saturatedFatContent: string;
    cholesterolContent: string;
    sodiumContent: string;
    fiberContent: string;
    sugarContent: string;
  }
  
  interface RecipeJSON {
    title: string;
    host: string;
    total_time: number;
    yields: string;
    ingredients: string[];
    instructions: string[];
    nutrients: NutrientInfo; // Change this line
  }

export const SearchResultCard: React.FC<SearchResultCardProps> = ({ result }) => {

    const [image, setImage] = useState<Array<{ src: string }>>([]);
    const [response, setResponse] = useState('');
    const [recipeJSON, setRecipeJSON] = useState<RecipeJSON>(); // Assign the initial value to defaultJSON

    const [showModal, setShowModal] = useState(false);
    const [animateModal, setAnimateModal] = useState(false);
    const [animationPhase, setAnimationPhase] = useState<'idle' | 'fadeIn' | 'fadeOut'>('idle');
    const timeoutRef = useRef<number | null>(null);

    const { updateLink } = useLink();

    const handleMouseEnter = () => {
        if (animationPhase !== 'fadeIn') {
            setAnimationPhase('fadeIn');
        }
    };

    const handleMouseLeave = () => {
        if (animationPhase !== 'fadeOut') {
            setAnimationPhase('fadeOut');
        }
    };

    useEffect(() => {
        if (animationPhase === 'fadeIn') {
            setShowModal(true);
            setAnimateModal(true);
        } else if (animationPhase === 'fadeOut') {
            setAnimateModal(false);
            timeoutRef.current = window.setTimeout(() => {
                setShowModal(false);
            }, 500);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [animationPhase]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipeData = async () => {
            await handleUrlRecipeParser(result.link, setResponse, setRecipeJSON);
        };

        fetchRecipeData();
    }, [result.link]);

    useEffect(() => {
        if (result.thumbnail) {
            setImage([{ src: result.thumbnail }]);
        } else {
            setImage([]);
        }
    }, [result]);

    useEffect(() => { 
        if (response === 'Success'){
            console.log(recipeJSON);
        }
    }, [recipeJSON]);

    const handleCardClick = () => {
        updateLink(result.link);
        navigate('/dashboard', {state: { recipeJSON }}); // Navigate to RecipeDashboard when the card is clicked
    };

    
    return (
        
        response === 'Success' && (

        <>
            <div className='search-result-card-container' 
            onClick={handleCardClick} 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
                
                <img src={image.length > 0 ? image[0].src : 'default-placeholder-image.jpg'} alt="recipe" className='search-result-card-img' /> \
                <div className='search-result-card-img-overlay'/>
                <div className='search-result-card-info'>
                    <div className='search-result-card-info-header'>
                        <p className='search-result-card-title'>{recipeJSON?.title}</p>
                        <p className='search-result-card-host'>{recipeJSON?.host}</p>  
                    </div>
                    <div className='search-result-card-infoWrapper'>
                        <p className='search-result-card-time'>{recipeJSON?.total_time} mins</p>
                        <p className='search-result-card-yield'>{recipeJSON?.yields}</p>
                        <p className='search-result-card-ingredientCount'>Ingredients: {recipeJSON?.ingredients.length}</p>
                    </div>
                </div>
            </div>

            {showModal && (     
                <div className={`data-modal ${animateModal ? 'modal-animate-in' : 'modal-animate-out'}`}>
                    <NutrientData nutrients={recipeJSON?.nutrients as NutrientInfo} />
                </div>
            )}

        </>
        )
    );
};