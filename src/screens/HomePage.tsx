import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import '../components/homePageComponents/Loader.css'
import mGlass from '../assets/mGlass.png';

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
      <div className='input-wrapper'>
        <textarea 
          className='homescreen-url-input' 
          onChange={handleInputChange} 
          value={prompt}
        ></textarea>
        <div className='input-search-wrapper'>
          <div className='input-icon-wrapper' onClick={handleIconClick}>
            <img src={mGlass} alt="mGlass" className='mGlass-img' />
          </div>
          <div className='input-search-modal'>
            <p className='modal-text'>Search</p>
          </div>
        </div>
      </div>

      {loading && <div className='loader'/>}

      {response != '' &&
        <div className="grid-container">
          {/* Ingredients column */}
          <ul className="column">
            <h3 className='list-header'>Ingredients</h3>
            {Object.entries(recipeJSON.Ingredients).map(([key, value]) => (
              <li key={key} className='list-entity'>{value + '\n'}</li>
            ))}
          </ul>

          {/* Directions column */}
          <ul className="column">
            <h3 className='list-header'>Directions</h3>
            {Object.entries(recipeJSON.Directions).map(([key, value]) => (
              <li key={key} className='list-entity'>{value + '\n'}</li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
};

export default HomePage;
