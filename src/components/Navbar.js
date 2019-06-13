import React from 'react';
import { connect } from 'react-redux'
import { Menu, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './css/Navbar.css'

class Navbar extends React.Component{

    logOut=()=>{
        localStorage.clear()
        this.props.dispatch({type: 'LOG_OUT', data: !!localStorage.getItem('token')})
    }

    loggedIn = () => {
        if(this.props.token){
            return(
                <div className="right menu">
                    <div className="item"><Link to="/date_randomizer">Date Randomizer</Link></div>
                    <div className="item"><Link to="/profile"><Image size="mini" src={this.props.currentUser.image} alt="Profile Picture"/></Link></div>
                    <div className="item"><Link to="/" className="primary ui button" onClick={()=>this.logOut()} >Logout</Link></div>
                </div>
            )
        }else{
            return(
            <React.Fragment>
                <div className="right menu">
                    <div className="item"><Link to="/register" className="ui primary button">Sign Up</Link></div>
                </div>
            </React.Fragment>
            )
    }}
    
    render(){
        return(
        <Menu id="navBar">
                {this.loggedIn()}
        </Menu>
    )}
}

    const mapPropsToState = (state) => {
        return{
        token: state.session.token,
        currentUser: state.user.currentUser
        }
    }

export default connect(mapPropsToState)(Navbar)