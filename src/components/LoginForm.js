import React from 'react'
import './css/LoginForm.css'
import { Form, Button, Card, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginUser } from '../services/backend'

class LoginForm extends React.Component{

    state={
        user:{
        username: '',
        password: ''
    }}

    handleChange = (e) =>{
        this.setState({user:{...this.state.user, [e.target.name]: e.target.value}})
    }

    handleLogin = () => {
        loginUser(this.state.user).then(this.props.addUser)
        this.props.history.push('/profile')
        
    }



    render(){
        return(
            <Grid>
            <Grid.Column width={3}/>
            <Grid.Column width={10} id="mainColumn">
            <h1 id="welcome">Welcome to <span id="logo">Datr</span></h1>
            <div id="wrapper">
                <Card id="login-component" color="red">
                <Form>
                    <Form.Field>
                        <label id="label">Username</label>
                        <input placeholder="Username" name="username" type="text" onChange={(e)=>this.handleChange(e)}/>
                    </Form.Field>
                    <Form.Field>
                        <label id="label">Password</label>
                        <input placeholder="Password" name="password" type="password" onChange={(e)=>this.handleChange(e)}/>
                    </Form.Field>
                    <Button id="loginBtn" type="submit" onClick={()=>this.handleLogin()}>Login</Button>
                    <Link to="/register" id="signUpBtn" className="ui button">Sign Up</Link>
                </Form>
                </Card>
            </div>
            </Grid.Column>
            <Grid.Column width={3}/>
            </Grid>
        )
    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
        addUser: () => dispatch({type: 'LOG_IN', data: !!localStorage.getItem('token')}) 
        }
    }

export default connect(null, mapDispatchToProps)(LoginForm)