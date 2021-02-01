import React, { Component } from "react";
import "./Home.styles.css";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UserProfile from "../UserProfile/UserProfile";
import EditUserDetails from "../EditUserDetails/EditUserDetails";
import UsersIndex from "../UsersIndex/UsersIndex";
import IndividualUserFromIndexProfile from "../IndividualUserFromIndex/IndividualUserFromIndexProfile";
import IndividualUserFromIndexEditProfile from "../IndividualUserFromIndex/IndividualUserFromIndexEditProfile";

class Home extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/editprofile:profileId">
                        <IndividualUserFromIndexEditProfile />
                    </Route>
                    <Route path="/profile:profileId">
                        <IndividualUserFromIndexProfile />
                    </Route>
                    <Route path="/usersindex">
                        <UsersIndex />
                    </Route>
                    <Route path="/editprofile">
                        <EditUserDetails />
                    </Route>
                    <Route path="/profile">
                        <UserProfile />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route path="/signin">
                        <SignIn />
                    </Route>
                    <Route path="/">
                        <div id="main">
                            <div>
                               
                                <h1 className="f1 tc logo"> Skand </h1>
                                <div id="button-container">
                                    <Link
                                        to="/signup"
                                        className="b maxwidth no-underline ph5 mb2 pv2 input-reset ba b--white-025 white grow pointer f3 dib bg-SignUp br-pill buttonFont"
                                    >
                                        Sign Up
                                    </Link>
                                    <Link
                                        to="/signin"
                                        className="b maxwidth no-underline ph5 mb2 pv2 input-reset ba b--white-025 white grow pointer f3 dib bg-SignIn br-pill buttonFont"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default Home;
