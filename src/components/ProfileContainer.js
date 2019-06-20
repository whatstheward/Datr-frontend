import React from 'react'
import './css/ProfileContainer.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Grid, Card, Image, Button, Icon, Modal, Header, Confirm } from 'semantic-ui-react';
import DateCalendar from './DateCalendar';


class ProfileContainer extends React.Component {

    state={
        isPartner: [],
        isPendingPartner: [],
        modalOpen: false,
        exists: !!this.props.currentUser,
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }
    
    close = () => this.setState({ open: false })
    show = () => this.setState({ modalOpen: true })
    handleConfirm = () => { 
                            this.setState({ modalOpen: false })
                            fetch(`https://obscure-dusk-20851.herokuapp.com/users/${this.props.currentUser.id}`, {
                                method: 'DELETE',
                                    headers:{
                                        'auth-token': localStorage.getItem('token'),
                                        'Content-Type': 'application/json'
                                        }
                            }).then(res =>{
                                if(res.status === 200){
                                localStorage.clear()
                                this.props.logOut(!!localStorage.getItem('token'))
                                this.props.deleteUser()
                                this.setState({exists: !this.state.exists})}
                                }
                            )
                            
                            
                        }
    handleCancel = () => this.setState({ modalOpen: false })

    componentDidMount(){
        if(this.props.pendingPartners){
            this.setState({isPendingPartner: this.props.pendingPartners.some(partner => partner.id===this.props.user.id)})}
        if(this.props.confirmedPartners){
            this.setState({isPartner: this.props.confirmedPartners.some(partner => partner.id === this.props.user.id)})}
            
            
    }

    componentDidUpdate(prevProps){
        if(this.props.confirmedPartners && prevProps.user !== this.props.user ){
        this.setState({isPartner: this.props.confirmedPartners.some(partner => partner.id === this.props.user.id)})}
        if(this.props.pendingPartners && prevProps.pendingPartners !== this.props.pendingPartners ){
            this.setState({isPendingPartner: this.props.pendingPartners.some(partner => partner.id===this.props.user.id)})}
        }
        

        handlePartnerRequest=()=>{
            fetch(`https://obscure-dusk-20851.herokuapp.com/relationships`,{
                method: 'POST',
                headers:{
                    'auth-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify({relationship: {user_id: this.props.currentUser.id, partner_id: this.props.user.id, confirmed: 0}})
            }).then(res => res.json()).then(data => {
                if(data.errors){
                    alert(data.errors)
                }else{
                this.props.updatePending(data)}})
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
        if(this.state.exists === false){
            this.props.logOut()
            
            return <Redirect to="/"/>
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
                        <p id="pronouns">{this.props.user.pronouns ? this.props.user.pronouns.map(pronoun => <span key={pronoun.id}>{pronoun.name}<br/></span>):null}</p>
                        </Card.Header>
                        {this.renderProfileView()}
                        { this.props.currentUser.id === this.props.user.id ?
                            <div>
                                <Button negative onClick={this.show}>Delete Profile</Button>
                                <Confirm
                                open={this.state.modalOpen}
                                header='This will permanently delete your profile'
                                cancelButton='Never mind'
                                confirmButton="I'm sure"
                                onCancel={this.handleCancel}
                                onConfirm={this.handleConfirm}
                                />
                            </div>
                        :
                        null
                        }
                    </Card>
                :
                null
            }
            </Grid.Column>
            <Grid.Column width={10}>
            {this.state.exists && (this.props.currentUser.id === this.props.user.id || this.state.isPartner) ?
            <DateCalendar userDates={this.props.dates} />
            :
                null
            }
            </Grid.Column>
            </Grid> 
                )}
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
        partner: state.user.viewUser.partners,
        pendingPartners: state.user.pendingPartners,
        confirmedPartners: state.user.confirmedPartners
    }
}

const mapDispatchToProps = dispatch => {
    return{
        updatePending: (data) => dispatch({type: "STORE_PENDING_PARTNER", data: data}),
        deleteUser: () => dispatch({type: "CLEAR_USER"}),
        logOut: (data) => dispatch({type: 'LOG_OUT', data: data})
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)