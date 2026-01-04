// src/App.js
// import React from "react";
// import LandingPage from "./LandingPAge/LandingPage";
// import SignupVerificationPage from "./SignupVerificationPage/SignupVerificationPage";



// const App = () => {
//   return (

//      <div><LandingPage/></div>
//   );
// };

// export default App;
import React from "react";
import LandingPage from "./LandingPAge/LandingPage";
import SignupVerificationPage from "./SignupPage/SignupVerificationPage/SignupVerificationPage"
import SuccessPage from "./SignupPage/SuccessPage";
import ForgotPassword from "./SigninPage/ForgetPassword";
import ResetPassword from "./SigninPage/ResetPassword";
import PrivacyPolicy from "./PrivacyPolicyPage/PrivacyPolicy";
import Dashboard from "./Dashboard/Dashboard";
import NetworkingMessage from "./Networking/NetworkingMessage";
import AcademicsInformation from "./ProfilePage/AcademicsInformation";
import HelpSupport from "./ProfilePage/HelpSupport";
import Logout from "./ProfilePage/Logout";
import ProfileFirst from "./ProfilePage/ProfileFirst";
import Profilecommon from "./ProfilePage/Profilecommon";
import ProfileSettings from "./ProfilePage/ProfileSettings";
import SecurityPage from "./ProfilePage/SecurityPage";
import TermsAndConditions from "./TermsofconditionPage/TermsAndConditions";
import EventsDash from "./EventsPage/EventsDash";
import EventView from "./EventsPage/EventsView";
import EventsHome from "./EventsPage/EventsHome";
import NewsDash from "./NewsPage/NewsDash";
import JobsDash from "./JobsPage/JobsDash";
import JobsDetails from "./JobsPage/JobsDetails";
import JobsHome from "./JobsPage/JobsHome";
import DonationDetails from "./DonationPage/DonationDetails";
import DonationHome from "./DonationPage/DonationHome";
import SupportChat from "./SupportPage/SupportChat";
import CreateDonation from './DonationPage/CreateDonation';
import CreateTicket from './SupportPage/CreateTicket';
import SupportHome from "./SupportPage/SupportHome";
import SupportRead from "./SupportPage/SupportRead";
import AccountSettings from "./Setting.js/AccountSettings";
import ArticlesHome from "./ArticleandBlog/ArticlesHome";
import ArticleRead from "./ArticleandBlog/ArticleRead";
import ArticleDash from "./ArticleandBlog/ArticleDash";
import Networking from "./Networking/NetworkingHome";
import NetworkingHome from "./Networking/NetworkingHome";
import NewsHome from "./NewsPage/NewsHome";
import NewsRead from "./NewsPage/NewsRead";
import OtpPage from "./SignupPage/OtpPage";
import CreateArticle from './ArticleandBlog/CreateBlog';
import EditArticle from './ArticleandBlog/EditBlog';
import CreateNews from './NewsPage/CreateNews';
import EditNews from './NewsPage/EditNews';
import EditEvent from './EventsPage/EditEvent';

import CreateFAQ from './SupportPage/CreateFAQ';
import EditFAQ from './SupportPage/EditFAQ';
import CreateJob from './JobsPage/CreateJob';
import EditJob from './JobsPage/EditJob';
import OtpPageSignin from "./SigninPage/OtpPageSignin";
// ... (omitting lines between import and route for brevity in this logical step, will use multi-chunk in tool call)
// ... (omitting lines between import and route for brevity in this logical step, will use multi-chunk in tool call)
import Signup from "./SignupPage/Signup";
import Signin from "./SigninPage/Signin";
import SigninBack from "./SigninPage/SigninBack";

import Comment from "./NewsPage/Comment";
import JobView from "./JobsPage/JobView";
import FAQPage from "./SupportPage/FAQPage";

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (

    <Routes>
      {/* Show Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* <Route path="/signup" element={<Signup />} /> */}
      {/* <Route path="/signin" element={<Signin />} /> */}
      <Route path="/signin-back" element={<SigninBack />} />
      {/* Show Signup Verification Page */}
      {/* <Route path="/signup-verification" element={<SignupVerificationPage />} />     */}
      {/* <Route path="/otp" element={<OtpPage />} /> */}
      {/* <Route path="/otp-signin" element={<OtpPageSignin />} /> */}
      {/* <Route path="/success" element={<SuccessPage />} /> */}
      {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
      {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
      {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
      {/* <Route path="/terms-conditions" element={<TermsAndConditions />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/networking-message" element={<NetworkingMessage />} /> */}
      {/* <Route path="/academics-information" element={<AcademicsInformation />} /> */}
      {/* <Route path="/help-support" element={<HelpSupport />} /> */}
      {/* <Route path="/logout" element={<Logout />} /> */}
      {/* <Route path="/profile-first" element={<ProfileFirst />} /> */}
      {/* <Route path="/profile-settings" element={<ProfileSettings />} /> */}
      {/* <Route path="/security" element={<SecurityPage />} /> */}
      {/* <Route path="/events-dash" element={<EventsDash />} /> */}
      {/* <Route path="/event-view" element={<EventView />} /> */}
      {/* <Route path="/events-home" element={<EventsHome />} /> */}
      {/* <Route path="/news-dash" element={<NewsDash />} /> */}
      {/* <Route path="/news-read" element={<NewsRead />} /> */}
      <Route path="/jobs-dash" element={<JobsDash />} />
      <Route path="/job-view/:id" element={<JobView />} />
      <Route path="/details-view/:id" element={<DonationDetails />} />
      {/* <Route path="/support-chat" element={<SupportChat />} /> */}
      <Route path="/support-home" element={<SupportHome />} />

      <Route path="/support-readnow" element={<SupportRead />} />
      <Route path="/support-chatlive" element={<SupportChat />} />
      <Route path="/create-faq" element={<CreateFAQ />} />
      <Route path="/edit-faq/:id" element={<EditFAQ />} />
      <Route path="/create-ticket" element={<CreateTicket />} />
      <Route path="/create-job" element={<CreateJob />} />
      <Route path="/edit-job/:id" element={<EditJob />} />

      <Route path="/create-article" element={<CreateArticle />} />
      <Route path="/edit-article/:id" element={<EditArticle />} />
      {/* <Route path="/support-read" element={<SupportRead />} /> */}
      {/* <Route path="/faq" element={<FAQPage />} /> */}
      {/* <Route path="/article-dash" element={<ArticleDash />} /> */}
      {/* <Route path="/article-read" element={<ArticleRead />} /> */}
      {/* <Route path="/account-settings" element={<AccountSettings />} /> */}
      {/* <Route path="/networking-home" element={<NetworkingHome />} /> */}
    </Routes>
  );
};

export default App;
