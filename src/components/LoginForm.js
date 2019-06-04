import React from 'react'
import './css/LoginForm.css'
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux'

class LoginForm extends React.Component{

    render(){
        return(
            <React.Fragment>
            <h1 id="welcome">Welcome to <span id="logo">Datr</span></h1>
            <div id="wrapper" className="ui container">
                <div id="login-component" className="ui card">
                <Form>
                    <Form.Field>
                        <label id="label">Username</label>
                        <input placeholder="Username" type="text" />
                    </Form.Field>
                    <Form.Field>
                        <label id="label">Password</label>
                        <input placeholder="Password" type="password" />
                    </Form.Field>
                    <Button type="submit">Login</Button>
                </Form>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default connect()(LoginForm)