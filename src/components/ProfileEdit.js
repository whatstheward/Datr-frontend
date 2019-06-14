import React from 'react';
import _ from 'lodash'
import { connect } from  'react-redux'
import { Card, Form, Icon, Dropdown, Button, Grid } from 'semantic-ui-react'
import { getGenders, getOrientations, getPronouns, getInterests } from '../services/backend'
import './css/ProfileEdit.css'



class ProfileEdit extends React.Component {

    handleInterestSelect=(e, value)=>{
        
        this.props.storeEditedInterests(value[value.length-1])

    }
    handleGenderSelect = (e, value) => {
        this.setState({userEdit:{...this.state.genders, editedGenders: value}})
    }
    handleOrientationSelect = (e, value) => {
        this.setState({userEdit:{...this.state.orientations, editedOrientations:value}})
    }

    handleChange = (e) => {
        this.setState({userEdit:{...this.state.userEdit, editedAge: e.target.value}})
    }

    handleDelete=(e,value)=>{
        return null
    }

    handleSubmit=()=>{
        this.setState({edit: !this.state.edit})
    }

    componentDidMount(){
        getGenders().then(this.props.storeGenders)
        getOrientations().then(this.props.storeOrientations)
        getPronouns().then(this.props.storePronouns)
        getInterests().then(this.props.storeInterests)
    }


    render(){
        return (
        <Grid>
            <Grid.Column width={4} />
            <Grid.Column width={8}>
        <Card id="editCard">
            <Form onSubmit={()=>this.handleSubmit()}>
            <Form.Group>
            <h4>Age: </h4> <select defaultValue={this.props.user.age} onChange={(e)=>this.handleChange(e)} id="selectCss" type="integer" name="age">
                {_.range(18, 100).map(int => <option value={int}>{int}</option>)}
            </select>
            <h4>Location: </h4><input defaultValue={this.props.user.zip_code} onChange={(e)=>this.handleChange(e)} type="text" name="zip_code" placeholder="Password" />
            </Form.Group>            
            <h4>Genders:</h4>
            <ul>
            {this.props.user.genders ? this.props.user.genders.map(gender => <li>{gender.name}<Icon onClick={(e)=> this.handleDelete(e, gender)} name="delete"/></li>):null}
            </ul>
            <Dropdown
                defaultValue={_.map(this.props.user.genders, function(value){
                return {key: value.id, text: value.name, value: value.id}})}
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
            <h4>Orientations:</h4>
            <ul>
            {this.props.user.orientations ? this.props.user.orientations.map(orientation => <li>{orientation.name}<Icon onClick={(e)=> this.handleDelete(e, orientation)} name="delete"/></li>):null}
            </ul>
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
            <h4>Interests:</h4>
            <ul>
            {this.props.user.interests ? this.props.user.interests.map(interest => <li>{interest.name}<Icon onClick={(e)=> this.handleDelete(e, interest)} name="delete"/></li>):null}
            </ul>
            <Dropdown
                onChange={(e, { value })=>this.handleInterestSelect(e, value)}
                id="multiSelect"
                placeholder='Interests'
                fluid
                multiple
                search
                selection
                options={_.map(this.props.interestOptions, function(value){
                return {key: value.id, text: value.name, value: value }
            })}
            />
            <Button type="submit" positive>Submit</Button>
            </Form>
        </Card>
        </Grid.Column>
        </Grid>
        )     
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        storeGenders: (data) => dispatch({ type: 'FETCH_GENDERS', data: data }),
        storeOrientations: (data) => dispatch({type: 'FETCH_ORIENTATIONS', data: data}),
        storePronouns: (data) => dispatch({type: 'FETCH_PRONOUNS', data: data }),
        storeInterests: (data) => dispatch({type: 'FETCH_INTERESTS', data: data})
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)