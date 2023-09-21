//import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import ClientRegistration from './ClientRegistration';
//import Profile from './Profile';
//import FuelQuoteForm from './FuelQuoteForm';
//import FuelQuoteHistory from './FuelQuoteHistory';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/ClientRegistration" component={ClientRegistration} />
      </Switch>
    </Router>
  );
}

export default App;