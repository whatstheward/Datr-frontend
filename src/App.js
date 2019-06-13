import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import Register from './components/Register'
import ProfileContainer from './components/ProfileContainer'
import DateRandomizer from './components/DateRandomizer'
import ProfileEdit from './components/ProfileEdit'
import { Switch, Route, Redirect } from 'react-router-dom' 


class App extends React.Component{
  
  render(){
    return (
      <div className="App" id="main">
      { this.props.loggedIn ?
      <Navbar />
      :
      null
      }
      <Switch>
        <Route exact path="/" component={ LoginForm } />
        <Route path="/register" render={() => this.props.loggedIn ? 
                                              <Redirect to="/profile"/>
                                              :
                                              <Register /> } />
        <Route exact path="/profile" render={()=> this.props.loggedIn ? 
                                            <ProfileContainer />
                                            :
                                            <Redirect to="/" /> } />
        <Route path="/date_randomizer" render={()=> this.props.loggedIn ?
                                              <DateRandomizer /> 
                                              :
                                              <Redirect to="/" />} />
        <Route path="/edit_profile" render={()=> this.props.loggedIn ?
                                              <ProfileEdit /> 
                                              :
                                              <Redirect to="/" />} />
      </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
      loggedIn: state.session.token
  }
}

export default connect(mapStateToProps)(App);
