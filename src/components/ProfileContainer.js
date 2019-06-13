import React from 'react'
import _ from 'lodash'
import './css/ProfileContainer.css'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid, Card, Image, Button, Icon, Dropdown, Form } from 'semantic-ui-react';
import DateCalendar from './DateCalendar';


class ProfileContainer extends React.Component {

    state={
        edit: false,
    }
    



    

    renderProfileView=()=>{
        return (
        <Card.Content id="profileInfo">
            <h4>Age: {this.props.user.age} </h4>
            <h4>Location: {this.props.user.zip_code}</h4>
            <h4>Genders:</h4>
            <ul>
            {this.props.user.genders ? this.props.user.genders.map(gender => <li>{gender.name}</li>):null}
            </ul>
            <h4>Orientations:</h4>
            <ul>
            {this.props.user.orientations ? this.props.user.orientations.map(orientation => <li>{orientation.name}</li>):null}
            </ul>
            <h4>Interests:</h4>
            <ul>
            {this.props.user.interests ? this.props.user.interests.map(interest => <li>{interest.name}</li>):null}
            </ul>
        </Card.Content>)
    }

    renderEditView=()=>{
        return (
        <Card.Content id="profileInfo">
            <Form onSubmit={()=>this.handleSubmit()}>
            <h4>Age: </h4> <select defaultValue={this.props.user.age} onChange={(e)=>this.handleChange(e)} id="selectCss" type="integer" name="age">
                {_.range(18, 100).map(int => <option value={int}>{int}</option>)}
            </select>
            <h4>Location: </h4><input defaultValue={this.props.user.zip_code} onChange={(e)=>this.handleChange(e)} type="text" name="zip_code" placeholder="Password" />
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
        </Card.Content>)     
    }

    render(){
        if(this.state.edit) {
            return <Redirect to='edit_profile'/>
            }else{
        return(
            <Grid id="profilePage">
            <Grid.Column width={4} id="profileBar">
                { this.props.user.name ?
                    <Card id="profileCard">
                    <Image src={this.props.user.image} centered circular/>
                        <Card.Header id="userName">
                        {this.props.user.name}
                        <br></br>
                        <p id="pronouns">{this.props.user.pronouns ? this.props.user.pronouns.map(pronoun => <span>{pronoun.name}</span>):null}</p>
                        <Button onClick={()=>this.setState({edit: !this.state.edit})} active={this.state.edit} id="edit" size="tiny">Edit Profile   <Icon name="edit"/></Button>
                        </Card.Header>
                        {this.state.edit ? 
                        this.renderEditView()
                        :
                        this.renderProfileView()}
                    </Card>
                :
                null
            }
            </Grid.Column>
            <Grid.Column width={10}>
            {this.props.dates > 0 ?
            <DateCalendar />
            :
            <Card >
                <h1>No Dates Yet!</h1>
            </Card>
            }
            </Grid.Column>
            </Grid> 
                )
            }
        }
    }


const mapStateToProps = state => {
    return {
        user: state.user.currentUser,
        dates: state.userDates.currentDates,
        genderOptions: state.gender.list,
        orientationOptions: state.orientation.list,
        pronounOptions: state.pronoun.list,
        interestOptions: state.interest.list
    }
}



export default connect(mapStateToProps)(ProfileContainer)