import mGlass from '../../assets/mGlass.png';
import './SearchBar.css';

interface SearchBarProps {
    prompt: string;
    handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleIconClick: () => void;
    isTitleFadingOut: boolean;
  }
  

const SearchBar = ({prompt, handleInputChange, handleIconClick, isTitleFadingOut}: SearchBarProps) => {

    const wrapperStyle = isTitleFadingOut ? 'input-wrapper input-slide-up' : 'input-wrapper';
    return (
        <div className={wrapperStyle}>
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
    )
}

export default SearchBar;