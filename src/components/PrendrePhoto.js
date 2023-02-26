import React, { useState, useRef } from "react";
import '../assets/css/PrendrePhoto.css';

const PrendrePhoto = ({setSelectedFile}) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const videoRef = useRef();
  const canvasRef = useRef();
  const [afficherCamera, setAfficherCamera] = useState(false);

  const handleStartCamera = async () => {
    try {
      setAfficherCamera(true);
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
    // setSelectedFile(dataUrl);
  };

  return (
    <>
    <p>Vous souhaitez prendre une photo ?</p>
    <div className="divphoto">
      <button onClick={handleStartCamera}>Démarrez la caméra</button>
      {afficherCamera ? (
        <video ref={videoRef} width="640" height="480" autoPlay></video>
      ) : null}
      <br />
      <button onClick={handleTakePhoto}>Prendre une photo</button>
      <canvas ref={canvasRef} width="640" height="480"></canvas>
      {photoUrl && <img src={photoUrl} alt="User's photo" />}
    </div>
    </>
  );
};

export default PrendrePhoto;
