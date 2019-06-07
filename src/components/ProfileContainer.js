import React from 'react'
import './css/ProfileContainer.css'
import { connect } from 'react-redux'
import { Grid, Card, Image, Container } from 'semantic-ui-react';
import { getCurrentUser } from '../services/backend';
import DateFeed from './DateFeed';

const token = localStorage.getItem('token')
class ProfileContainer extends React.Component{


    componentWillMount(){
        getCurrentUser(token).then(this.props.storeCurrentUser)
    }

    render(){
        return(
            <Grid>
                <Grid.Column width={4} id="profileBar">
                    <Card id="profileCard">
                    <Image src={this.props.image} centered circular/>
                        <Card.Header id="userName">
                        {this.props.name}
                        <br></br>
                        <p id="pronouns">{this.props.pronouns ? this.props.pronouns.map(pronoun => <span>{pronoun.name}</span>):null}</p>
                        </Card.Header>
                        <Card.Content id="profileInfo">
                        <h4>Age: {this.props.age} </h4>
                        <h4>Location: {this.props.zip_code}</h4>
                        <h4>Genders:</h4>
                        <ul>
                        {this.props.genders ? this.props.genders.map(gender => <li>{gender.name}</li>):null}
                        </ul>
                        <h4>Orientations:</h4>
                        <ul>
                        {this.props.orientations ? this.props.orientations.map(orientation => <li>{orientation.name}</li>):null}
                        </ul>
                        <h4>Interests:</h4>
                        <ul>
                        {this.props.interests ? this.props.interests.map(interest => <li>{interest.interest}</li>):null}
                        </ul>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column width={8}>
                <Container id="dateFeed">
                    <DateFeed />
                </Container>
                </Grid.Column>

                
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        name: state.user.currentUser.name,
        image: state.user.currentUser.image,
        age: state.user.currentUser.age,
        zip_code: state.user.currentUser.zip_code,
        genders: state.user.currentUser.genders,
        orientations: state.user.currentUser.orientations,
        pronouns: state.user.currentUser.pronouns,
        interests: state.user.currentUser.interests
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        storeCurrentUser: (data) => dispatch({type:'FETCH_CURRENT_USER', data: data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)