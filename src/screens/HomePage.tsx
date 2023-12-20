import { useState, useEffect } from 'react';
import './HomePage.css';
import '../components/homePageComponents/Loader.css'
import SearchBar from '../components/homePageComponents/SearchBar';
import { handleSearch } from '../handlers/customSearchHandlerAPI';
import { SearchResultCard } from '../components/homePageComponents/SearchResultCard';
import { validateUrlRecipeParser } from '../handlers/recipeHandlerAPI';

interface SearchResultItem {
  link: string;
  thumbnail?: string;
}

const HomePage = () => {

  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');

  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [validResults, setValidResults] = useState<SearchResultItem[]>([]);

  const [isTitleFadingOut, setIsTitleFadingOut] = useState(false);



  const handleInputChange = (event: any) => {
    setPrompt(event.target.value);
  };

  const searchResultCards = validResults.map((result, index) => (
    <SearchResultCard key={index} result={result} />
  ));

  useEffect(() => {
    console.log(validResults);
  }, [validResults]);

  // Used to return a list of successful web scraping results
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
    setIsTitleFadingOut(true);
    setValidResults([]);
    handleSearch(prompt, setResults, setLoading);
  };

  const titleClass = isTitleFadingOut ? 'homescreen-title fading-out-title' : 'homescreen-title';

  return (
    <div className='homescreen-container'>
      <p className={titleClass}>Please provide the name of a recipe</p>
      <SearchBar
        prompt={prompt}
        handleInputChange={handleInputChange}
        handleIconClick={handleIconClick}
        isTitleFadingOut={isTitleFadingOut}
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

      
    </div>
  );
};

export default HomePage;
