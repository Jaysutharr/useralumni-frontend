import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router, Routes, and Route

import App from './App';
import Signup from './SignupPage/Signup';
import LandingPage from './LandingPAge/LandingPage';
import OtpPage from './SignupPage/OtpPage';
import SuccessPage from './SignupPage/SuccessPage';
import Signin from './SigninPage/Signin';
import ForgetPassword from './SigninPage/ForgetPassword';
import OtpPageSignin from './SigninPage/OtpPageSignin';
import ResetPassword from './SigninPage/ResetPassword';
import PrivacyPolicy from './PrivacyPolicyPage/PrivacyPolicy'
import TermsAndConditions from './TermsofconditionPage/TermsAndConditions';
import Dashboard from './Dashboard/Dashboard'
import ProfileFirst from './ProfilePage/ProfileFirst';
import AcademicsInfromation from './ProfilePage/AcademicsInformation'
import SecurityPage from './ProfilePage/SecurityPage'
import TeamsConnections from './ProfilePage/TeamsConnections';
import ProfileSettings from './ProfilePage/ProfileSettings'
import HelpSupport from './ProfilePage/HelpSupport'
import Logout from './ProfilePage/Logout'
import AccountSettings from './Setting.js/AccountSettings';
import NetworkingHome from './Networking/NetworkingHome';
import EventsHome from './EventsPage/EventsHome'
import EventView from './EventsPage/EventsView';
import EditEvent from './EventsPage/EditEvent';
import NewsRead from './NewsPage/NewsRead';
import JobsHome from './JobsPage/JobsHome';
import JobsDetails from './JobsPage/JobsDetails';
import ArticlesHome from './ArticleandBlog/ArticlesHome'
import NewsHome from './NewsPage/NewsHome';
import ArticleRead from './ArticleandBlog/ArticleRead';
import DonationHome from './DonationPage/DonationHome';
import DonationDetails from './DonationPage/DonationDetails';
import NetworkingMessage from './Networking/NetworkingMessage';
import NetworkingData from './Networking/NetworkingData';
import SupportHome from './SupportPage/SupportHome';
import SupportRead from './SupportPage/SupportRead';
import SupportChat from './SupportPage/SupportChat';
import Notification from './NotificationPage/Notification';
import DashboardHome from './Dashboard/DashboardHome';
import AboutUs from './LandingPAge/AboutUs'
import JobsDash from './JobsPage/JobsDash';
import ArticleDash from './ArticleandBlog/ArticleDash';
import NewsDash from './NewsPage/NewsDash';
// import Signin from './Signin';
import SignupVerificationPage from "./SignupPage/SignupVerificationPage/SignupVerificationPage";
import Comment from './NewsPage/Comment';
import JobView from './JobsPage/JobView';
import CreateBlog from './ArticleandBlog/CreateBlog';
import EditBlog from './ArticleandBlog/EditBlog';
import CreateNews from './NewsPage/CreateNews';
import EditNews from './NewsPage/EditNews';
import CreateDonation from './DonationPage/CreateDonation';
import EditDonation from './DonationPage/EditDonation';
import CreateTicket from './SupportPage/CreateTicket';
import CreateEvent from './EventsPage/CreateEvent';
import CreateFAQ from './SupportPage/CreateFAQ';
import EditFAQ from './SupportPage/EditFAQ';
import CreateJob from './JobsPage/CreateJob';
import EditJob from './JobsPage/EditJob';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/" element={<LandingPage />} /> {/* Landing Page */}
        <Route path='/about' element={<AboutUs />} />
        <Route path="/signup" element={<Signup />} /> {/* Signup Page */}
        <Route path='/signup-back' element={<Signup />} />
        <Route path="/signin1" element={<Signin />} />
        <Route path="/signin1" element={<Signin />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} /> {/* Signup Page */}
        <Route path="/otp" element={<OtpPage />} /> {/* OTP Verification Page */}
        <Route path="/success" element={<SuccessPage />} /> {/* Success Page */}
        <Route path='/login' element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/otp1" element={<OtpPageSignin />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path='/dashboard1' element={<Dashboard />} />
        <Route path="/profile" element={<ProfileFirst />} />
        <Route path="/academics" element={<AcademicsInfromation />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/teams-connections" element={<TeamsConnections />} />
        <Route path="/settings" element={<ProfileSettings />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/logout" element={<Logout />} />
        <Route path='/settingsacc' element={<AccountSettings />} />
        <Route path="/networking" element={<NetworkingHome />} />
        <Route path='/network-profile' element={<NetworkingData />} />
        <Route path='/network-message' element={<NetworkingMessage />} />
        <Route path="/events" element={<EventsHome />} />
        <Route path="/eventview" element={<EventView />} />
        <Route path='/news' element={<NewsDash />} />
        <Route path='/readnow-news' element={<NewsDash />} />
        <Route path='/news-home' element={<NewsHome />} />
        <Route path='/news-read' element={<NewsRead />} />
        <Route path='/jobs' element={<JobsDash />} />
        <Route path='/jobs-dash' element={<JobsDash />} />
        <Route path='/job-details' element={<JobsDetails />} />
        <Route path='/articles-blogs' element={<ArticleDash />} />
        <Route path='/readnow-article' element={<ArticleRead />} />
        <Route path='/donation' element={<DonationHome />} />
        <Route path='/details-view/:id' element={<DonationDetails />} />
        <Route path='/dashboard-support' element={<SupportHome />} />
        <Route path='/support-readnow' element={<SupportRead />} />
        <Route path='/support-chatlive' element={<SupportChat />} />
        <Route path='/dashboard-noti' element={<Notification />} />
        <Route path='/dashboard-dashboard' element={<Dashboard />} />




        <Route path='/profile-networking' element={<NetworkingHome />} />
        <Route path='/profile-events' element={<EventsHome />} />
        <Route path='/create-event' element={<CreateEvent />} />
        <Route path='/edit-event/:id' element={<EditEvent />} />
        <Route path='/profile-jobs' element={<JobsDash />} />
        <Route path='/profile-donations' element={<DonationHome />} />
        <Route path='/profile-articleandblog' element={<ArticleDash />} />
        <Route path='/profile-support' element={<SupportHome />} />
        <Route path='/profile-setting' element={<AccountSettings />} />
        <Route path="/signup-verification" element={<SignupVerificationPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path='/news-comment' element={<Comment />} />
        <Route path='/JobView' element={<JobView />} />
        <Route path='/job-view/:id' element={<JobView />} />
        <Route path='/create-job' element={<CreateJob />} />
        <Route path='/edit-job/:id' element={<EditJob />} />
        <Route path='/create-faq' element={<CreateFAQ />} />
        <Route path='/edit-faq/:id' element={<EditFAQ />} />
        <Route path='/create-ticket' element={<CreateTicket />} />
        <Route path='/support-chat' element={<SupportChat />} />
        <Route path='/create-blog' element={<CreateBlog />} />
        <Route path='/edit-blog' element={<EditBlog />} />
        <Route path='/create-news' element={<CreateNews />} />
        <Route path='/edit-news' element={<EditNews />} />
        <Route path='/create-donation' element={<CreateDonation />} />
        <Route path='/edit-donation/:id' element={<EditDonation />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
