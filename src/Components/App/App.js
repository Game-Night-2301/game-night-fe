import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client'; 
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import WelcomePage from '../WelcomePage/WelcomePage';
import BrowseEvent from '../BrowseEvent/BrowseEvent';
import './App.css';
import Form from '../EventCreation/Form/Form';
import Error from '../Error/Error';
import {
  getUser,
  // getAllUsers, 
  // getEvent,
  // getAllEvents,
  // createEvent,
  // addUserToEvent,
  // removeUserFromEvent,
  // cancelEvent
} from '../../queries/index';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { loading, error, data } = useQuery(getUser, { variables: { id: selectedUser }, skip: !selectedUser });

  useEffect(() => {
    console.log('Selected user:', selectedUser);
    if (!loading && !error && data) {
      console.log('Retrieved user:', data.user);
    }
  }, [loading, error, data, selectedUser]);

  const loginUser = (userId) => {
    setSelectedUser(userId);
    setLoggedIn(true);
  };

  const logoutUser = () => {
    setSelectedUser(null);
    setLoggedIn(false);
  };

  if (loading) return <p>Loading...</p>; 
  if (error) return <p>Error :</p>; 

  return (
    <Router>
      <main className="App">
        <Switch>
          <Route exact path="/">
            {loggedIn ? (
              <Redirect to="/browse" />
            ) : (
              <WelcomePage loginUser={loginUser} logoutUser={logoutUser} />
            )}
          </Route>
          <Route exact path="/browse">
            {loggedIn ? (
              <BrowseEvent selectedUser={selectedUser} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          {/* <Route exact path="/profile">
            <User />
          </Route> */}
          <Route exact path="/new-event">
            <Form />
          </Route>
          <Route>
            <Error  Route exact path="/*"/>
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;