import React, { useState, useEffect } from 'react';
import { useQuery, useApolloClient, gql } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import WelcomePage from '../WelcomePage/WelcomePage';
import BrowseEvent from '../BrowseEvent/BrowseEvent';
import ProfilePage from '../Profile/Profile';
import RecommendationsPage from '../RecommendationsPage/RecommendationsPage';
import './App.css';
import Form from '../EventCreation/Form/Form';
import Error from '../Error/Error';
import PageLoader from '../ReusableComponents/PageLoader/PageLoader';
import { EventDetails } from '../EventDetails/EventDetails';
import { getUser } from '../../queries/index';


function App() {
  const client = useApolloClient();
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { loading, error, data } = useQuery(getUser, { variables: { id: selectedUser }, skip: !selectedUser });

  useEffect(() => {
    const cacheData = client.readQuery({
      query: gql`
        query GetLoggedInUser {
          loggedInUser
        }
      `,
    });

    if (cacheData && cacheData.loggedInUser) {
      setLoggedIn(true);
      setSelectedUser(cacheData.loggedInUser);
    }
  }, [client]);

  const loginUser = (userId) => {
    client.writeQuery({
      query: gql`
        query GetLoggedInUser {
          loggedInUser
        }
      `,
      data: {
        loggedInUser: userId,
      },
    });
    setLoggedIn(true);
    setSelectedUser(userId);
  };

  const logoutUser = () => {
    client.writeQuery({
      query: gql`
        query GetLoggedInUser {
        loggedInUser
        }
      `,
      data: {
        loggedInUser: null,
      },
    });
    setLoggedIn(false);
    setSelectedUser(null);
  };

  if (loading) return <PageLoader />;
  if (error) return <Redirect to="/error" />;

  return (
    <Router>
      <main className="App">
        <Switch>
          {error ? (
            <Route>
              <Redirect to="/error" />
            </Route>
          ) : loggedIn ? (
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
              <Route exact path="/recommendations">
                <RecommendationsPage logoutUser={logoutUser} selectedUser={selectedUser} />
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
};

export default App;