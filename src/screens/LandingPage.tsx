import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import SlideAnimationCard from '../components/landingPageComponents/SlideAnimationCard';

const LandingPage = () => {
  const navigate = useNavigate();

  const navigateToHomePage = () => {
    navigate('/home'); // make sure the route is defined in your router
  };

  return (
    <div className="landing-page">
        <div className="landing-header-content">
            <div className='landing-text-content'>
                <h1 className="landing-header-text">Introducing NextWhisk</h1>
                <p className="landing-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue tincidunt purus ut volutpat. Phasellus rhoncus egestas lacus. Suspendisse odio ipsum, dictum vel commodo sit amet, cursus ut nisl. Duis eleifend felis eget ante eleifend tempus. Quisque blandit in libero ac auctor.  </p>
                <div className="get-started-wrapper" onClick={navigateToHomePage}>
                    <p className='landing-get-started'>Try It Out</p>
                </div>
            </div>
            <img src="https://picsum.photos/375/667" alt="description" className="landing-image" />
        </div>
        <SlideAnimationCard />
    </div>
  );
}

export default LandingPage;