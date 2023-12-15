import { useState, useEffect } from 'react';
import './HomePage.css';
import '../components/homePageComponents/Loader.css'
import SearchBar from '../components/homePageComponents/SearchBar';
import RecipeSummarySection from '../components/homePageComponents/RecipeSummarySection';
import CameraCaptureComponent from '../components/homePageComponents/CameraCaptureComponent';
import { handleUrlRecipeParser } from '../handlers/recipeHandlerAPI';

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

const HomePage = () => {

  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');

  const isMobile = isMobileDevice();

  const defaultJSON: RecipeJSON = { 
    title: '',
    host: '',
    total_time: 0,
    yields: '',
    ingredients: [],
    instructions: []
  };

  const [recipeJSON, setRecipeJSON] = useState(defaultJSON);


  const handleInputChange = (event: any) => {
    setPrompt(event.target.value);
  };

  useEffect(() => {
    // This useEffect is for debugging purposes, to log changes in recipeJSON
    console.log(recipeJSON);
  }, [recipeJSON]);

  return (
    <div className='homescreen-container'>
      <p className='homescreen-title'>Please provide a URL to an online recipe</p>
      <SearchBar
        prompt={prompt}
        handleInputChange={handleInputChange}
        handleIconClick={() => handleUrlRecipeParser(prompt, setResponse, setLoading, setRecipeJSON)}
      />

      {loading && <div className='loader'/>}

      <RecipeSummarySection
        response={response}
        recipeJSON={recipeJSON}
      />

      { isMobile && <CameraCaptureComponent />}
    </div>
  );
};

export default HomePage;
