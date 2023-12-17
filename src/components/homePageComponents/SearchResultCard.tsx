import { useEffect, useState } from 'react';
import './SearchResultCard.css';
import { handleUrlRecipeParser } from '../../handlers/recipeHandlerAPI';

interface SearchResultItem {
    link: string;
    thumbnail?: string;
}

interface SearchResultCardProps {
    result: SearchResultItem;
}

interface RecipeJSON {
    title: string;
    host: string;
    total_time: number;
    yields: string;
    ingredients: string[];
    instructions: string[];
  }

const defaultJSON: RecipeJSON = { 
    title: '',
    host: '',
    total_time: 0,
    yields: '',
    ingredients: [],
    instructions: []
};

export const SearchResultCard: React.FC<SearchResultCardProps> = ({ result }) => {
    const [image, setImage] = useState<Array<{ src: string }>>([]);
    const [response, setResponse] = useState('');
    const [recipeJSON, setRecipeJSON] = useState(defaultJSON); // Assign the initial value to defaultJSON

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
            setImage([]); // Or set to a default image array
        }
    }, [result]);

    useEffect(() => { 
        if (response === 'Success'){
            console.log(recipeJSON);
        }
    }, [recipeJSON]);
    
    return (
        
        response === 'Success' && (
        <div className='search-result-card-container'>
            
            <img src={image.length > 0 ? image[0].src : 'default-placeholder-image.jpg'} alt="recipe" className='search-result-card-img' />
            <div className='search-result-card-info'>
                <div className='search-result-card-info-header'>
                    <p className='search-result-card-title'>{recipeJSON.title}</p>
                    <p className='search-result-card-host'>{recipeJSON.host}</p>  
                </div>
                <p className='search-result-card-time'>{recipeJSON.total_time} mins</p>
                <p className='search-result-card-yield'>{recipeJSON.yields}</p>
                <p className='search-result-card-ingredientCount'>Ingredients: {recipeJSON.ingredients.length}</p>
            </div>
           
        </div>
        )
    );
};