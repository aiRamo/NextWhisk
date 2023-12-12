import { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import '../components/homePageComponents/Loader.css'
import SearchBar from '../components/homePageComponents/SearchBar';
import RecipeSummarySection from '../components/homePageComponents/RecipeSummarySection';

const HomePage = () => {

  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipeJSON, setRecipeJSON] = useState({ Ingredients: [], Directions: []});
  const [prompt, setPrompt] = useState('');

  const handleIconClick = async () => {
    setRecipeJSON({ Ingredients: [], Directions: []})
    setResponse('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/chat', { prompt });
      setResponse(res.data.message.content);
    } catch (error) {
      console.error('Error fetching response', error);
      setResponse('Error fetching response');
    }
  };

  const handleInputChange = (event: any) => {
    setPrompt(event.target.value);
  };

  useEffect(() => {if (response != '') {
    setRecipeJSON(JSON.parse(response));
    setLoading(false);
  }}, [response]);

  useEffect(() => {console.log(recipeJSON.Ingredients["1"])}, [recipeJSON]);

  return (
    <div className='homescreen-container'>
      <p className='homescreen-title'>Please provide a URL to an online recipe</p>
      <SearchBar
        prompt={prompt}
        handleInputChange={handleInputChange}
        handleIconClick={handleIconClick}
      />

      {loading && <div className='loader'/>}

      <RecipeSummarySection
        response={response}
        recipeJSON={recipeJSON}
      />
    </div>
  );
};

export default HomePage;
