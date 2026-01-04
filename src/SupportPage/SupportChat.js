import React, { useState , useEffect} from 'react';
import './SupportChat.css';
import lBI from '../assets/Livechatbackground.jpeg'

const SupportChat = () => {
    const [messages, setMessages] = useState([
        { sender: 'support', text: 'Hello, How are you?' },
        { sender: 'user', text: 'Hello, I am fine!' },
        { sender: 'support', text: 'Lorem ipsum dolor sit amet consectetur. Feugiat elit sit ut egestas cras morbi consequat sollicitudin. Dictum eget mattis potenti' },
        { sender: 'user', text: 'Lorem ipsum dolor sit amet consectetur. Feugiat elit sit ut egestas cras morbi consequat sollicitudin. Dictum eget mattis potenti' }
    ]);
    const [inputText, setInputText] = useState('');

    const handleSend = () => {
        if (inputText.trim()) {
            setMessages([...messages, { sender: 'user', text: inputText }]);
            setInputText('');
        }
    };
    useEffect(() => {
        // Set the body background image when the component mounts
        document.body.style.backgroundImage = `url(${lBI})`;
        document.body.style.backgroundSize = "cover"; // Optional: make the background image cover the entire screen
        document.body.style.backgroundRepeat = "no-repeat"; // Optional: prevent the image from repeating
        document.body.style.backgroundPosition = "center"; // Optional: center the background image
    
        // Reset the background image when the component unmounts
        return () => {
          document.body.style.backgroundImage = ""; // Reset to default
        };
      }, []);

    return (
        <div className="chatlive-container">
            <div className="chatlive-header">
                <h3>Support team</h3>
            </div>
            <div className="chatlive-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chatlive-message chatlive-${msg.sender}`}>
                        <div className="chatlive-message-text">{msg.text}</div>
                    </div>
                ))}
            </div>
            <div className="chatlive-input">
                <input 
                    type="text" 
                    value={inputText} 
                    onChange={(e) => setInputText(e.target.value)} 
                    placeholder="Type a message"
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default SupportChat;
