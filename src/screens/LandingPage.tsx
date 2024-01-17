import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import SlideAnimationCard from '../components/landingPageComponents/SlideAnimationCard';
import Infographic from '../assets/Infographic.png';

const LandingPage = () => {
  const navigate = useNavigate();

  const navigateToHomePage = () => {
    navigate('/home');
  };

  return (
    <div className="landing-page">
        <div className="landing-header-content">
            <div className='landing-text-content'>
                <h1 className="landing-header-text">Introducing NextWhisk</h1>
                <p className="landing-subheader-text">Transform the way you cook.</p>
                <p className="landing-text">Leveraging powerful chatGPT technology to analyze your cooking photos and offer real-time, image-based recipe guidance at the touch of a button.</p>
                <div className="get-started-wrapper" onClick={navigateToHomePage}>
                    <p className='landing-get-started'>Try It Out</p>
                </div>
            </div>
            <div className='infographic-container' >
              <div className='image-container'>
                <img src={Infographic} alt="description" className="landing-image" />
              </div>
              <div className='infographic-text-section'>
                <p className='infographic-text'>Search for your favorite recipes</p>
                <p className='infographic-text'>Compare the results</p>
                <p className='infographic-text'>Get instant instructions from your phone</p>
              </div>
            </div>
        </div>
        <SlideAnimationCard />
    </div>
  );
}

export default LandingPage;