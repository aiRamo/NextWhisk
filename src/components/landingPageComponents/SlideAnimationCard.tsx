import { useEffect, useState } from 'react';
import './SlideAnimationCard.css';
import Google from '../../assets/Google.png';
import Openai from '../../assets/Openai.png';
import Azure from '../../assets/Azure.png';

const SlideAnimationCard = () => {
  const [topPosition, setTopPosition] = useState('2vh');
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPosition = (scrollTop + clientHeight) / scrollHeight * 100;

      if (scrollPosition > 90) {
        setTopPosition(`0vh`);
        setOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="card-container">
      <div className="slide-animation-card" style={{top: topPosition, opacity: opacity}}>
        <div className="card-item">
          <div className='card-sub-item'> 
            <img src={Google} alt="Google" className='Google-img'/>
          </div>
          <div className='card-line'/>
          <div className='card-sub-item'> 
            <p className='card-text'>Easily find recipes with Google's Custom Search API.</p>
          </div>
        </div>
        <div className="card-item">
          <div className='card-sub-item'> 
            <img src={Openai} alt="Google" className='Openai-img'/>
          </div>
          <div className='card-line'/>
          <div className='card-sub-item'>
            <p className='card-text'>Powered by OpenAI's cutting-edge GPT-4 vision.</p>
          </div>
        </div>
        <div className="card-item">
          <div className='card-sub-item'> 
            <img src={Azure} alt="Google" className='Azure-img'/>
          </div>
          <div className='card-line'/>
          <div className='card-sub-item'> 
            <p className='card-text'>Seamlessly hosted on robust Azure App Service.</p>
          </div>
        </div>
      </div>
    </div>
  
  );
}

export default SlideAnimationCard;