import React from "react";
import Routes from "./Routes/Routes";
import Sidebar from "./Navigation/Sidebar";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import LoginPage from "./Routes/Login/Login";
import Authenticate from "./Routes/Login/Auth";
import { Switch } from "react-router";
import OnboardingPage from "./Routes/Onboarding/OnboardingPage";
import { connect } from "react-redux";
import { INIT_USER_REDUX } from "../Store/actions";
import { useCookies } from 'react-cookie';

const App = (props) => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" exact={true}
                        component={(props) => { return (<LoginPage/>); }}/>
                    <Route path="/auth/result" exact={true}
                        component={(props) => { return (<Authenticate/>); }}/>
                    
                    {/* User redux store is passed for checking if the user is logged in */}
                    <PrivateRoute userReduxStore={props.user} initUserRedux={props.initUserRedux}>
                        <Route path="/onboard" exact={true} component={(props) => {
                            return (<OnboardingPage/>);
                        }}/>
                        <Route path="/" component={(props) => {
                            return (<div
                                className=" bg-nebula-grey-100 w-full h-full antialiased">
                                <div
                                    className="flex flex-col lg:flex-row justify-center">
                                    <Sidebar/>
                                    <div
                                        className="bg-white w-full lg:flex-row lg:max-w-screen-xl">
                                        <Routes/>
                                    </div>
                                </div>
                            </div>);
                        }}/>
                    </PrivateRoute>
                    
                </Switch>
            </BrowserRouter>
        </React.StrictMode>
    );
};


// To allow routes only after user has logged in
function PrivateRoute({ children, ...rest }) {
    const user = rest.userReduxStore;
    let isLoggedIn;
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'githubName', 'id']);
    //Checks if the user is logged in and sets the user redux store with cookies if it is empty
    if(!(user && user.id && user.token)) {
        //Check if cookies are set then set the user redux store with respective values
        if(cookies.token&&cookies.id&&cookies.githubName) {
            rest.initUserRedux({
                token: cookies.token,
                id: cookies.id,
                githubName: cookies.githubName,
            });
            isLoggedIn = true;
        }
        //if the cookies are not set then the user is not logged in
        else {
            isLoggedIn = false;
        }
    }
    //If user  redux store has value and cookie doesn't exist means the cookie has expired
    //ToDo Implement refresh token 
    if(!(cookies.token&&cookies.id&&cookies.githubName)) {
        isLoggedIn = false;
    }
    else {
        isLoggedIn = true;
    }
    return (
      <Route
        {...rest}
        render={({ location }) =>
            isLoggedIn? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location, msg:"Please log in to proceed!" }
              }}
            />
          )
        }
      />
    );
}


const mapStateToProps = state => {
    return {
        user: state.user,
    }
}
const mapDispatchToProps = dispatch => {
    return {
      initUserRedux: (data) => dispatch({ type: INIT_USER_REDUX, payload: {user: data}})
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(App);
