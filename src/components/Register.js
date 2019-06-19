import React from 'react'
import './css/Register.css'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid, Card, Form, Dropdown, Button, Feed, Image, Icon } from 'semantic-ui-react';
import { getGenders, getOrientations, getPronouns, getInterests, getUsers, getCurrentUser } from '../services/backend'
import Avatar from 'react-avatar-edit'

class Register extends React.Component{
    
    componentDidMount=()=>{
       this.getInformation()
    }
                
    getInformation = () =>{
        getGenders().then(this.props.storeGenders)
        getOrientations().then(this.props.storeOrientations)
        getPronouns().then(this.props.storePronouns)
        getInterests().then(this.props.storeInterests)
        getUsers().then(this.props.storeUsers)
    }

    state={
        firstName: '',
        lastName: '',
        age: 18,
        username: '',
        email: '',
        zip_code: '',
        genders: [],
        orientations: [],
        pronouns: [],
        interests: [],
        partners: [],
        preview: null,
        page: 1,
        submitted: false,
        errors: []

    }

    onClose=()=> {
        this.setState({preview: null})
      }
      
      onCrop=(preview)=> {
        this.setState({preview})
      }

    renderPageOne = () =>{
        return (
        <div id="flexContainer">
        <Form.Group>
        <Form.Field>
            <label>First Name</label>
            <input onChange={(e)=>this.handleChange(e)} type="text" name="firstName" placeholder="First Name" />
        </Form.Field>
        <Form.Field>
            <label>Last Name</label>
            <input onChange={(e)=>this.handleChange(e)} type="text" name="lastName" placeholder="First Name" />
        </Form.Field>
        <Form.Field>
            <label>Username</label>
            <input onChange={(e)=>this.handleChange(e)} type="text" name="username" placeholder="Username" />
        </Form.Field>
        <Form.Field>
            <label>Age</label>
            <select onChange={(e)=>this.handleChange(e)} id="selectCss" type="integer" name="age">
                {_.range(18, 100).map(int => <option value={int}>{int}</option>)}
            </select>
        </Form.Field>
        </Form.Group>
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
        <Form.Group>
        <Form.Field>
            <label>Email</label>
            <input onChange={(e)=>this.handleChange(e)} type="text" name="email" placeholder="Email" />
        </Form.Field>
        <Form.Field>
            <label>Password</label>
            <input onChange={(e)=>this.handleChange(e)} type="password" name="password" placeholder="Password" />
        </Form.Field>
        <Form.Field>
            <label>Confirm Password</label>
            <input onChange={(e)=>this.handleChange(e)} type="password" name="passwordConfirm" placeholder="Password" />
        </Form.Field>
        <Form.Field>
            <label>Zip Code</label>
            <input onChange={(e)=>this.handleChange(e)} type="text" name="zip_code" placeholder="Password" />
        </Form.Field>
        </Form.Group>
        </div> )       
    } 

    renderPageTwo = () =>{
        return(
            <React.Fragment>
            <div id="checkboxes">
                    {this.props.interestOptions.map(interest => <Form.Checkbox onChange={(e, { value })=>this.handleInterestSelect(e, value)} label={interest.name} value={interest.id}/>)}
            </div>
            </React.Fragment>
        )
    }

    renderPageThree = () => {
        return(
            <React.Fragment>
            <h1>Add Partners</h1>
                <Card id="partnersContainer">
                        <Card.Content>
                        <Feed>
                        {this.props.userOptions.map(user => {
                            if(this.state.partners.some(partner => partner === user.id)){
                                return null
                                }else{
                                return(
                            <Feed.Event>
                                <Feed.Label> 
                                    <Image src={user.image ? 
                                    user.image
                                    :
                                    'https://react.semantic-ui.com/images/wireframe/square-image.png'} size='medium' circular />
                                </Feed.Label>
                                <Feed.Content>
                                <Feed.Summary>
                                    {user.name}
                                <Button id="addPartnerBtn" onClick={(e)=>this.handlePartnerSelect(e, user)} size="tiny" color="red">Add Partner&nbsp;&nbsp;&nbsp;<Icon name="heart" size="regular"/></Button>
                                </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>
                                )
                            }
                        })}
                        </Feed>
                        </Card.Content>
                </Card>
            </React.Fragment>
        )
    }

    renderPageFour = () => {
        return (
        <React.Fragment>
            <div id="imageUpload">
                <Avatar
                id="imageUploadBox"
                width={200}
                height={200}
                onCrop={this.onCrop}
                onClose={this.onClose}
                src={this.state.src}
                />
                <img id="imagePreview"
                src={this.state.preview ? 
                this.state.preview 
                : 
                "https://react.semantic-ui.com/images/wireframe/square-image.png" } 
                alt="Preview" />
            </div>
        </React.Fragment>
        )
    }

