import React from 'react';
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component{

    render(){
        return(
        <Menu>
            <Link to="/" class="item">Home</Link>
            <div class="right menu">
                <div class="item"><Link to="/register" class="ui primary button">Sign Up</Link></div>
            </div>
        </Menu>
    )}
}

export default connect()(Navbar)