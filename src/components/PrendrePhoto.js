import React, { useState, useRef } from "react";
import '../assets/css/PrendrePhoto.css';

const PrendrePhoto = () => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const videoRef = useRef();
  const canvasRef = useRef();

  const handleStartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.log(error);
    }
  };

  const handleTakePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    const dataUrl = canvasRef.current.toDataURL();
    setPhotoUrl(dataUrl);
  };

  return (
    <div className="divphoto">
        <button onClick={handleStartCamera}>Start Camera</button>
        <video ref={videoRef} width="640" height="480" autoPlay></video>
        <br />
        <button onClick={handleTakePhoto}>Prendre une photo</button>
        <canvas ref={canvasRef} width="640" height="480"></canvas>
        {photoUrl && <img src={photoUrl} alt="User's photo" />}
    </div>
  );
};

export default PrendrePhoto;