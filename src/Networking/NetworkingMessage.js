import React, { useState, useEffect } from 'react';
import './NetworkingMessage.css'; // External CSS
import messageImage from '../assets/SecondmessageImage.jpeg'
import { useNavigate } from 'react-router-dom';
import { FaPaperclip, FaMicrophone } from 'react-icons/fa'; // Using react-icons for icons


const NetworkingMessage = () => {
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState(null);

  const chatList = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    name: "Ayush Gupta",
    message: "Hello, how are you?",
    time: "today",
  }));

  return (

    <div className="messages-page">
      {/* ================= HEADER ================= */}
      <div className="messages-header">
        <span className="back-btn" onClick={() => navigate(-1)}>←</span>
        <h1>Messages</h1>

        <div className="tabs">
          <button className="active">All messages</button>
          <button>Personal</button>
          <button>Mentors</button>
          <button>Comments reply</button>
        </div>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="messages-grid">

        {/* LEFT CHAT LIST */}
        <div className="chat-list-panel">
          <input className="search-input" placeholder="Search" />

          <ul>
            {chatList.map(chat => (
              <li
                key={chat.id}
                className={activeChat === chat.id ? "active" : ""}
                onClick={() => setActiveChat(chat.id)}
              >
                <img src={messageImage} alt="" />
                <div>
                  <h4>{chat.name}</h4>
                  <p>{chat.message}</p>
                </div>
                <span>{chat.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CENTER CHAT */}
        <div className="chat-window">
          {!activeChat ? (
            <div className="empty-chat">
              Select chat to start chatting
            </div>
          ) : (
            <>
              <div className="chat-header">
                <img src={messageImage} alt="" />
                <h4>Ayush Gupta</h4>
              </div>

              <div className="chat-messages">
                <div className="msg received">Hello, how are you?</div>
                <div className="msg received">
                  Lorem ipsum dolor sit amet consectetur.
                </div>

                <div className="msg sent">I am fine!</div>
                <div className="msg sent">
                  Lorem ipsum dolor sit amet consectetur.
                </div>
              </div>

              <div className="chat-input">
                <input placeholder="Type a message" />
              </div>
            </>
          )}
        </div>

        {/* RIGHT SHORTCUTS */}
        <div className="shortcuts">
          <h3>Your shortcuts</h3>
          {chatList.map((chat, i) => (
            <div key={i} className="shortcut-item">
              <strong>{chat.name}</strong>
              <p>{chat.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// const NetworkingMessage = () => {

//   const navigate = useNavigate();
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [activeTab, setActiveTab] = useState(null); // Default active tab
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };
//   const toggleComponentVisibility = () => {
//     setIsComponentVisible(!isComponentVisible);
//   };
//   const [isComponentVisible, setIsComponentVisible] = useState(false);
//   const [showChat, setShowChat] = useState(false); // State to toggle between div and chat
//   const [isOpen, setIsOpen] = useState(false);
//   const handleClick = () => {
//     setShowChat(true); // When clicked, show the chat interface
//     setIsOpen(!isOpen);
//     setIsExpanded(!isExpanded);
//   };

//   const handleBackClick = () => {
//     navigate(-1); // Go back to the previous page
//   };
//   const chatList = Array.from({ length: 20 }, (_, index) => ({
//     name: 'Ayush Gupta',
//     message: 'Hello, how are you?',
//     time: 'today',
//     id: index + 1
//   }));
//   useEffect(() => {
//     // Set the body background color to white when this component mounts
//     document.body.style.backgroundColor = "white";

//     // Reset the body background color when this component unmounts
//     return () => {
//       document.body.style.backgroundColor = ""; // or set to the default color you want for other pages
//     };
//   }, []);
//   return (
//     <>

//       <div className="tab-navigation-container-tab">

//         <div className="back-button-tab" onClick={handleBackClick}>←</div>
//         <h1 className="tab-navigation-title-tab">Messages</h1>
//         <div className="tab-navigation-buttons-tab">
//           <button className="tab-item-tab" id="all" onClick={handleClick}> All messages</button>
//           <button className="tab-item-tab" id="personal" onClick={handleClick}>Personal</button>
//           <button className="tab-item-tab" id="mentors" onClick={handleClick}>Mentors</button>
//           <button className="tab-item-tab" id="comments" onClick={handleClick}>Comments reply</button>
//         </div>
//       </div>
//       {/* ======================================== */}
//       <div className="search-bar-message">
//         <input type="text" placeholder="Search" />
//       </div>
//       <div className="chat-container">

//         <ul className="chat-list">
//           {chatList.map((chat) => (
//             <li key={chat.id} className={`chat-item ${chat.id === 5 ? 'active' : ''}`}>
//               <img
//                 src={messageImage}
//                 alt="Profile"
//                 className="chat-profile-img"
//               />
//               <div className="chat-info" onClick={handleClick}>
//                 <h4 className="chat-name">{chat.name}</h4>
//                 <p className="chat-message">{chat.message}</p>
//               </div>
//               <span className="chat-time">{chat.time}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         {!showChat ? (
//           // Initial div that will be visible on localhost
//           <div
//             style={{
//               height: '500px',
//               width: '600px',
//               color: 'white',
//               boxShadow: '0 0 2px 2px rgba(0,0,0,0.1)',
//               borderRadius: '15px',
//               marginLeft: '420px',
//               marginTop: '-500px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               cursor: 'pointer',
//               backgroundColor: 'white',
//             }}

//           >

//           </div>
//         ) : (
//           // Chat UI that appears after clicking
//           <div className="networksmessages-container">
//             <div className="networksmessages-header">
//               <div className="networksmessages-profile-info">
//                 <img
//                   src={messageImage}
//                   alt="Profile"
//                   className="networksmessages-profile-image"
//                 />
//                 <span className="networksmessages-profile-name">Ayush Gupta</span>
//               </div>
//               <div className="networksmessages-icons">
//                 <svg width="105" height="35" viewBox="0 0 145 35" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <rect width="35" height="35" fill="white" />
//                   <path d="M27.6063 29.1666C25.1485 29.1666 22.6285 28.5512 20.0463 27.3203C17.4641 26.0895 15.0651 24.3614 12.8494 22.136C10.6337 19.9105 8.91046 17.5116 7.67962 14.9391C6.44879 12.3666 5.83337 9.85145 5.83337 7.39367C5.83337 6.94839 5.97921 6.57749 6.27087 6.28096C6.56254 5.98443 6.92712 5.8352 7.36462 5.83325H10.9711C11.3677 5.83325 11.7139 5.95818 12.0094 6.20804C12.305 6.4579 12.5048 6.77825 12.6088 7.16909L13.3321 10.6458C13.4002 11.0541 13.388 11.4104 13.2957 11.7147C13.2033 12.019 13.0414 12.2684 12.81 12.4628L9.61046 15.4466C10.2093 16.5326 10.8709 17.5417 11.5952 18.4741C12.3196 19.4064 13.0925 20.2897 13.914 21.1239C14.7598 21.9697 15.6708 22.7572 16.6469 23.4864C17.623 24.2146 18.6944 24.9019 19.8611 25.5485L22.9805 22.3737C23.2177 22.118 23.4846 21.9493 23.7811 21.8676C24.0766 21.7869 24.4043 21.7709 24.764 21.8195L27.8309 22.4466C28.2275 22.5438 28.5493 22.7436 28.7963 23.046C29.0432 23.3483 29.1667 23.6944 29.1667 24.0843V27.6353C29.1667 28.0728 29.018 28.4374 28.7205 28.7291C28.423 29.0208 28.0506 29.1666 27.6063 29.1666ZM8.92504 14.0787L11.725 11.5047C11.8174 11.4298 11.8777 11.3268 11.9059 11.1955C11.935 11.0643 11.9302 10.9428 11.8913 10.831L11.2452 7.73929C11.2073 7.59054 11.1417 7.47874 11.0484 7.40388C10.955 7.32902 10.834 7.29159 10.6852 7.29159H7.69275C7.58094 7.29159 7.48761 7.32902 7.41275 7.40388C7.33789 7.47874 7.30046 7.57207 7.30046 7.68388C7.32865 8.6804 7.48469 9.72068 7.76858 10.8047C8.05247 11.8887 8.43699 12.9801 8.92504 14.0787ZM21.2494 26.2324C22.2353 26.7205 23.2853 27.0817 24.3994 27.316C25.5155 27.5493 26.4878 27.6742 27.3161 27.6908C27.4279 27.6908 27.5212 27.6533 27.5961 27.5785C27.6709 27.5036 27.7084 27.4108 27.7084 27.2999V24.3716C27.7084 24.2228 27.6709 24.1013 27.5961 24.007C27.5212 23.9137 27.4094 23.8485 27.2607 23.8116L24.5627 23.2589C24.45 23.221 24.3513 23.2161 24.2667 23.2443C24.1831 23.2735 24.0946 23.3342 24.0013 23.4266L21.2494 26.2324Z" fill="#1B1B1E" />
//                   <rect width="41" height="35" transform="translate(55)" fill="white" />
//                   <path d="M63.6319 8.0769H77.8737C79.1327 8.0769 80.3402 8.5733 81.2305 9.45688C82.1208 10.3405 82.6209 11.5389 82.6209 12.7884V22.2115C82.6209 23.4611 82.1208 24.6595 81.2305 25.5431C80.3402 26.4267 79.1327 26.9231 77.8737 26.9231H63.6319C62.3728 26.9231 61.1654 26.4267 60.2751 25.5431C59.3848 24.6595 58.8846 23.4611 58.8846 22.2115V12.7884C58.8846 11.5389 59.3848 10.3405 60.2751 9.45688C61.1654 8.5733 62.3728 8.0769 63.6319 8.0769ZM82.6209 15.1442L88.3176 10.9038C88.6703 10.6413 89.0896 10.4815 89.5286 10.4422C89.9677 10.4029 90.409 10.4857 90.8033 10.6814C91.1976 10.877 91.5292 11.1778 91.7609 11.5499C91.9927 11.9221 92.1154 12.3509 92.1154 12.7884V22.2115C92.1154 22.649 91.9927 23.0779 91.7609 23.45C91.5292 23.8222 91.1976 24.1229 90.8033 24.3186C90.409 24.5142 89.9677 24.5971 89.5286 24.5578C89.0896 24.5185 88.6703 24.3586 88.3176 24.0961L82.6209 19.8558V15.1442Z" stroke="#1B1B1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                   <path d="M141.375 28.375L136.119 23.1188M138.958 16.2917C138.958 21.6304 134.63 25.9583 129.292 25.9583C123.953 25.9583 119.625 21.6304 119.625 16.2917C119.625 10.9529 123.953 6.625 129.292 6.625C134.63 6.625 138.958 10.9529 138.958 16.2917Z" stroke="#1B1B1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                 </svg>

//               </div>
//             </div>

//             <div className="networksmessages-messages">
//               {/* All received messages will be aligned to the left */}
//               <img
//                 src={messageImage}
//                 alt="Profile"
//                 className="networksmessages-profile-image1"
//               />
//               <div className="networksmessages-received">
//                 <p>Hello, How are you?</p>
//               </div>
//               <div className="networksmessages-received1">
//                 <p>Lorem ipsum dolor sit amet consectetur. Feugiat elit sit ut egestas cras morbi consequat sollicitudin.</p>
//               </div>

//               {/* All sent messages will be aligned to the right */}
//               <div className="networksmessages-sent">
//                 <p>Hello, I am fine!</p>
//               </div>
//               <div className="networksmessages-sent1">
//                 <p>Lorem ipsum dolor sit amet consectetur. Feugiat elit sit ut egestas cras morbi consequat sollicitudin.</p>
//               </div>
//             </div>

//             <div className="networksmessages-input">
//               <svg width="54" height="22" viewBox="0 0 84 32" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M12 15C12.5304 15 13.0391 14.7893 13.4142 14.4142C13.7893 14.0391 14 13.5304 14 13C14 12.4696 13.7893 11.9609 13.4142 11.5858C13.0391 11.2107 12.5304 11 12 11C11.4696 11 10.9609 11.2107 10.5858 11.5858C10.2107 11.9609 10 12.4696 10 13C10 13.5304 10.2107 14.0391 10.5858 14.4142C10.9609 14.7893 11.4696 15 12 15ZM22 13C22 13.5304 21.7893 14.0391 21.4142 14.4142C21.0391 14.7893 20.5304 15 20 15C19.4696 15 18.9609 14.7893 18.5858 14.4142C18.2107 14.0391 18 13.5304 18 13C18 12.4696 18.2107 11.9609 18.5858 11.5858C18.9609 11.2107 19.4696 11 20 11C20.5304 11 21.0391 11.2107 21.4142 11.5858C21.7893 11.9609 22 12.4696 22 13ZM9.553 19.106C9.78897 18.988 10.062 18.9681 10.3126 19.0505C10.5632 19.1329 10.7711 19.311 10.891 19.546L10.894 19.552L10.928 19.61C10.963 19.667 11.021 19.756 11.105 19.869C11.274 20.094 11.545 20.405 11.937 20.719C12.71 21.337 13.993 22 16 22C18.007 22 19.29 21.337 20.063 20.72C20.456 20.405 20.727 20.094 20.895 19.869C20.972 19.7679 21.0425 19.662 21.106 19.552L21.11 19.545C21.2306 19.3101 21.4393 19.1324 21.6905 19.0508C21.9416 18.9692 22.2149 18.9902 22.4506 19.1093C22.6863 19.2284 22.8653 19.4359 22.9485 19.6865C23.0318 19.9372 23.0126 20.2105 22.895 20.447L22.893 20.45V20.452L22.889 20.458L22.881 20.473C22.8496 20.5324 22.8163 20.5908 22.781 20.648C22.6932 20.7927 22.598 20.9329 22.496 21.068C22.1535 21.5201 21.7557 21.9276 21.312 22.281C20.21 23.163 18.493 24 16 24C13.507 24 11.79 23.163 10.688 22.28C10.2448 21.9272 9.84735 21.5204 9.505 21.069C9.36237 20.8797 9.23338 20.6806 9.119 20.473L9.111 20.458L9.108 20.452L9.107 20.449L9.106 20.447C8.98758 20.2099 8.96814 19.9354 9.05196 19.684C9.13577 19.4325 9.31599 19.2246 9.553 19.106ZM16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2ZM4 16C4 9.373 9.373 4 16 4C22.627 4 28 9.373 28 16C28 22.627 22.627 28 16 28C9.373 28 4 22.627 4 16Z" fill="#7A7A7A" />
//                 <path d="M62.1579 25.1414C59.6586 25.1414 57.5312 24.2589 55.7759 22.4939C54.0206 20.7289 53.1429 18.5697 53.1429 16.0163C53.1429 13.463 54.0206 11.2987 55.7759 9.52356C57.5312 7.74839 59.6591 6.85968 62.1595 6.85742L76.571 6.85742C78.3175 6.85742 79.8016 7.4732 81.0231 8.70477C82.2458 9.93408 82.8572 11.4442 82.8572 13.2352C82.8572 15.0261 82.2464 16.5363 81.0248 17.7656C79.8032 18.9949 78.3186 19.6101 76.571 19.6112L62.9205 19.6112C61.9521 19.6112 61.1173 19.2644 60.4163 18.5708C59.7153 17.8784 59.3647 17.0336 59.3647 16.0366C59.3647 15.0397 59.7097 14.1825 60.3998 13.4652C61.0898 12.748 61.9301 12.3893 62.9205 12.3893L76.6353 12.3893L76.6353 14.081L62.9205 14.081C62.3934 14.081 61.9444 14.2654 61.5735 14.6342C61.2015 15.0041 61.0155 15.4592 61.0155 15.9994C61.0155 16.5397 61.2015 16.9947 61.5735 17.3646C61.9455 17.7346 62.3945 17.9195 62.9205 17.9195L76.6023 17.9195C77.8855 17.9128 78.9734 17.4605 79.8659 16.5628C80.7596 15.6662 81.2064 14.557 81.2064 13.2352C81.2064 11.9235 80.7546 10.8149 79.8511 9.90927C78.9475 9.00251 77.8542 8.54913 76.571 8.54913L62.1595 8.54913C60.1202 8.54349 58.3831 9.26698 56.948 10.7196C55.5118 12.1733 54.7937 13.9434 54.7937 16.0299C54.7937 18.0859 55.5118 19.834 56.948 21.2742C58.3842 22.7144 60.1208 23.4401 62.1579 23.4514L76.6353 23.4514L76.6353 25.1431L62.1579 25.1414Z" fill="#7A7A7A" />
//               </svg>

//               <input type="text" placeholder="Type a message" />
//               <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M15 10V12C15 13.8565 14.2625 15.637 12.9497 16.9497C11.637 18.2625 9.85652 19 8 19M8 19C6.14348 19 4.36301 18.2625 3.05025 16.9497C1.7375 15.637 1 13.8565 1 12V10M8 19V23M4 23H12M8 1C7.20435 1 6.44129 1.31607 5.87868 1.87868C5.31607 2.44129 5 3.20435 5 4V12C5 12.7956 5.31607 13.5587 5.87868 14.1213C6.44129 14.6839 7.20435 15 8 15C8.79565 15 9.55871 14.6839 10.1213 14.1213C10.6839 13.5587 11 12.7956 11 12V4C11 3.20435 10.6839 2.44129 10.1213 1.87868C9.55871 1.31607 8.79565 1 8 1Z" stroke="#7A7A7A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
//               </svg>

//             </div>
//             {/* </div> */}
//           </div>
//         )}
//       </div>
//       {/* ================================================================ */}
//       <div className="chat-container-second" style={{
//         marginTop: isExpanded ? '-300px' : '-500px', // Change margin-top based on state
//         height: isExpanded ? '300px' : '500px', // Change height based on state
//       }}>

//         <ul className="chat-list-second">
//           {chatList.map((chat) => (
//             <li key={chat.id} className={`chat-item-second ${chat.id === 5 ? 'active' : ''}`}>
//               <img
//                 src={messageImage}
//                 alt="Profile"
//                 className="chat-profile-img-second"
//               />
//               <div className="chat-info-second"   >
//                 <h4 className="chat-name-second">{chat.name}</h4>
//                 <p className="chat-message-second">{chat.message}</p>
//               </div>
//               <span className="chat-time-second">{chat.time}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//       {/* ----------------------------------------------------- */}
//       {isOpen && (
//         <div className="messagesnetworks-profile-card">
//           <div className="messagesnetworks-profile-header">
//             <img
//               className="messagesnetworks-profile-avatar"
//               src={messageImage} // Replace with the actual avatar URL
//               alt="Profile"
//             />
//             <div className="messagesnetworks-profile-info">
//               <h3>Ayush Gupta</h3>
//               <p>View profile</p>
//             </div>
//             <span className='messagesnetworks-profile-dots' onClick={toggleDropdown}>...</span>
//           </div>
//           <div className="messagesnetworks-profile-body">
//             <h4>About</h4>
//             <p>Added details</p>
//             <div className="messagesnetworks-profile-contact">
//               <p><i className="fas fa-phone"></i> +91-7676768989</p>
//               <p><i className="fas fa-envelope"></i> ayushgupta@gmail.com</p>
//             </div>
//           </div>
//         </div>

//       )}
//       {isDropdownOpen && (
//         <div className="messagesnetworks-dropdown">
//           <ul>
//             <li>Option 1</li>
//             <li>Option 2</li>
//             <li>Option 3</li>
//           </ul>
//         </div>
//       )}
//     </>
//   );
// };

export default NetworkingMessage;
