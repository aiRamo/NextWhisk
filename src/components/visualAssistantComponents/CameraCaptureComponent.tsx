import React, { useRef } from 'react';
import './CameraCaptureComponent.css';
import Camera from '../../assets/Camera.png';

const CameraCaptureComponent: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      console.log('Captured file:', file.name);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='camera-container'>
      <input
        type="file"
        accept="image/*"
        capture
        onChange={handleCapture}
        ref={fileInputRef}
        style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
      />
      <button onClick={handleButtonClick} className='camera-button'>
        <img src={Camera} alt="Camera" className='Camera-img' />
      </button>
    </div>
  );
};

export default CameraCaptureComponent;
