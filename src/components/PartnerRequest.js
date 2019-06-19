import React from 'react';
import './css/PartnerRequest.css'
import { Dropdown, Image, Grid, Button } from 'semantic-ui-react'
import { connect } from 'react-redux' 

class PartnerRequest extends React.Component{

    handleClick = (e, requester) => {
        if(e.target.value === 'accept'){
            fetch(`http://localhost:3000/relationships/${requester.relationshipID}`,{
                method: 'PATCH',
                headers:{
                    'auth-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify({relationship: {confirmed: 1}})
            }).then(res=>res.json()).then(this.props.updateCurrentUser)
        }else if (e.target.value === 'decline'){
            fetch(`http://localhost:3000/relationships/${requester.relationshipID}`,{
                method: 'PATCH',
                headers:{
                    'auth-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify({relationship: {confirmed: 2}})
            }).then(res=>res.json()).then(data => {
                
                this.props.updateCurrentUser(data)})
        }
    }

    render(){
        return (
            <Dropdown item direction="left" text='Friend Requests' style={this.props.partnerRequests.length > 0 ?
            {color:'#dcca78'}
            :
            null}>
            <Dropdown.Menu id="requests">
                    {this.props.partnerRequests && this.props.partnerRequests.length > 0 ?
                        this.props.partnerRequests.map(requester => 
                            <Dropdown.Item>
                            <Grid>
                            <Grid.Column width={6} id="requestsImg">
                                <Image size="small" src={requester.image}/>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Grid.Row>
                                <h4>{requester.name}</h4>
                                </Grid.Row>
                                <Grid.Row>
                                    <br/>
                                    <Button size="tiny" value="accept" onClick={(e)=> this.handleClick(e, requester)} positive>Accept</Button>
                                    <Button size="tiny" value="decline" onClick={(e)=> this.handleClick(e, requester)} negative>Decline</Button>
                                </Grid.Row>
                            </Grid.Column>
                            </Grid>
                            </Dropdown.Item>)
                            :
                            <h4>No New Partner Requests</h4>
                    }
            </Dropdown.Menu>

            </Dropdown>
        )}
    }


const mapStateToProps=state=>{
    return{
        currentUser: state.user.currentUser,
        partnerRequests: state.user.partnerRequests
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        updateCurrentUser: data => dispatch({type:"FETCH_CURRENT_USER", data: data})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PartnerRequest)