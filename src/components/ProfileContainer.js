import React from 'react'
import './css/ProfileContainer.css'
import { connect } from 'react-redux'
import { Grid, Card, Image, Container } from 'semantic-ui-react';


class ProfileContainer extends React.Component{

    render(){
        return(
            <Grid>
            { this.props.user.name ?
            <React.Fragment>
                <Grid.Column width={4} id="profileBar">
                    <Card id="profileCard">
                    <Image src={this.props.user.image} centered circular/>
                        <Card.Header id="userName">
                        {this.props.user.name}
                        <br></br>
                        <p id="pronouns">{this.props.user.pronouns ? this.props.user.pronouns.map(pronoun => <span>{pronoun.name}</span>):null}</p>
                        </Card.Header>
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
                        {this.props.user.interests ? this.props.user.interests.map(interest => <li>{interest.interest}</li>):null}
                        </ul>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column width={8}>
                <Container id="dateFeed">
                </Container>
                </Grid.Column>
                </React.Fragment>
                :
                null
            }
            </Grid> 
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.currentUser
    }
}

const mapDispatchToProps = dispatch =>{
    return{
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)