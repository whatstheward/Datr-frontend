import React from 'react'
import { connect } from 'react-redux'
import { Card, Button, Icon } from 'semantic-ui-react';
import './css/DateCheckOut.css'
import { saveDatePlan } from '../services/backend';

const DateCheckout = (props) =>{

    return(
        <Card id="cartContainer">
            <Card.Header>{props.currentUser.name}'s date for {props.date.dateTime}</Card.Header>
            <Card.Content>
                <h5>With: {props.date.partners ? props.date.partners.map(partner => <span>{partner.name}</span> )
                :
                null}
                </h5>
                <h5>
                <ul>
                To: {props.date.activities ? props.date.activities.map(activity => {
                    return(
                        <li>{activity.name}
                        <Icon onClick={()=>props.removeEvent(activity)} name="delete" size="small" color="red"/>
                        </li>)})
                :
                null}
                </ul>
                </h5>
            </Card.Content>
            <Button onClick={()=>saveDatePlan(props.date, props.date.method)}>Plan it!</Button>
        </Card>
    )
}

const mapStateToProps = state =>{
    return{
        date: state.buildDate,
        currentUser: state.user.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return{
        removeEvent: (data) => dispatch({type:"REMOVE_EVENT", data: data}),
        removePartner: (data) => dispatch({type:"REMOVE_PARTNER", data: data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateCheckout)