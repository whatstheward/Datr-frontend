import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import { Switch, Route } from 'react-router-dom' 


const App = () => {
  return (
    <React.Fragment>
    <Navbar />
    <Switch>
      <Route path="/" component="Login" />
    </Switch>
    </React.Fragment>
  );
}

export default App;
