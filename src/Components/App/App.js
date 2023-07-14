import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import WelcomePage from '../WelcomePage/WelcomePage';
import BrowseEvent from '../BrowseEvent/BrowseEvent';
import ProfilePage from '../Profile/Profile';
import './App.css';
import Form from '../EventCreation/Form/Form';
import Error from '../Error/Error';
import { EventDetails } from '../EventDetails/EventDetails';
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
    if (!loading && !error && data) {
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
  if (error) return <p>Error : {error.message}</p>;

  return (
    <Router>
      <main className="App">
        <Switch>
          {loggedIn ? (
            <>
              <Route exact path="/browse">
                <BrowseEvent selectedUser={selectedUser} logoutUser={logoutUser} />
              </Route>
              <Route exact path="/profile">
                <ProfilePage logoutUser={logoutUser} selectedUser={selectedUser} userData={data.user} />
              </Route>
              <Route exact path="/create">
                <Form logoutUser={logoutUser} loggedInUser={selectedUser} userData={data.user} />
              </Route>
              <Route exact path="/events/:id">
                <EventDetails loggedInUser={selectedUser} logoutUser={logoutUser} />
              </Route>
              <Route path="/error">
                <Error error="Oops! Looks like we rolled a critical error. Time to reshuffle the digital deck!" />
              </Route>
              <Route path="*">
                <Redirect to="/browse" />
              </Route>
            </>
          ) : (
            <>
              <Route exact path="/">
                <WelcomePage loginUser={loginUser} />
              </Route>
              <Route path="/error">
                <Error error="Oops! Looks like we rolled a critical error. Time to reshuffle the digital deck!" />
              </Route>
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </>
          )}
        </Switch>
      </main>
    </Router>
  );
}

export default App;