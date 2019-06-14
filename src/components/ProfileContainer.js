import React from 'react'
import './css/ProfileContainer.css'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid, Card, Image, Button, Icon, Modal, Header } from 'semantic-ui-react';
import DateCalendar from './DateCalendar';
import { getCurrentUserDates, sendPartnerRequest } from '../services/backend';


class ProfileContainer extends React.Component {

    state={
        edit: false,
        isPartner: false,
        isPendingPartner: false,
        isActive: false
    }

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }
    
    close = () => this.setState({ open: false })

    componentDidMount(){
        getCurrentUserDates(this.props.user.id).then(data => {if(data.user_dates > 0){
            this.props.storeUserDates(data.user_dates)}})
    }

    componentDidUpdate(prevProps){
        if(prevProps.user.id !== this.props.user.id){
        getCurrentUserDates(this.props.user.id).then(this.props.storeUserDates)
        if(!!this.props.currentUser.confirmedPartners){
            this.setState({isPartner: this.props.user.confirmedPartners.some(partner => this.props.currentUser.id===partner.partnerID)})}
        if (!!this.props.currentUser.pendingPartners){
            this.setState({isPendingPartner: this.props.currentUser.pendingPartners.some(partner => partner.partnerID===this.props.user.id)})}}
        }
        

        handlePartnerRequest=()=>{
            sendPartnerRequest(this.props.currentUser, this.props.user)
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

    render=()=>{
        const { open, closeOnEscape, closeOnDimmerClick } = this.state
        if(this.state.edit) {
            return <Redirect to='edit_profile'/>
            }else{
        return(
            
            <Grid id="profilePage">
                
            <Grid.Column width={4} id="profileBar">
                { this.props.user.name ?
                    <Card id="profileCard">
                    <Image src={this.props.user.image} centered circular/>
                    {this.state.isPartner || this.state.isPendingPartner || this.props.currentUser.id === this.props.user.id ?
                    null
                    :
                    <Modal trigger={
                <span id="request"> 
                        <Icon.Group onClick={this.closeConfigShow(false, true)} size="large">
                            <Icon name="users" color="red" circular inverted />
                            <Icon corner name="add" />
                        </Icon.Group>
                    </span>}
                    open={open}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}
                    onClose={this.close}>
                    <Modal.Content image>
                    <Image wrapped size='medium' src={this.props.user.image} />
                    <Modal.Description>
                        <Header>Add {this.props.user.name} as a Partner?</Header>
                            <Button  onClick={()=>{this.close()
                                this.handlePartnerRequest()}} positive>Yes!</Button><Button onClick={this.close} negative>Nevermind</Button>
                    </Modal.Description>
                    </Modal.Content>
                </Modal>
                    }
                        <Card.Header id="userName">
                        {this.props.user.name}
                        <br/>
                        <br/>
                        <p id="pronouns">{this.props.user.pronouns ? this.props.user.pronouns.map(pronoun => <span>{pronoun.name}</span>):null}</p>
                        { this.props.currentUser.id === this.props.user.id ?
                        <Button onClick={()=>this.setState({edit: !this.state.edit})} active={this.state.edit} id="edit" size="tiny">Edit Profile   <Icon name="edit"/></Button>
                        :
                        null
                        }
                        </Card.Header>
                        {this.renderProfileView()}
                    </Card>
                :
                null
            }
            </Grid.Column>
            <Grid.Column width={10}>
            {this.props.dates.length > 0 && (this.props.currentUser.id === this.props.user.id || this.state.isPartner) ?
            <DateCalendar userDates={this.props.dates} />
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
        user: state.user.viewUser,
        currentUser: state.user.currentUser,
        dates: state.userDates.currentDates,
        genderOptions: state.gender.list,
        orientationOptions: state.orientation.list,
        pronounOptions: state.pronoun.list,
        interestOptions: state.interest.list,
        partner: state.user.viewUser.partners
    }
}

const mapDispatchToProps = dispatch => {
    return{
        storeUserDates: (data) => dispatch({type:"FETCH_USER_DATES", data: data})
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)