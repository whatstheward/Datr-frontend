import React from 'react';
import { connect } from 'react-redux'
import { Menu, Button } from 'semantic-ui-react'
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
            <div class="item"><Button className="primary" onClick={()=>this.logOut()} >Logout</Button></div>
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