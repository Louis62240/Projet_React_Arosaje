import React, { useState, useEffect } from "react";
import "../assets/css/Messagerie.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faUserCircle,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  getUsers,
  addConversation,
  getConversations,
  getUserId,
} from "../services/api";

const Messagerie = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [recipient, setRecipient] = useState("Tout le monde");
  const [currentPage, setCurrentPage] = useState(0);
  const messagesPerPage = 10;
  const [selectedUser, setSelectedUser] = useState("");
  const [AllUsers, setAllUsers] = useState([]);
  const [recipientUser, setRecipientUser] = useState(null);

  const [nomUser, setNomUser] = useState("");
  const [User, setUser] = useState([]);
  const [idUser, setIdUser] = useState("");
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));
    console.log("Utilisateur :");
    console.log(utilisateur);
    if (utilisateur) {
      console.log(utilisateur.utilisateur);
      setNomUser(utilisateur.utilisateur[1]);
      console.log(utilisateur.utilisateur[1]);
      setUser(utilisateur.utilisateur);
      console.log(utilisateur.utilisateur[0]);
      setIdUser(utilisateur.utilisateur[0]);
      console.log("id user : " + idUser);
      getConversations(utilisateur.utilisateur[0]).then(async (data) => {
        console.log(data.conversations);
        if (!Array.isArray(data.conversations)) {
          console.error(
            "data.conversations is not an array",
            data.conversations
          );
          return;
        }
        const conversationsWithUser2Data = await Promise.all(
          data.conversations.map(async (conversation) => {
            console.log(conversation);
            const user2Data = await getUserId(conversation.id_utilisateur_2);
            return {
              ...conversation,
              user2Data,
            };
          })
        );
        setConversations(conversationsWithUser2Data);
        console.log(conversationsWithUser2Data);
      });
    }
    //récupérer toute les utilisateurs
    getUsers().then((data) => {
      console.log(data);
      setAllUsers(data);
    });

    //pour chaque conversations récupérer l'utilisateur 2 avec le getUserId

    setRecipientUser(AllUsers[0]);
    console.log(AllUsers[0]);
    console.log(recipientUser);
  }, []);
  const createConversation = async () => {
    if (!recipientUser) {
      alert("Veuillez sélectionner un destinataire pour la conversation.");
      return;
    }

    try {
      console.log("add conversation");
      console.log(idUser);
      console.log(recipientUser);
      // mettre recipientUser en objet
      let recipientUserArray = recipientUser.split(",");
      console.log(recipientUserArray[3]);
      const newConversation = await addConversation(
        idUser,
        recipientUserArray[3]
      );
      setMessages((prevMessages) => [...prevMessages, newConversation]);
      console.log("La conversation a bien été créée : ", newConversation);
    } catch (error) {
      console.error("Erreur lors de la création de la conversation : ", error);
    }
  };

  const users = [
    "Tout le monde",
    "Utilisateur 1",
    "Utilisateur 2",
    "Utilisateur 3",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newMessage.trim() !== "") {
      const timestamp = new Date();
      setMessages([
        ...messages,
        { text: newMessage, timestamp, sender: "Vous", recipient },
      ]);
      setNewMessage("");
      setCurrentPage(Math.ceil(messages.length / messagesPerPage));
    } else {
      alert("Le message ne peut pas être vide.");
    }
  };

  const displayedMessages = messages.slice(
    currentPage * messagesPerPage,
    (currentPage + 1) * messagesPerPage
  );

  return (
    <div className="messagerie">
      <h2>
        <FontAwesomeIcon icon={faUserCircle} /> Messagerie
      </h2>
      <div className="create-conversation">
        <p>Liste des utilisateurs : </p>

        <select
          value={recipientUser}
          onChange={(e) => setRecipientUser(e.target.value)}
          className="recipient-select"
        >
          {AllUsers.map((user, index) => (
            <option key={index} value={user}>
              {user[0]}
            </option>
          ))}
        </select>
        <button
          className="create-conversation-button"
          onClick={createConversation}
        >
          Créer une conversation
        </button>
      </div>
      <div className="conversations-list">
        <h3>Conversations:</h3>
        {conversations.map((conversation, index) => (
          <div key={index}>
            <p>Conversation avec : {conversation.user2Data.utilisateur[1]}</p>
          </div>
        ))}
      </div>
      <select
  value={recipient}
  onChange={(e) => setRecipient(e.target.value)}
  className="recipient-select"
>
  {conversations.map((conversation, index) => (
    <option key={index} value={conversation.user2Data.utilisateur}>
      {conversation.user2Data.utilisateur[1]}
    </option>
  ))}
</select>

      <div className="message-list">
        {displayedMessages.map(
          (message, index) =>
            message && (
              <div key={index} className="message">
                <p>{`${message.sender} à ${message.recipient} : ${message.text}`}</p>
                <span>
                  {message.timestamp && message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            )
        )}
      </div>

      <div className="pagination-controls">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage <= 0}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Page précédente
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={messages.length <= (currentPage + 1) * messagesPerPage}
        >
          Page suivante <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Tapez votre message ici..."
          className="message-input"
        />
        <button type="submit" className="message-submit">
          <FontAwesomeIcon icon={faPaperPlane} /> Envoyer
        </button>
      </form>
    </div>
  );
};

export default Messagerie;
