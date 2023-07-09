import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import Header from '../ReusableComponents/Header/Header';
import WelcomePage from '../WelcomePage/WelcomePage';
import BrowseEvent from '../BrowseEvent/BrowseEvent';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const loginUser = (userId) => {
    setSelectedUser(userId);
    setLoggedIn(true);
  };

  const logoutUser = () => {
    setSelectedUser(null);
    setLoggedIn(false);
  };

  return (
    <Router>
      <main className="App">
        {/* <Header /> */}
        <Switch>
          <Route exact path="/">
            {loggedIn ? (
              <Redirect to="/browse" />
            ) : (
              <WelcomePage loginUser={loginUser} logoutUser={logoutUser} />
            )}
          </Route>
          {/* <Route exact path="/browse">
            {loggedIn ? (
              <BrowseEvent selectedUser={selectedUser} />
            ) : (
              <Redirect to="/" />
            )}
          </Route> */}
        </Switch>
      </main>
    </Router>
  );
}

export default App;
