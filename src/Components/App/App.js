import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logoutUser } from '../../redux/user/actions';

function App() {
  const dispatch = useDispatch();
  const client = useApolloClient();
  const user = useSelector(state => state.user);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      loginUser(user.id);
    }
  }, []);

  const loginUser = async (userId) => {
    try {
      const { data } = await client.query({
        query: getUser,
        variables: { id: userId },
      });
      dispatch(setUser(data.user));
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
      localStorage.removeItem('user');
    }
  };

  if (user) {
    return (
      <Router>
        <main className="App">
          <Switch>
            <Route exact path="/browse">
              <BrowseEvent/>
            </Route>
            <Route exact path="/profile">
                <ProfilePage />
            </Route>
            <Route exact path="/create">
              <Form />
            </Route>
            <Route exact path="/events/:id">
              <EventDetails />
            </Route>
            <Route exact path="/recommendations">
              <RecommendationsPage />
            </Route>
            <Route path="/error">
              <Error error="Oops! Looks like we rolled a critical error. Time to reshuffle the digital deck!" />
            </Route>
            <Route path="*">
              <Redirect to="/browse" />
            </Route>
          </Switch>
        </main>
      </Router>
    );
  } 

  return (
    <Router>
      <main className="App">
        <Switch>
          <Route exact path="/">
            <WelcomePage loginUser={loginUser} />
          </Route>
          <Route path="/error">
            <Error error="Oops! Looks like we rolled a critical error. Time to reshuffle the digital deck!" />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;