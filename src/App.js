import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import Register from './components/Register'
import ProfileContainer from './components/ProfileContainer'
import DateRandomizer from './components/DateRandomizer'
import { Switch, Route } from 'react-router-dom' 


class App extends React.Component{
  
  render(){
    return (
      <div className="App" id="main">
      <Navbar />
      <Switch>
        <Route exact path="/" component={ LoginForm } />
        <Route path="/register" component={ Register } />
        <Route path="/profile" component={ ProfileContainer } />
        <Route path="/date_randomizer" component={ DateRandomizer } />
      </Switch>
      </div>
    );
  }
}

export default connect()(App);
