import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import Register from './components/Register'
import ProfileContainer from './components/ProfileContainer'
import { Switch, Route } from 'react-router-dom' 


const App = () => {
  return (
    <div className="App" id="main">
    <Navbar />
    <Switch>
      <Route exact path="/" component={ LoginForm } />
      <Route path="/register" component={ Register } />
      <Route path="/profile" component={ ProfileContainer } />
    </Switch>
    </div>
  );
}

export default App;
