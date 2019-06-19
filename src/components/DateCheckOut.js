import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card, Icon, Button } from 'semantic-ui-react';
import './css/DateCheckOut.css'
// import { saveDatePlan } from '../services/backend';

class DateCheckout extends React.Component{

    state={
        errors: [],
        patch: this.props.date.partners.length > 0
    }

    checkErrors=()=>{
        if(this.state.errors.length > 0){
            return(
                <ul id="errors">
                    {this.state.errors.map(error=> <li>{error}</li>)}
                </ul>
            )
        }
    }

    componentWillUnmount(){
        this.props.clearCheckOut()
    }

        saveDatePlan=(datePlan)=>{
            if(!this.state.patch){
            fetch(`http://localhost:3000/user_dates`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({datePlan})
            }).then(res => res.json()).then(data => {
                if(data.errors){
                    this.setState({errors: data.errors})
                }else{
                    this.props.clearCheckOut()
                    this.props.history.push(`/profile/${this.props.currentUser.id}`)
                }
            })
        }else if(this.state.patch){
                let id = datePlan.id
                fetch(`http://localhost:3000/user_dates/${id}`,{
                    method: "PUT",
                    headers:{
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    },
                    body: JSON.stringify({datePlan})
                }).then(res => res.json()).then(data => {
                    if(data.errors){
                        this.setState({errors: data.errors})
                    }else{
                        this.props.clearCheckOut()
                        this.props.history.push(`/profile/${this.props.currentUser.id}`)
                    }
                })
            }
        
    }

    render(){
        return(
            <Card id="cartContainer">
                <Card.Header>{this.props.currentUser.name}'s date for {this.props.date.dateTime}</Card.Header>
                <Card.Content>
                    {this.checkErrors()}
                    <ul>With: {this.props.date.partners ? this.props.date.partners.map(partner => <li>{partner.name}</li> )
                    :
                    null}
                    </ul>
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
                <Card.Content extra>
                <Button className="ui button" onClick={()=>this.saveDatePlan(this.props.date)}>Plan it!</Button>
                </Card.Content>
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