import React from 'react'
import './css/LoginForm.css'
import { Form, Button, Card } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addUser } from '../actions/users'

class LoginForm extends React.Component{

    state={
        user:{
        username: '',
        password: ''
    }}

    handleChange = (e) =>{
        this.setState({user:{...this.state.user, [e.target.name]: e.target.value}})
    }

    handleSubmit=()=>{
        this.props.addUser(this.state.user)
    }

    render(){
        return(
            <React.Fragment>
            <h1 id="welcome">Welcome to <span id="logo">Datr</span></h1>
            <div id="wrapper" className="ui container">
                <Card id="login-component" color="red">
                <Form onSubmit={()=>{this.handleSubmit()}}>
                    <Form.Field>
                        <label id="label">Username</label>
                        <input placeholder="Username" name="username" type="text" onChange={(e)=>this.handleChange(e)}/>
                    </Form.Field>
                    <Form.Field>
                        <label id="label">Password</label>
                        <input placeholder="Password" name="password" type="password" onChange={(e)=>this.handleChange(e)}/>
                    </Form.Field>
                    <Button id="loginBtn" type="submit">Login</Button>
                    <Link to="/register" id="signUpBtn" className="ui button">Sign Up</Link>
                </Form>
                </Card>
            </div>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        addUser: (user) =>{
            dispatch(addUser(user))
        }
    }
}

export default connect(null, mapDispatchToProps)(LoginForm)