  import React, { useEffect, useState } from "react";
  import { ref, onValue, remove } from "firebase/database";
  import { db } from "../../../firebaseConfig";
  import { ToastContainer, toast } from "react-toastify";
  import 'react-toastify/dist/ReactToastify.css';
  import './MessageList.css';

  const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
      const messagesRef = ref(db, "contactMessages");

      const unsubscribe = onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        const loadedMessages = data
          ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
          : [];
        setMessages(loadedMessages.reverse());
        if (loadedMessages.length > 0 && !selectedMessage) {
          setSelectedMessage(loadedMessages[0]);
        }
      });

      return () => unsubscribe();
    }, [selectedMessage]);

    const handleDelete = async (id) => {
      try {
        await remove(ref(db, `contactMessages/${id}`));
        toast.success("Message deleted.");
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
      } catch (error) {
        toast.error("Error deleting message: " + error.message);
      }
    };

    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      return (
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
        " · " +
        date.toLocaleDateString()
      );
    };

    const filteredMessages = messages.filter((msg) =>
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.contactNo?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="whatsapp-container">
        {/* Sidebar */}
        <div className="whatsapp-sidebar">
          <div className="sidebar-header d-flex flex-column bg-primary-subtle">
            <h5 className="text-danger">
              <i className="bi bi-chat-left-dots-fill me-2"></i>Chats
            </h5>
            <input
              type="text"
              placeholder="Search by name or number"
              className="form-control form-control-sm mt-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredMessages.length === 0 ? (
            <p className="text-center mt-4">No messages found</p>
          ) : (
            <ul className="chat-list">
              {filteredMessages.map((msg) => (
                <li
                  key={msg.id}
                  className={`chat-item ${selectedMessage?.id === msg.id ? "active" : ""}`}
                  onClick={() => setSelectedMessage(msg)}
                >
                  <div className="chat-name">{msg.name}</div>
                  <div className="chat-subject">{msg.subject}</div>
                  <div className="chat-time">{formatDate(msg.timestamp)}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Chat view */}
        <div className="whatsapp-chatbox mt-2">
          {selectedMessage ? (
            <>
              <div className="chat-header bg-light border-bottom p-3 d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">{selectedMessage.name}</h6>
                  <small className="text-muted">{selectedMessage.contactNo}</small>
                </div>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(selectedMessage.id)}
                  title="Delete Message"
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>

              <div className="chat-body">
                <div className="chat-bubble incoming position-relative myshadow">
                  <p className="mb-1">{selectedMessage.message}</p>
                  <small className="text-muted d-block">
                    {formatDate(selectedMessage.timestamp)}
                  </small>
                  <button
                    className="btn btn-sm btn-link text-danger delete-btn"
                    onClick={() => handleDelete(selectedMessage.id)}
                    title="Delete Message"
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="chat-placeholder">Select a message to view</div>
          )}
        </div>

        <ToastContainer />
      </div>
    );
  };

  export default MessageList;
