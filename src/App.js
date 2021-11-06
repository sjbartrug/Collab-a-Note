import React from "react";
import HomePage from "./view/pages/HomePage";
import Signup from "./view/components/AuthPage/SignUp";
import Signin from "./view/components/AuthPage/SignIn/index";
import NotePage from "./view/pages/NotePage";
import DashBoardPage from "./view/pages/DashBoardPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./view/components/shared/NavigationBar";
import CourseDetailPage from "./view/pages/CourseDetailPage";
import { AuthProvider } from "./view/context/AuthContext";
import PrivateRoute from "./view/components/PrivateRoute/index";
import ForgotPassword from "./view/components/AuthPage/ForgotPassword";
import UpdateProfile from "./view/components/AuthPage/UpdateProfile/index";
import AboutPage from "./view/pages/AboutPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/" exact component={AboutPage} />
          <PrivateRoute path="/home" exact component={HomePage} />
          <PrivateRoute path="/dashboard" exact component={DashBoardPage} />
          <PrivateRoute path="/note" component={NotePage} />
          <PrivateRoute path="/dashboard/course" component={CourseDetailPage} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;

// const App = () => (
//   <Router>
//     <div>
//       <Navigation />

//       <hr />

//       <Route exact path={ROUTES.LANDING} component={LandingPage} />
//       <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
//       <Route path={ROUTES.SIGN_IN} component={SignInPage} />
//       <Route
//         path={ROUTES.PASSWORD_FORGET}
//         component={PasswordForgetPage}
//       />
//       <Route path={ROUTES.HOME} component={HomePage} />
//       <Route path={ROUTES.ACCOUNT} component={AccountPage} />
//       <Route path={ROUTES.ADMIN} component={AdminPage} />
//     </div>
//   </Router>
// );

// export default withAuthentication(App);
