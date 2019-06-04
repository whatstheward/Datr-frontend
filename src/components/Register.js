import React from 'react'
import './css/Register.css'
import _ from 'lodash'
import { Grid, Card, Form } from 'semantic-ui-react';

class Register extends React.Component{

    render(){
        return(
            <Grid>
                <Grid.Column width={5}></Grid.Column>
                <Grid.Column id="mainColumn" width={6}>
                <Card id="formContainer" color="red">
                    <Form id="registerForm">
                        <Form.Field>
                            <label>First Name</label>
                            <input type="text" name="username" placeholder="First Name" />
                        </Form.Field>
                        <Form.Field>
                            <label>Last Name</label>
                            <input type="text" name="username" placeholder="First Name" />
                        </Form.Field>
                        <Form.Field>
                            <label>Age</label>
                            <select id="selectCss" type="integer" name="age" placeholder="Age">
                                {_.range(1, 100).map(int => <option value={int}>{int}</option>)}
                            </select>
                        </Form.Field>
                    </Form>
                </Card>
                </Grid.Column>
                <Grid.Column width={5}></Grid.Column>

            </Grid>
        )
    }
}

export default Register