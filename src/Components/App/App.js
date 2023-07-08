import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../ReusableComponents/Header/Header';
import WelcomePage from '../WelcomePage/WelcomePage';
import BrowseEvent from '../BrowseEvent/BrowseEvent';
import Form from '../EventDetails/Form/Form';
import Error from '../Error/Error';

function App() {
  const [user, setUser] = useState('');

  return (
    <main className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <WelcomePage />
        </Route>
        <Route exact path="/browser">
          <BrowseEvent />
        </Route>
        {/* <Route exact path="/profile">
          <User />
        </Route> */}
        <Route exact path="/new-event">
          <Form />
        </Route>
        <Route exact path="/*">
          <Error />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
