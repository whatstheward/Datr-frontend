import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import { Switch, Route } from 'react-router-dom' 


const App = () => {
  return (
    <div className="App" id="main">
    <Navbar />
    <Switch>
      <Route path="/" component={ LoginForm } />
    </Switch>
    </div>
  );
}

export default App;
