import React from 'react'
import './css/Register.css'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Grid, Card, Form, Dropdown, Button } from 'semantic-ui-react';
import { getGenders, getOrientations, getPronouns } from '../services/backend'


class Register extends React.Component{
    
    componentDidMount(){
        getGenders().then(this.props.storeGenders)
        getOrientations().then(this.props.storeOrientations)
        getPronouns().then(this.props.storePronouns)
    }
                
    

    state={
        firstName: '',
        lastName: '',
        age: '',
        genders: [],
        orientations: [],
        pronouns: []
    }

    handleGenderSelect = (e, value) => {
        this.setState({genders:{...this.state.genders, value}})
        console.log(value)
    }
    handleOrientationSelect = (e, value) => {
        this.setState({orientations:{...this.state.orientations, value}})
        console.log(value)
    }
    handlePronounSelect = (e, value) => {
        this.setState({pronouns:{...this.state.pronouns, value}})
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        return(
            <Grid>
                <Grid.Column width={5}></Grid.Column>
                <Grid.Column id="mainColumn" width={6}>
                <Card id="formContainer" color="red">
                    <Form id="registerForm" onSubmit={()=>this.handleSubmit()}>
                        <Form.Field>
                            <label>First Name</label>
                            <input onChange={(e)=>this.handleChange(e)} type="text" name="firstName" placeholder="First Name" />
                        </Form.Field>
                        <Form.Field>
                            <label>Last Name</label>
                            <input onChange={(e)=>this.handleChange(e)} type="text" name="lastName" placeholder="First Name" />
                        </Form.Field>
                        <Form.Field>
                            <label>Age</label>
                            <select onChange={(e)=>this.handleChange(e)} id="selectCss" type="integer" name="age" placeholder="Age">
                                {_.range(1, 100).map(int => <option value={int}>{int}</option>)}
                            </select>
                        </Form.Field>
                        <Form.Group>
                        <Form.Field>
                            <Dropdown
                                onChange={(e, { value })=>this.handleGenderSelect(e, value)}
                                id="multiSelect"
                                placeholder='Gender'
                                fluid
                                multiple
                                search
                                selection
                                options={_.map(this.props.genderOptions, function(value){
                                return {key: value.id, text: value.name, value: value.id}
                            })}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Dropdown
                                onChange={(e, { value })=>this.handlePronounSelect(e, value)}
                                name="pronouns"
                                id="multiSelect"
                                placeholder='Pronouns'
                                fluid
                                multiple
                                search
                                selection
                                options={_.map(this.props.pronounOptions, function(value){
                                return {key: value.id, text: value.name, value: value.id}
                            })}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Dropdown
                                onChange={(e, { value })=>this.handleOrientationSelect(e, value)}
                                id="multiSelect"
                                placeholder='Orientation'
                                fluid
                                multiple
                                search
                                selection
                                options={_.map(this.props.orientationOptions, function(value){
                                return {key: value.id, text: value.name, value: value.id}
                            })}
                            />
                        </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <label>Email</label>
                            <input onChange={(e)=>this.handleChange(e)} type="text" name="email" placeholder="Email" />
                        </Form.Field>
                        <Form.Group>
                        <Form.Field>
                            <label>Password</label>
                            <input onChange={(e)=>this.handleChange(e)} type="password" name="password" placeholder="Password" />
                        </Form.Field>
                        <Form.Field>
                            <label>Confirm Password</label>
                            <input onChange={(e)=>this.handleChange(e)} type="password" name="passwordConfirm" placeholder="Password" />
                        </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <label>Zip Code</label>
                            <input onChange={(e)=>this.handleChange(e)} type="text" name="zipcode" placeholder="Password" />
                        </Form.Field>
                        <Button id="submitBtn" type="submit">Next</Button>
                    </Form>
                </Card>
                </Grid.Column>
                <Grid.Column width={5}></Grid.Column>

            </Grid>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        genderOptions: state.gender.list,
        orientationOptions: state.orientation.list,
        pronounOptions: state.pronoun.list
    }
  }

let mapDispatchToProps = (dispatch) => {
    return {
      storeGenders: (data) => dispatch({ type: 'FETCH_GENDERS', data: data }),
      storeOrientations: (data) => dispatch({type: 'FETCH_ORIENTATIONS', data: data}),
      storePronouns: (data) => dispatch({type: 'FETCH_PRONOUNS', data: data })
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Register)