import React from 'react'
import './css/LoginForm.css'
import { Form, Button, Card, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginUser, getCurrentUser } from '../services/backend'

class LoginForm extends React.Component{

    state={
        user:{
        username: '',
        password: ''},
        errors: null
    }

    handleChange = (e) =>{
        this.setState({user:{...this.state.user, [e.target.name]: e.target.value}})
    }

    handleLogin = () => {
        loginUser(this.state.user)
        .then(data => {
            if(data.errors){
                this.setState({errors: data.errors})
            }else{
            localStorage.setItem("token", data.token)}})
            .then(this.props.addUser)
    }

    checkErrors = () => {
        if(this.state.errors){
            return (
            <div id="errorMsg">
                {this.state.errors.map(error => <h3>{error}</h3>)}
            </div>)
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.currentUser !== this.props.currentUser){
            this.props.history.push(`/profile/${this.props.currentUser.id}`)
        }
    }



    render(){
        if(this.props.token){
            getCurrentUser(localStorage.token).then(data => { 
                if(data.status === 404){
                    localStorage.clear()
                }else{
                this.props.storeCurrentUser(data)
                this.props.storeViewUser(data)}
            })
        }
        return(
            <Grid>
            <Grid.Column width={3}/>
            <Grid.Column width={10} id="mainColumn">
            <h1 id="welcome">Welcome to <span id="logo">Datr</span></h1>
            <div id="wrapper">
                <Card id="login-component">
                {this.checkErrors()}
                <Form onSubmit={()=>this.handleLogin()}>
                    <Form.Field>
                        <label id="label">Username</label>
                        <input placeholder="Username" name="username" type="text" onChange={(e)=>this.handleChange(e)}/>
                    </Form.Field>
                    <Form.Field>
                        <label id="label">Password</label>
                        <input placeholder="Password" name="password" type="password" onChange={(e)=>this.handleChange(e)}/>
                    </Form.Field>
                    <Button id="loginBtn" type="submit" >Login</Button>
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

const mapStateToProps = state => {
    return{ 
        token: state.session.token,
        currentUser: state.user.currentUser
    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
        addUser: () => dispatch({type: 'LOG_IN', data: !!localStorage.getItem('token')}),
        storeCurrentUser: (data) => dispatch({type:'FETCH_CURRENT_USER', data: data}),
        storeViewUser:  (data) => dispatch({type:"FETCH_USER_PROFILE", data: data})
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)