    renderForm = () => {
        if(this.state.page === 1){
            return this.renderPageOne()
            }else if (this.state.page === 2){
                return this.renderPageTwo()
            }else if (this.state.page === 3){
                return this.renderPageThree()
            }else if (this.state.page === 4){
                return this.renderPageFour()
            }
    }

    handlePartnerSelect=(e, user)=>{
        e.preventDefault()
        this.setState({partners:[...this.state.partners, user.id]})
    }
    handleInterestSelect=(e, value)=>{
        this.setState({interests:[...this.state.interests, value]})
    }
    handleGenderSelect = (e, value) => {
        this.setState({genders:{...this.state.genders, value}})
    }
    handleOrientationSelect = (e, value) => {
        this.setState({orientations:{...this.state.orientations, value}})
    }
    handlePronounSelect = (e, value) => {
        this.setState({pronouns:{...this.state.pronouns, value}})
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleNext = (e) => {
        e.preventDefault()
        this.setState({page: this.state.page + 1})
    }
    handleBack = (e) => {
        e.preventDefault()
        this.setState({page: this.state.page - 1})
    }

    handleSubmit = () => {
        fetch("http://localhost:3000/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                age: this.state.age,
                username: this.state.username,
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                email: this.state.email,
                zip_code: this.state.zip_code,
                image: this.state.preview,
                genders: this.state.genders.value,
                orientations: this.state.orientations.value,
                pronouns: this.state.pronouns.value,
                partners: this.state.partners,
                password: this.state.password,
                interests: this.state.interests
            })
        }).then(res => res.json())
        .then(data=>{
            if(data.errors){
                this.setState({errors: data.errors})
            }else{
            localStorage.setItem("token", data.token)
            this.props.login()}}
            )
        }

    checkForErrors = () =>{
        if(this.state.errors.length > 0){
            return(
                <ul>
                    {this.state.errors.map(error => <li id="error">{error}</li>)}
                </ul>
            )
        }
    }
    render(){
        if(this.props.loggedIn){
            getCurrentUser(localStorage.token).then(data=>{ this.props.storeViewUser(data)
                                                            
                                                            this.props.storeCurrentUser(data)})
            return (<Redirect to={`/profile/${this.props.currentUser.id}`} />)
        }else{
        return(
            <Grid>
                <Grid.Column width={4}></Grid.Column>
                <Grid.Column id="mainColumn" width={8}>
                <Card id="formContainer" color="red">
                    <Form id="registerForm" onSubmit={(e)=>this.handleSubmit(e)}>
                    {this.checkForErrors()}
                { 
                    this.renderForm()
                }
                {this.state.page > 1 ?
                    <Button id="backBtn"  size="small" onClick={(e)=> this.handleBack(e)}>Back</Button>
                    : 
                    null
                    }
                {this.state.page < 4 ?
                    <Button id="nextBtn" size="small" onClick={(e)=> this.handleNext(e)}>Next</Button>
                :
                    <Button id="nextBtn" type="submit">Finish!</Button>        
                }
                    </Form>
                </Card>
                </Grid.Column>
                <Grid.Column width={4}></Grid.Column>

            </Grid>
        )
    }
    }

}

let mapStateToProps = (state) => {
    return {
        loggedIn: state.session.token,
        genderOptions: state.gender.list,
        orientationOptions: state.orientation.list,
        pronounOptions: state.pronoun.list,
        interestOptions: state.interest.list,
        userOptions: state.user.list,
        currentUser: state.user.currentUser
    }
  }

let mapDispatchToProps = (dispatch) => {
    return {
      storeGenders: (data) => dispatch({ type: 'FETCH_GENDERS', data: data }),
      storeOrientations: (data) => dispatch({type: 'FETCH_ORIENTATIONS', data: data}),
      storePronouns: (data) => dispatch({type: 'FETCH_PRONOUNS', data: data }),
      storeInterests: (data) => dispatch({type: 'FETCH_INTERESTS', data: data}),
      storeUsers: (data) => dispatch ({type: 'FETCH_USERS', data: data.users}),
      login: () => dispatch({type:"LOG_IN", data: !!localStorage.getItem("token")}),
      storeCurrentUser: (data) => dispatch({type: "FETCH_CURRENT_USER", data: data}),
      storeViewUser: (data) => dispatch({type:"FETCH_USER_PROFILE", data:data})

    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Register)