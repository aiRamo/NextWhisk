import { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import '../components/homePageComponents/Loader.css'
import SearchBar from '../components/homePageComponents/SearchBar';
import RecipeSummarySection from '../components/homePageComponents/RecipeSummarySection';
import CameraCaptureComponent from '../components/homePageComponents/CameraCaptureComponent';

const HomePage = () => {

  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipeJSON, setRecipeJSON] = useState({ Ingredients: [], Directions: []});
  const [prompt, setPrompt] = useState('');

  const urlRegex = new RegExp(
    '^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?'+ // port
    '(\\/[-a-z\\d%_.~+]*)*'+ // path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i' // fragment locator
  );

  const handleIconClick = async () => {
    setLoading(true);
    if (prompt !== '' && urlRegex.test(prompt)){
      setRecipeJSON({ Ingredients: [], Directions: []})
      setResponse('');
      try {
        const res = await axios.post('http://localhost:3000/chat', { prompt });
  
        // Check if the response is an error message
        if (typeof res.data === 'string' && res.data.startsWith('Error')) {
          setResponse(res.data);
        } else {
          setResponse(res.data.message.content);
        }
        
      } catch (error) {
        setResponse('Error fetching response');
      }
    }
    else {
      setResponse('Error fetching response');
      setLoading(false);
    }
  };

  const handleInputChange = (event: any) => {
    setPrompt(event.target.value);
  };

  useEffect(() => {
    if (response !== '' && response !== 'Error fetching response') {
      try {
        console.log(response);
        const parsedJSON = JSON.parse(response);
        setRecipeJSON(parsedJSON);
      } catch (error) {
        console.error('Error parsing response', error);
      } finally {
        setLoading(false);
      }
    } else if (response === 'Error fetching response') {
      setLoading(false);
    }
    
  }, [response]);

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

      <CameraCaptureComponent />
    </div>
  );
};

export default HomePage;
