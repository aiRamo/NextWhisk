import { useState, useEffect } from 'react';
import './HomePage.css';
import '../components/homePageComponents/Loader.css'
import SearchBar from '../components/homePageComponents/SearchBar';
import CameraCaptureComponent from '../components/homePageComponents/CameraCaptureComponent';
import { handleSearch } from '../handlers/customSearchHandlerAPI';
import { SearchResultCard } from '../components/homePageComponents/SearchResultCard';
import { validateUrlRecipeParser } from '../handlers/recipeHandlerAPI';

interface SearchResultItem {
  link: string;
  thumbnail?: string;
}


const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const HomePage = () => {

  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');

  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [validResults, setValidResults] = useState<SearchResultItem[]>([]);
  const isMobile = isMobileDevice();


  const handleInputChange = (event: any) => {
    setPrompt(event.target.value);
  };

  const searchResultCards = validResults.map((result, index) => (
    <SearchResultCard key={index} result={result} />
  ));

  useEffect(() => {
    console.log(validResults);
  }, [validResults]);


  useEffect(() => {
    const validateResults = async () => {
      const valid = [];
      for (const result of results) {
        if (valid.length >= 3) break;
        const response = await validateUrlRecipeParser(result.link);
        if (response === "Success") {
          valid.push(result);
        }
      }
      setValidResults(valid);
      setLoading(false);
    };

    if (results.length > 0) {
      setLoading(true);
      validateResults();
    }
  }, [results]);

  const handleIconClick = () => {
    setValidResults([]);
    handleSearch(prompt, setResults, setLoading);
  };

  return (
    <div className='homescreen-container'>
      <p className='homescreen-title'>Please provide a URL to an online recipe</p>
      <SearchBar
        prompt={prompt}
        handleInputChange={handleInputChange}
        handleIconClick={handleIconClick}
      />

      {loading && <div className='loader'/>}

      {validResults.length == 3 && !loading &&(
      <div className='search-results-container'>
        {searchResultCards.length >= 1 && (
          <div className="first-column">
            {searchResultCards[0]}
          </div>
        )}
        {searchResultCards.length >= 2 && (
          <div className="middle-column">
            {searchResultCards[1]}
          </div>
        )}
        {searchResultCards.length >= 3 && (
          <div className="last-column">
            {searchResultCards[2]}
          </div>
        )}
      </div>)}

      { isMobile && <CameraCaptureComponent />}
    </div>
  );
};

export default HomePage;
