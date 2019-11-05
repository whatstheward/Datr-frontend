import React from 'react';
import { connect } from 'react-redux'
import { Menu, Image } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import './css/Navbar.css'
import SearchBar from './SearchBar';
import PartnerRequest from './PartnerRequest';

class Navbar extends React.Component{

    goToProfile = () => {
        this.props.storeViewUser(this.props.currentUser)
        this.props.history.push(`/profile/${this.props.currentUser.id}`)
    }

    logOut=()=>{
        localStorage.clear()
        this.props.logUserOut()
    }

    loggedIn = () => {
        if(this.props.token){
            return(
                <div className="right menu">
                    <SearchBar />
                    <div className="item"><Link to="/date_randomizer">Date Randomizer</Link></div>
                    <PartnerRequest />
                    {/* Add Date Requests */}
                    <div className="item"><Image size="mini"  onClick={()=> this.goToProfile() }src={this.props.currentUser.image} alt="Profile Picture"/></div>
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

    const mapDispatchToProps = dispatch => {
        return {
        storeViewUser: (data) => dispatch({type:"FETCH_USER_PROFILE", data: data}),
        clearDateState: () => dispatch({type:"SAVE_DATE"}),
        logUserOut: () => dispatch({type: 'LOG_OUT', data: !!localStorage.getItem('token')})
        }
    }

export default connect(mapPropsToState, mapDispatchToProps)(withRouter(Navbar))