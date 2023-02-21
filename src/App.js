import HeaderComponent from './components/Header';
import ConnexionComponent from './components/Connexion';
import React, { useState } from 'react';

function App() {
  const [isConnected, setIsConnected] = useState(false);

  const handleDisconnect = () => {
    setIsConnected(false);
  };
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
