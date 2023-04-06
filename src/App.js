import HeaderComponent from './components/Header';
import ConnexionComponent from './components/Connexion';
import React, { useState, useEffect } from 'react';

function App() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    localStorage.removeItem('token');
    setIsConnected(false);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      handleConnect();
    }
  }, []);

  return (
    <div className="App">
      {isConnected ? (
        <HeaderComponent onDisconnect={handleDisconnect} />
      ) : (
        <ConnexionComponent onConnect={() => setIsConnected(true)} />
      )}
    </div>
  );
}

export default App;
