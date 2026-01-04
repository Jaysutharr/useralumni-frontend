import React, {useEffect} from 'react';
import './Notification.css'; // Import the CSS file
import nI from '../assets/NotifyImage.jpeg'

const notifications = [

  {
    title: "Event Reminder: Upcoming Alumni Meet-Up! Message",
    date: "September 15, 2024",
    content: "Don't forget our annual Alumni Meet-Up on September 25th at 6:00 PM at the Downtown Convention Center. Click here to RSVP and get more details."
  },
  {
    title: "Event Reminder: Upcoming Alumni Meet-Up! Message",
    date: "September 15, 2024",
    content: "Don't forget our annual Alumni Meet-Up on September 25th at 6:00 PM at the Downtown Convention Center. Click here to RSVP and get more details."
  },
  {
    title: "Event Reminder: Upcoming Alumni Meet-Up! Message",
    date: "September 15, 2024",
    content: "Don't forget our annual Alumni Meet-Up on September 25th at 6:00 PM at the Downtown Convention Center. Click here to RSVP and get more details."
  },
  {
    title: "Event Reminder: Upcoming Alumni Meet-Up! Message",
    date: "September 15, 2024",
    content: "Don't forget our annual Alumni Meet-Up on September 25th at 6:00 PM at the Downtown Convention Center. Click here to RSVP and get more details."
  },
  {
    title: "New Message: A New Message from John Doe",
    date: "September 15, 2024",
    content: "John Doe sent you a message regarding the upcoming career workshop. Click here to read your message."
  },
  {
    title: "Membership Renewal: Membership Renewal Due Soon",
    date: "September 15, 2024",
    content: "Your membership is up for renewal on September 30th. Renew now to continue enjoying all the benefits of being an alumni member."
  },
  {
    title: "Event Reminder: Upcoming Alumni Meet-Up! Message",
    date: "September 15, 2024",
    content: "Don't forget our annual Alumni Meet-Up on September 25th at 6:00 PM at the Downtown Convention Center. Click here to RSVP and get more details."
  },
  {
    title: "New Message: New Message from Jane Doe",
    date: "September 15, 2024",
    content: "Jane Doe sent you a message about the upcoming workshop. Click here to read your message."
  },
  {
    title: "Membership Renewal: Your Membership Renewal is Due Soon",
    date: "September 15, 2024",
    content: "Your membership renewal is due on October 1st. Renew now to enjoy exclusive benefits."
  },
  {
    title: "Event Reminder: Important Meeting Scheduled",
    date: "September 15, 2024",
    content: "Don't forget our important meeting on October 1st at 3:00 PM. Click here for details."
  },
  {
    title: "Event Reminder: Alumni Fundraiser Event",
    date: "September 15, 2024",
    content: "Join us for our alumni fundraiser on October 5th at 7:00 PM. Click here for more info."
  },
  {
    title: "New Message: Update from Alumni Office",
    date: "September 15, 2024",
    content: "Check out the latest updates from the Alumni Office. Click here for details."
  },
  {
    title: "Event Reminder: Guest Speaker Event",
    date: "September 15, 2024",
    content: "Don't miss our guest speaker event on October 10th at 5:00 PM. Click here for details."
  },
  {
    title: "Membership Renewal: Action Required",
    date: "September 15, 2024",
    content: "Your membership needs renewal by October 15th. Don't miss out on your benefits."
  },
  {
    title: "Event Reminder: Workshop Registration Open",
    date: "September 15, 2024",
    content: "Registration for our workshop on October 20th is now open. Click here to register."
  },
  {
    title: "New Message: Feedback from Event",
    date: "September 15, 2024",
    content: "We'd love to hear your feedback from our last event. Click here to share your thoughts."
  },
];

