import React, { useState } from 'react';
import '../assets/css/Messagerie.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faUserCircle, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Messagerie = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipient, setRecipient] = useState('Tout le monde');
  const [currentPage, setCurrentPage] = useState(0);
  const messagesPerPage = 10;

  const users = ['Tout le monde', 'Utilisateur 1', 'Utilisateur 2', 'Utilisateur 3'];

  const handleSubmit = (event) => {
    event.preventDefault();

    if(newMessage.trim() !== '') {
      const timestamp = new Date();
      setMessages([...messages, {text: newMessage, timestamp, sender: 'Vous', recipient}]);
      setNewMessage('');
      setCurrentPage(Math.ceil(messages.length / messagesPerPage));
    } else {
      alert("Le message ne peut pas être vide.");
    }
  };

  const displayedMessages = messages.slice(currentPage * messagesPerPage, (currentPage + 1) * messagesPerPage);

  return (
    <div className="messagerie">
      <h2><FontAwesomeIcon icon={faUserCircle} /> Messagerie</h2>

      <select 
        value={recipient} 
        onChange={(e) => setRecipient(e.target.value)} 
        className="recipient-select"
      >
        {users.map((user, index) => (
          <option key={index} value={user}>{user}</option>
        ))}
      </select>

      <div className="message-list">
        {displayedMessages.map((message, index) => (
          <div key={index} className="message">
            <p>{`${message.sender} à ${message.recipient} : ${message.text}`}</p>
            <span>{message.timestamp.toLocaleTimeString()}</span>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage <= 0}><FontAwesomeIcon icon={faArrowLeft} /> Page précédente</button>
        <span>Page {currentPage + 1}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={messages.length <= (currentPage + 1) * messagesPerPage}>Page suivante <FontAwesomeIcon icon={faArrowRight} /></button>
      </div>

      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Tapez votre message ici..."
          className="message-input"
        />
        <button type="submit" className="message-submit"><FontAwesomeIcon icon={faPaperPlane} /> Envoyer</button>
      </form>
    </div>
  );
};

export default Messagerie;
