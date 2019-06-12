import React from 'react'
import './css/ProfileContainer.css'
import { connect } from 'react-redux'
import { Grid, Card, Image } from 'semantic-ui-react';
import DateCalendar from './DateCalendar';


const ProfileContainer = (props) => {

        return(
            <Grid id="profilePage">
            <Grid.Column width={4} id="profileBar">
                { props.user.name ?
                    <Card id="profileCard">
                    <Image src={props.user.image} centered circular/>
                        <Card.Header id="userName">
                        {props.user.name}
                        <br></br>
                        <p id="pronouns">{props.user.pronouns ? props.user.pronouns.map(pronoun => <span>{pronoun.name}</span>):null}</p>
                        </Card.Header>
                        <Card.Content id="profileInfo">
                        <h4>Age: {props.user.age} </h4>
                        <h4>Location: {props.user.zip_code}</h4>
                        <h4>Genders:</h4>
                        <ul>
                        {props.user.genders ? props.user.genders.map(gender => <li>{gender.name}</li>):null}
                        </ul>
                        <h4>Orientations:</h4>
                        <ul>
                        {props.user.orientations ? props.user.orientations.map(orientation => <li>{orientation.name}</li>):null}
                        </ul>
                        <h4>Interests:</h4>
                        <ul>
                        {props.user.interests ? props.user.interests.map(interest => <li>{interest.interest}</li>):null}
                        </ul>
                        </Card.Content>
                    </Card>
                :
                null
            }
            </Grid.Column>
            <Grid.Column width={10}>
            <DateCalendar />
            </Grid.Column>
            </Grid> 
        )
    }


const mapStateToProps = state => {
    return {
        user: state.user.currentUser
    }
}

export default connect(mapStateToProps)(ProfileContainer)