const Notification = () => {
  const handleBack = () => {
    window.history.back(); // Navigate back to the previous page
  };
  useEffect(() => {
    // Set the body background image when the component mounts
    document.body.style.backgroundImage = `url(${nI})`;
    document.body.style.backgroundSize = "cover"; // Optional: make the background image cover the entire screen
    document.body.style.backgroundRepeat = "no-repeat"; // Optional: prevent the image from repeating
    document.body.style.backgroundPosition = "center"; // Optional: center the background image

    // Reset the background image when the component unmounts
    return () => {
      document.body.style.backgroundImage = ""; // Reset to default
    };
  }, []);
  return (
    <><div className="back-icon-notify" onClick={handleBack} style={{ cursor: 'pointer' }}><svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.75 18.75H33.75C34.0815 18.75 34.3995 18.8817 34.6339 19.1161C34.8683 19.3505 35 19.6685 35 20C35 20.3315 34.8683 20.6495 34.6339 20.8839C34.3995 21.1183 34.0815 21.25 33.75 21.25H8.75C8.41848 21.25 8.10054 21.1183 7.86612 20.8839C7.6317 20.6495 7.5 20.3315 7.5 20C7.5 19.6685 7.6317 19.3505 7.86612 19.1161C8.10054 18.8817 8.41848 18.75 8.75 18.75Z" fill="#1B1B1E" />
    <path d="M9.26778 20L19.6353 30.365C19.87 30.5997 20.0019 30.918 20.0019 31.25C20.0019 31.5819 19.87 31.9003 19.6353 32.135C19.4006 32.3697 19.0822 32.5016 18.7503 32.5016C18.4183 32.5016 18.1 32.3697 17.8653 32.135L6.61528 20.885C6.49887 20.7689 6.40652 20.6309 6.3435 20.4791C6.28048 20.3272 6.24805 20.1644 6.24805 20C6.24805 19.8356 6.28048 19.6728 6.3435 19.5209C6.40652 19.369 6.49887 19.2311 6.61528 19.115L17.8653 7.86499C18.1 7.63028 18.4183 7.49841 18.7503 7.49841C19.0822 7.49841 19.4006 7.63028 19.6353 7.86499C19.87 8.09971 20.0019 8.41805 20.0019 8.74999C20.0019 9.08193 19.87 9.40028 19.6353 9.63499L9.26778 20Z" fill="#1B1B1E" />
  </svg>
  </div>
    <div className="notify-container">
       
      {notifications.map((notification, index) => (
        <div className="notify-item" key={index}>
          <div className="notify-details">
            <h3>{notification.title}</h3>
            <p>{notification.content}</p>
          </div>
          <div className="notify-meta">
            <span className="notify-date"><svg width="14" height="18" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 17C5.69 17 5.42 16.885 5.19 16.655C4.96 16.425 4.845 16.155 4.845 15.845C4.845 15.535 4.96 15.2655 5.19 15.0365C5.42 14.8075 5.69 14.6925 6 14.6915C6.31 14.6905 6.58 14.8055 6.81 15.0365C7.04 15.2675 7.155 15.5375 7.155 15.8465C7.155 16.1555 7.04 16.425 6.81 16.655C6.58 16.885 6.31 17 6 17ZM12 17C11.69 17 11.42 16.885 11.19 16.655C10.96 16.425 10.845 16.155 10.845 15.845C10.845 15.535 10.96 15.2655 11.19 15.0365C11.42 14.8075 11.69 14.6925 12 14.6915C12.31 14.6905 12.58 14.8055 12.81 15.0365C13.04 15.2675 13.155 15.5375 13.155 15.8465C13.155 16.1555 13.04 16.425 12.81 16.655C12.58 16.885 12.31 17 12 17ZM18 17C17.69 17 17.42 16.885 17.19 16.655C16.96 16.425 16.845 16.155 16.845 15.845C16.845 15.535 16.96 15.2655 17.19 15.0365C17.42 14.8075 17.69 14.6925 18 14.6915C18.31 14.6905 18.58 14.8055 18.81 15.0365C19.04 15.2675 19.155 15.5375 19.155 15.8465C19.155 16.1555 19.04 16.425 18.81 16.655C18.58 16.885 18.31 17 18 17ZM2.424 27.6725C1.733 27.6725 1.1565 27.4415 0.6945 26.9795C0.2325 26.5175 0.001 25.941 0 25.25V6.09501C0 5.40501 0.2315 4.82901 0.6945 4.36701C1.1575 3.90501 1.734 3.67351 2.424 3.67251H5.0775V0.327515H6.693V3.67251H17.424V0.327515H18.924V3.67251H21.5775C22.2675 3.67251 22.844 3.90401 23.307 4.36701C23.77 4.83001 24.001 5.40652 24 6.09651V25.25C24 25.94 23.769 26.5165 23.307 26.9795C22.845 27.4425 22.268 27.6735 21.576 27.6725H2.424ZM2.424 26.1725H21.5775C21.8075 26.1725 22.019 26.0765 22.212 25.8845C22.405 25.6925 22.501 25.4805 22.5 25.2485V12.0965H1.5V25.25C1.5 25.48 1.596 25.6915 1.788 25.8845C1.98 26.0775 2.1915 26.1735 2.4225 26.1725M1.5 10.595H22.5V6.09501C22.5 5.86501 22.404 5.65351 22.212 5.46051C22.02 5.26751 21.808 5.17151 21.576 5.17251H2.424C2.193 5.17251 1.981 5.26851 1.788 5.46051C1.595 5.65251 1.499 5.86451 1.5 6.09651V10.595Z" fill="#8B8B8B"/>
</svg>
Date: {notification.date}</span>
            <div className="notify-actions">
              <button className="notify-action-btn"><svg width="15" height="16" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.4219 3.29688H10.0625C10.2602 3.29688 10.4219 3.13516 10.4219 2.9375V3.29688ZM10.4219 3.29688H24.0781V2.9375C24.0781 3.13516 24.2398 3.29688 24.4375 3.29688H24.0781V6.53125H27.3125V2.9375C27.3125 1.35176 26.0232 0.0625 24.4375 0.0625H10.0625C8.47676 0.0625 7.1875 1.35176 7.1875 2.9375V6.53125H10.4219V3.29688ZM33.0625 6.53125H1.4375C0.642383 6.53125 0 7.17363 0 7.96875V9.40625C0 9.60391 0.161719 9.76562 0.359375 9.76562H3.07266L4.18223 33.2598C4.2541 34.7916 5.5209 36 7.05273 36H27.4473C28.9836 36 30.2459 34.7961 30.3178 33.2598L31.4273 9.76562H34.1406C34.3383 9.76562 34.5 9.60391 34.5 9.40625V7.96875C34.5 7.17363 33.8576 6.53125 33.0625 6.53125ZM27.1014 32.7656H7.39863L6.31152 9.76562H28.1885L27.1014 32.7656Z" fill="#1B1B1E"/>
</svg>
</button>
              <button className="notify-action-btn1"><svg width="15" height="16" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.6875 3.65625C6.54375 3.65625 5.44685 4.1106 4.6381 4.91935C3.82935 5.7281 3.375 6.825 3.375 7.96875V28.0938C3.375 29.2375 3.82935 30.3344 4.6381 31.1431C5.44685 31.9519 6.54375 32.4062 7.6875 32.4062H27.8125C28.9562 32.4062 30.0531 31.9519 30.8619 31.1431C31.6706 30.3344 32.125 29.2375 32.125 28.0938V21.6825C32.125 21.3013 32.2764 20.9356 32.546 20.666C32.8156 20.3965 33.1813 20.245 33.5625 20.245C33.9437 20.245 34.3094 20.3965 34.579 20.666C34.8485 20.9356 35 21.3013 35 21.6825V28.0938C35 30 34.2427 31.8282 32.8948 33.1761C31.5469 34.524 29.7187 35.2812 27.8125 35.2812H7.6875C5.78126 35.2812 3.95309 34.524 2.60517 33.1761C1.25725 31.8282 0.5 30 0.5 28.0938V7.96875C0.5 6.06251 1.25725 4.23434 2.60517 2.88642C3.95309 1.5385 5.78126 0.78125 7.6875 0.78125H14.0988C14.48 0.78125 14.8456 0.932701 15.1152 1.20228C15.3848 1.47187 15.5363 1.8375 15.5363 2.21875C15.5363 2.6 15.3848 2.96563 15.1152 3.23522C14.8456 3.5048 14.48 3.65625 14.0988 3.65625H7.6875ZM19.9638 2.21875C19.9638 1.8375 20.1152 1.47187 20.3848 1.20228C20.6544 0.932701 21.02 0.78125 21.4013 0.78125H33.5625C33.9437 0.78125 34.3094 0.932701 34.579 1.20228C34.8485 1.47187 35 1.8375 35 2.21875V14.38C35 14.7612 34.8485 15.1269 34.579 15.3965C34.3094 15.666 33.9437 15.8175 33.5625 15.8175C33.1813 15.8175 32.8156 15.666 32.546 15.3965C32.2764 15.1269 32.125 14.7612 32.125 14.38V5.69175L22.4161 15.3977C22.2835 15.535 22.1249 15.6446 21.9495 15.7199C21.7741 15.7952 21.5855 15.8349 21.3946 15.8365C21.2038 15.8382 21.0145 15.8018 20.8378 15.7296C20.6612 15.6573 20.5007 15.5505 20.3657 15.4156C20.2307 15.2806 20.124 15.1201 20.0517 14.9434C19.9794 14.7668 19.943 14.5775 19.9447 14.3866C19.9464 14.1957 19.986 14.0071 20.0614 13.8317C20.1367 13.6564 20.2462 13.4977 20.3835 13.3651L30.0924 3.65625H21.3984C21.0171 3.65625 20.6515 3.5048 20.3819 3.23522C20.1123 2.96563 19.9609 2.6 19.9609 2.21875" fill="#1B1B1E"/>
</svg>
</button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Notification;
