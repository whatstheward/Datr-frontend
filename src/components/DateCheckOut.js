import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Card, Icon, Button } from 'semantic-ui-react';
import './css/DateCheckOut.css'
import { saveDatePlan } from '../services/backend';

class DateCheckout extends React.Component{

    componentWillUnmount(){
        this.props.clearCheckOut()
    }

    saveDatePlan(datePlan, method="POST"){
        if(method === "POST"){
        fetch(`http://localhost:3000/user_dates`,{
            method: `${method}`,
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({datePlan})
        }).then(console.log)
    }else if(method==="PATCH"){
            let id = datePlan.id
            fetch(`http://localhost:3000/user_dates/${id}`,{
                method: "PUT",
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({datePlan})
            }).then(console.log)
        }
    }

    render(){
        return(
            <Card id="cartContainer">
                <Card.Header>{this.props.currentUser.name}'s date for {this.props.date.dateTime}</Card.Header>
                <Card.Content>
                    <h5>With: {this.props.date.partners ? this.props.date.partners.map(partner => <li>{partner.name}</li> )
                    :
                    null}
                    </h5>
                    <h5>
                    <ul>
                    To: {this.props.date.activities ? this.props.date.activities.map(activity => {
                        return(
                            <li>{activity.name}
                            <Icon onClick={()=>this.props.removeEvent(activity)} name="delete" size="small" color="red"/>
                            </li>)})
                    :
                    null}
                    </ul>
                    </h5>
                </Card.Content>
                <Button className="ui button" onClick={()=>{
                    saveDatePlan(this.props.date, this.props.date.method)
                    this.props.clearCheckOut()
                    this.props.history.push(`/profile/${this.props.currentUser.id}`)}}>Plan it!</Button>
            </Card>
        )
    }
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
        removePartner: (data) => dispatch({type:"REMOVE_PARTNER", data: data}),
        clearCheckOut: () => dispatch({type:"SAVE_DATE"}),
        storeViewUser: (data) => dispatch({type:"VIEW_USER_PROFILE", data: data}),
        storeDate: (data) => dispatch({type:"FETCH_USER_DATES", data: data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DateCheckout))