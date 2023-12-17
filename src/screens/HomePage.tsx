import { useState } from 'react';
import './HomePage.css';
import '../components/homePageComponents/Loader.css'
import SearchBar from '../components/homePageComponents/SearchBar';
import CameraCaptureComponent from '../components/homePageComponents/CameraCaptureComponent';
import { handleSearch } from '../handlers/customSearchHandlerAPI';
import { SearchResultCard } from '../components/homePageComponents/SearchResultCard';

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

  const isMobile = isMobileDevice();


  const handleInputChange = (event: any) => {
    setPrompt(event.target.value);
  };

  const searchResultCards = results.map((result, index) => (
    <SearchResultCard key={index} result={result} />
  ));


  return (
    <div className='homescreen-container'>
      <p className='homescreen-title'>Please provide a URL to an online recipe</p>
      <SearchBar
        prompt={prompt}
        handleInputChange={handleInputChange}
        handleIconClick={() => handleSearch(prompt, setResults, setLoading)}
      />

      {loading && <div className='loader'/>}

      {!loading &&(
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
