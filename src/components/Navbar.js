import React from 'react';
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
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
                <React.Fragment>
                    <div class="item"><Link to="/date_randomizer">Date Randomizer</Link></div>
                    <div class="item"><Link to="/" className="primary ui button" onClick={()=>this.logOut()} >Logout</Link></div>
                </React.Fragment>
            )
        }else{
            return(
            <div class="item"><Link to="/register" className="ui primary button">Sign Up</Link></div>)
    }}
    
    render(){
        return(
        <Menu id="navBar">
            <Link to="/" class="item">Home</Link>
            <div class="right menu">
                {this.loggedIn()}
            </div>
        </Menu>
    )}
}

    const mapPropsToState = (state) => {
        return{
        token: state.session.token
        }
    }

export default connect(mapPropsToState)(Navbar)